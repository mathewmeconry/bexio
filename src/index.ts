import Scopes from './constants/Scopes'
import OAuth2, { AuthorizationResponse } from './libs/OAuth2'
import Contacts from "./resources/Contacts";
import { ContactsStatic } from './interfaces/ContactsStatic';
import ContactTypes from './resources/ContactTypes';
import ContactSectors from './resources/ContactSectors';
import ContactGroups from './resources/ContactGroups';
import ContactRelations from './resources/ContactRelations';
import Orders from './resources/Orders';
import request from 'request-promise-native'
import { CookieJar, Response } from 'request';

export { ContactsStatic, Scopes }

export default class Bexio {
    private clientId: string
    private clientSecret: string
    private redirectUri: string
    private scopes: Array<Scopes>

    private bexioAuth: OAuth2

    // Resources
    // Contacts
    public contacts: Contacts
    public contactTypes: ContactTypes
    public contactSectors: ContactSectors
    public contactGroups: ContactGroups
    public contactRelations: ContactRelations

    // Sales Order Management
    public orders: Orders

    constructor(clientId: string, clientSecret: string, redirectUri: string, scopes: Array<Scopes>) {
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.redirectUri = redirectUri
        this.scopes = scopes

        // add general scope to the request list
        this.scopes.push(Scopes.GENERAL)

        this.bexioAuth = new OAuth2(this.clientId, this.clientSecret, this.redirectUri, this.scopes)

        // Init resources
        this.contacts = new Contacts(this.bexioAuth)
        this.contactTypes = new ContactTypes(this.bexioAuth)
        this.contactSectors = new ContactSectors(this.bexioAuth)
        this.contactGroups = new ContactGroups(this.bexioAuth)
        this.contactRelations = new ContactRelations(this.bexioAuth)
        this.orders = new Orders(this.bexioAuth)
    }

    /**
     * Returns the authorization uri for starting the oauth2 flow
     *
     * @returns {string}
     * @memberof Bexio
     */
    public getAuthUrl(): string {
        return this.bexioAuth.getAuthorizationUrl();
    }

    /**
     * Generates the Accesstoken out of the auth response
     *
     * @param {AuthorizationResponse} query
     * @returns {Promise<void>}
     * @memberof Bexio
     */
    public async generateAccessToken(query: AuthorizationResponse): Promise<void> {
        await this.bexioAuth.generateAccessToken(query)
    }

    /**
     * returns if the authentication is already done
     *
     * @returns {boolean}
     * @memberof Bexio
     */
    public isInitialized(): boolean {
        return this.bexioAuth.isInitialized()
    }

    /**
     * Bypasses the login userinteraction with the api
     * 
     * The login procedure has following steps:
     * 1. redirect to the login form via the authurl to grab all the cookies
     * 2. login into the system and got to the SAML authorization
     * 3. perform the SAML stuff and proceed to the "accept" section to accept the requested scopes
     * 4. accept the stuff
     * 5. ...
     * 6. profit!
     * 
     * @param {string} username
     * @param {string} password
     * @returns {boolean}
     * @memberof Bexio
     */
    public async fakeLogin(username: string, password: string): Promise<boolean> {
        // very important cookie jar
        let cookieJar: CookieJar = request.jar()

        // step 1: Grab the cookie and go the login form
        let res: request.FullResponse = await request({
            uri: this.getAuthUrl(),
            followRedirect: true,
            simple: false,
            resolveWithFullResponse: true,
            jar: cookieJar
        })

        // step 2: grab the csrf token and perform the login
        // can also be set by yourself with the same value in the cookie and the formdata
        let csrfToken = cookieJar.getCookieString('https://idp.bexio.com').split('XSRF-TOKEN=')[1].split(';')[0]
        res = await request({
            uri: res.request.href,
            method: 'POST',
            jar: cookieJar,
            simple: false,
            resolveWithFullResponse: true,
            followAllRedirects: true,
            form: {
                username: username,
                password: password,
                _csrf: csrfToken
            }
        })

        // step 3: perform the SAML stuff
        let base64Regex = /"(\S+==)"/gm
        let samlResponse = (base64Regex.exec(res.body as string) || [])[1]
        res = await request({
            uri: 'https://office.bexio.com/index.php/samlauth/consume',
            method: 'POST',
            jar: cookieJar,
            simple: false,
            resolveWithFullResponse: true,
            followAllRedirects: true,
            form: {
                SAMLResponse: samlResponse
            }
        })

        // step 4: accept the scopes
        let csrfRegex = /value="(\S+)".+id="confirm_scopes__csrf_token"/gm
        let csrfToken2 = (csrfRegex.exec(res.body) || [])[1]
        res = await request({
            uri: res.request.href,
            method: 'POST',
            jar: cookieJar,
            simple: false,
            resolveWithFullResponse: true,
            followAllRedirects: true,
            form: {
                'confirm_scopes[_csrf_token]': csrfToken2,
                authorize: 1
            }
        })

        return true
    }
}
