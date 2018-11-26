import { BaseOptions } from "./index";
import { Contact } from "./interfaces/Contact";
import Scopes from './constants/Scopes'
import OAuth2, { AuthorizationResponse } from './libs/OAuth2'
import request from 'request-promise-native'

export interface BaseOptions {
    limit?: number,
    offset?: number,
    order_by?: string,
    [index: string]: any
}

export default class Bexio {
    private clientId: string
    private clientSecret: string
    private redirectUri: string
    private scopes: Array<Scopes>

    private bexioAuth: OAuth2

    constructor(clientId: string, clientSecret: string, redirectUri: string, scopes: Array<Scopes>) {
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.redirectUri = redirectUri
        this.scopes = scopes

        this.bexioAuth = new OAuth2(this.clientId, this.clientSecret, this.redirectUri, this.scopes)
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
     * Parses the token out of the reponse url
     *
     * @param {AuthorizationResponse} query
     * @returns {Promise<void>}
     * @memberof Bexio
     */
    public async generateAccessToken(query: AuthorizationResponse): Promise<void> {
        await this.bexioAuth.generateAccessToken(query)
    }

    /** 
      * ========================================================================
      * Contact Section
      * ========================================================================
      */

    /**
     * list all contacts
     *
     * @param {BaseOptions} options
     * @returns {Promise<Array<Contact.Contact>>}
     * @memberof Bexio
     */
    public async listContacts(options: BaseOptions): Promise<Array<Contact.Contact>> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return await this.request<Array<Contact.Contact>>('GET', '/contact', options)
    }

    /**
     * search for contacts
     *
     * @param {BaseOptions} options
     * @param {Contact.SearchParameters} searchParams
     * @returns {Promise<Array<Contact.Contact>>}
     * @memberof Bexio
     */
    public async searchContacts(options: BaseOptions, searchParams: Contact.SearchParameters): Promise<Array<Contact.Contact>> {
        this.validateScope(Scopes.CONTACT_SHOW)

        let data = []
        for (let i in searchParams) {
            if (searchParams.hasOwnProperty(i)) {
                data.push({
                    'field': i,
                    'value': searchParams[i]
                })
            }
        }

        return await this.request<Array<Contact.Contact>>('POST', '/contact/search', options, data)
    }

    /**
     * get a specific contact
     *
     * @param {number} contactId
     * @returns {Promise<Contact.Contact>}
     * @memberof Bexio
     */
    public async showContact(contactId: number): Promise<Contact.Contact> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return this.request<Contact.Contact>('GET', '/contact/' + contactId.toString(), {})
    }

    /**
     * creates a new contact and returns it
     *
     * @param {Contact.Contact} contact
     * @returns {Promise<Contact.Contact>}
     * @memberof Bexio
     */
    public async createContact(contact: Contact.Contact): Promise<Contact.Contact> {
        this.validateScope(Scopes.CONTACT_EDIT)

        return this.request<Contact.Contact>('POST', '/contact', {}, contact)
    }

    /**
     * overwrites an existing contact and returns it
     *
     * @param {number} contactId
     * @param {Contact.Contact} contact
     * @returns {Promise<Contact.Contact>}
     * @memberof Bexio
     */
    public async overwriteContact(contactId: number, contact: Contact.Contact): Promise<Contact.Contact> {
        this.validateScope(Scopes.CONTACT_EDIT)

        return this.request<Contact.Contact>('PUT', '/contact/' + contactId, {}, contact)
    }

    /**
     * edits an existing contact and returns it
     *
     * @param {number} contactId
     * @param {Contact.Contact} contact
     * @returns {Promise<Contact.Contact>}
     * @memberof Bexio
     */
    public async editContact(contactId: number, contact: Contact.Contact): Promise<Contact.Contact> {
        this.validateScope(Scopes.CONTACT_EDIT)

        return this.request<Contact.Contact>('POST', '/contact/' + contactId, {}, contact)
    }

    /**
     * deletes an existing contact
     *
     * @param {number} contactId
     * @returns {Promise<boolean>}
     * @memberof Bexio
     */
    public async deleteContact(contactId: number): Promise<boolean> {
        this.validateScope(Scopes.CONTACT_EDIT)

        return (await this.request<{ success: boolean }>('DELETE', '/contact/' + contactId, {})).success
    }

    /**
     * bulk creates multiple contacts (max is 50)
     *
     * @param {Array<Contact.Contact>} contacts
     * @returns {Promise<Array<Contact.Contact>>}
     * @memberof Bexio
     */
    public async bulkCreateContacts(contacts: Array<Contact.Contact>): Promise<Array<Contact.Contact>> {
        this.validateScope(Scopes.CONTACT_EDIT)

        if (contacts.length > 50) {
            throw new Error('Too many contacts in bulk! Max is 50')
        }

        return this.request<Array<Contact.Contact>>('POST', '/contact/_bulk_create', {}, contacts)
    }


    /** 
      * ========================================================================
      * Helper Functions
      * ========================================================================
      */

    /**
     * Base request to the api
     *
     * @private
     * @template T
     * @param {string} method
     * @param {string} path
     * @param {BaseOptions} options
     * @param {*} [data]
     * @returns {Promise<T>}
     * @memberof Bexio
     */
    private async request<T>(method: string, path: string, options: BaseOptions, data?: any): Promise<T> {
        let requestOptions = {
            method: method,
            url: this.bexioAuth.getApiUrl() + path + '?' + this.optionsToQuery(options),
            json: true,
            headers: {
                'Authorization': await this.bexioAuth.getBearerHeader()
            }
        }

        if (data) {
            //@ts-ignore
            requestOptions.body = data
        }
        return await request(requestOptions)
    }

    /**
     * Generates the querystring out of the options
     *
     * @private
     * @param {BaseOptions} options
     * @returns {string}
     * @memberof Bexio
     */
    private optionsToQuery(options: BaseOptions): string {
        let str = []
        for (let i in options) {
            if (options.hasOwnProperty(i)) {
                str.push(encodeURIComponent(i) + '=' + encodeURIComponent(options[i]))
            }
        }

        return str.join('&')
    }

    /**
     * Validates if the needed scope is availabe in this access token
     *
     * @private
     * @param {Scopes} neededScope
     * @memberof Bexio
     */
    private validateScope(neededScope: Scopes): void {
        if (this.scopes.indexOf(neededScope) < 0) {
            throw new Error(neededScope + ' not in available scopes')
        }
    }
}.