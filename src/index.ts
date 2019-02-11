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

    /*generate
     *generaterl
     *generate
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
     * @param {string} username
     * @param {string} password
     * @returns {boolean}
     * @memberof Bexio
     */
    public async fakeLogin(username: string, password: string): Promise<boolean> {
        let jar: CookieJar = request.jar()
        let resp: Response = await request.get(this.getAuthUrl(), { jar: jar, resolveWithFullResponse: true })
        if (resp.body.indexOf('username') > -1) {
            let cookies = jar.getCookies('https://idp.bexio.com/')
            let csrfToken = ''
            for (let cookie of cookies) {
                if (cookie.key === 'XSRF-TOKEN') {
                    csrfToken = cookie.value
                }
            }

            request({
                method: 'POST',
                url: resp.request.href,
                jar: jar,
                resolveWithFullResponse: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    'Referer': resp.request.href
                },
                body: 'username=' + username + '&password=' + password + '&_csrf=' + csrfToken
            }).then(authResponse => {
                console.log(authResponse.request.href)
                console.log(authResponse.body)
            }).catch(err => {
                console.log(err)
            })

        }
        return true
    }
}
