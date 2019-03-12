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
     * @returns {Promise<{
        access_token: string,
        expires_in: number,
        refresh_token: string,
        org: string,
        user_id: number,
        valid_until: Date
    }>}
     * @memberof Bexio
     */
    public async generateAccessToken(query: AuthorizationResponse): Promise<{
        access_token: string,
        expires_in: number,
        refresh_token: string,
        org: string,
        user_id: number,
        valid_until: Date
    }> {
        return this.bexioAuth.generateAccessToken(query)
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
     * performs the fakelogin without preinitializing the api
     *
     * @static
     * @param {string} clientId
     * @param {string} clientSecret
     * @param {Array<Scopes>} scopes
     * @param {string} username
     * @param {string} password
     * @returns {Promise<{
        access_token: string,
        expires_in: number,
        refresh_token: string,
        org: string,
        user_id: number,
        valid_until: Date
    }>}
     * @memberof Bexio
     */
    public static async fakeLogin(clientId: string, clientSecret: string, scopes: Array<Scopes>, username: string, password: string): Promise<{
        access_token: string,
        expires_in: number,
        refresh_token: string,
        org: string,
        user_id: number,
        valid_until: Date
    }> {
        let api = new this(clientId, clientSecret, 'https://office.bexio.com/fakecallback', scopes)
        return api.fakeLogin(username, password)
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
     * @returns {{
        access_token: string,
        expires_in: number,
        refresh_token: string,
        org: string,
        user_id: number,
        valid_until: Date
    }}
     * @memberof Bexio
     */
    public async fakeLogin(username: string, password: string): Promise<{
        access_token: string,
        expires_in: number,
        refresh_token: string,
        org: string,
        user_id: number,
        valid_until: Date
    }> {
        // very important cookie jar
        let cookieJar: CookieJar = request.jar()
        // untyped because of 'used before assigned' typescript error (But in real it is a request.FullResponse)
        let res

        // step 1: Grab the cookies and go the login form
        try {
            res = await request({
                uri: this.getAuthUrl(),
                followRedirect: true,
                simple: false,
                resolveWithFullResponse: true,
                jar: cookieJar
            })
        } catch (err) {
            throw new Error('Failed at step 1: grab the cookies and go the login form')
        }

        // step 2: grab the csrf token and perform the login
        // can also be set by yourself with the same value in the cookie and the formdata
        let csrfToken = cookieJar.getCookieString('https://idp.bexio.com').split('XSRF-TOKEN=')[1].split(';')[0]
        try {
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
        } catch (err) {
            throw new Error('Failed at step 2: do the login')
        }

        // step 3: perform the SAML stuff
        let base64Regex = /"(\S+==)"/gm
        let samlResponse = (base64Regex.exec(res.body as string) || [])[1]
        try {
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
        } catch (err) {
            throw new Error('Failed at step 3: perform the necessary SAML stuff')
        }

        // step 4: accept the scopes
        let csrfRegex = /value="(\S+)".+id="confirm_scopes__csrf_token"/gm
        let csrfToken2 = (csrfRegex.exec(res.body) || [])[1]
        try {
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
        } catch (err) {
            throw new Error('Failed at step 4: accept the requested scopes')
        }

        let responseURL = new URL(res.request.href)
        return this.generateAccessToken({
            code: responseURL.searchParams.get('code') || '',
            state: responseURL.searchParams.get('state') || ''
        })
    }
}
