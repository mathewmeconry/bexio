import OAuth2 from "../libs/OAuth2";
import RessourceBase, { BaseOptions } from "./RessourceBase";
import { Scopes, Contact } from "..";

export default class Contacts extends RessourceBase {
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
}