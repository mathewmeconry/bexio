import OAuth2 from "../libs/OAuth2";
import RessourceBase, { BaseOptions } from "./RessourceBase";
import { Scopes, ContactsStatic } from "..";

export default class Contacts extends RessourceBase {
    /** 
     * =====================================================
     *                CONTACTS SECTION
     * =====================================================
     */

    /**
     * list all contacts
     *
     * @param {BaseOptions} options
     * @returns {Promise<Array<ContactsStatic.Contact>>}
     * @memberof Bexio
     */
    public async listContacts(options: BaseOptions): Promise<Array<ContactsStatic.Contact>> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return await this.request<Array<ContactsStatic.Contact>>('GET', '/contact', options)
    }

    /**
     * search for contacts
     *
     * @param {BaseOptions} options
     * @param {ContactsStatic.SearchParameters} searchParams
     * @returns {Promise<Array<ContactsStatic.Contact>>}
     * @memberof Bexio
     */
    public async searchContacts(options: BaseOptions, searchParams: ContactsStatic.SearchParameters): Promise<Array<ContactsStatic.Contact>> {
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

        return await this.request<Array<ContactsStatic.Contact>>('POST', '/contact/search', options, data)
    }

    /**
     * get a specific contact
     *
     * @param {number} contactId
     * @returns {Promise<ContactsStatic.Contact>}
     * @memberof Bexio
     */
    public async showContact(contactId: number): Promise<ContactsStatic.Contact> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return this.request<ContactsStatic.Contact>('GET', '/contact/' + contactId.toString(), {})
    }

    /**
     * creates a new contact and returns it
     *
     * @param {ContactsStatic.Contact} contact
     * @returns {Promise<ContactsStatic.Contact>}
     * @memberof Bexio
     */
    public async createContact(contact: ContactsStatic.Contact): Promise<ContactsStatic.Contact> {
        this.validateScope(Scopes.CONTACT_EDIT)

        return this.request<ContactsStatic.Contact>('POST', '/contact', {}, contact)
    }

    /**
     * overwrites an existing contact and returns it
     *
     * @param {number} contactId
     * @param {ContactsStatic.Contact} contact
     * @returns {Promise<ContactsStatic.Contact>}
     * @memberof Bexio
     */
    public async overwriteContact(contactId: number, contact: ContactsStatic.Contact): Promise<ContactsStatic.Contact> {
        this.validateScope(Scopes.CONTACT_EDIT)

        return this.request<ContactsStatic.Contact>('PUT', '/contact/' + contactId, {}, contact)
    }

    /**
     * edits an existing contact and returns it
     *
     * @param {number} contactId
     * @param {ContactsStatic.Contact} contact
     * @returns {Promise<ContactsStatic.Contact>}
     * @memberof Bexio
     */
    public async editContact(contactId: number, contact: ContactsStatic.Contact): Promise<ContactsStatic.Contact> {
        this.validateScope(Scopes.CONTACT_EDIT)

        return this.request<ContactsStatic.Contact>('POST', '/contact/' + contactId, {}, contact)
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
     * @param {Array<ContactsStatic.Contact>} contacts
     * @returns {Promise<Array<ContactsStatic.Contact>>}
     * @memberof Bexio
     */
    public async bulkCreateContacts(contacts: Array<ContactsStatic.Contact>): Promise<Array<ContactsStatic.Contact>> {
        this.validateScope(Scopes.CONTACT_EDIT)

        if (contacts.length > 50) {
            throw new Error('Too many contacts in bulk! Max is 50')
        }

        return this.request<Array<ContactsStatic.Contact>>('POST', '/contact/_bulk_create', {}, contacts)
    }

    /** 
     * =====================================================
     *                TYPES SECTION
     * =====================================================
     */
    /**
     * list all types
     *
     * @param {BaseOptions} options
     * @returns {Promise<Array<ContactsStatic.Type>>}
     * @memberof Contacts
     */
    public async listTypes(options: BaseOptions): Promise<Array<ContactsStatic.Type>> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return this.request<Array<ContactsStatic.Type>>('GET', '/contact_type', options)
    }

    /**
     * search for types
     *
     * @param {BaseOptions} options
     * @param {ContactsStatic.TypeSearchParameters} searchParams
     * @returns {Promise<Array<ContactsStatic.Type>>}
     * @memberof Contacts
     */
    public async searchTypes(options: BaseOptions, searchParams: ContactsStatic.TypeSearchParameters): Promise<Array<ContactsStatic.Type>> {
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

        return this.request<Array<ContactsStatic.Type>>('POST', '/contact_type/search', options, data)
    }

    /**
     * show a specific type
     *
     * @param {number} typeId
     * @returns {Promise<ContactsStatic.Type>}
     * @memberof Contacts
     */
    public async showType(typeId: number): Promise<ContactsStatic.Type> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return this.request<ContactsStatic.Type>('GET', '/contact_type/' + typeId.toString(), {})
    }

    /** 
     * =====================================================
     *                SECOTRS SECTION
     * =====================================================
     */
    /**
     * list all sectors
     *
     * @param {BaseOptions} options
     * @returns {Promise<Array<ContactsStatic.Sector>>}
     * @memberof Contacts
     */
    public async listSectors(options: BaseOptions): Promise<Array<ContactsStatic.Sector>> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return this.request<Array<ContactsStatic.Sector>>('GET', '/contact_branch', options)
    }

    /**
     * search for sectors
     *
     * @param {BaseOptions} options
     * @param {ContactsStatic.SectorSearchParameters} searchParams
     * @returns {Promise<Array<ContactsStatic.Sector>>}
     * @memberof Contacts
     */
    public async searchSectors(options: BaseOptions, searchParams: ContactsStatic.SectorSearchParameters): Promise<Array<ContactsStatic.Sector>> {
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

        return this.request<Array<ContactsStatic.Sector>>('POST', '/contact_branch/search', options, data)
    }

    /**
     * show a specific sectors
     *
     * @param {number} sectorId
     * @returns {Promise<ContactsStatic.Sector>}
     * @memberof Contacts
     */
    public async showSector(sectorId: number): Promise<ContactsStatic.Sector> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return this.request<ContactsStatic.Sector>('GET', '/contact_branch/' + sectorId.toString(), {})
    }

    /** 
     * =====================================================
     *                GROUPS SECTION
     * =====================================================
     */
    /**
     * list all groups
     *
     * @param {BaseOptions} options
     * @returns {Promise<Array<ContactsStatic.Group>>}
     * @memberof Contacts
     */
    public async listGroups(options: BaseOptions): Promise<Array<ContactsStatic.Group>> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return this.request<Array<ContactsStatic.Group>>('GET', '/contact_group', options)
    }

    /**
     * search for groups
     *
     * @param {BaseOptions} options
     * @param {ContactsStatic.GroupSearchParameters} searchParams
     * @returns {Promise<Array<ContactsStatic.Group>>}
     * @memberof Contacts
     */
    public async searchGroups(options: BaseOptions, searchParams: ContactsStatic.GroupSearchParameters): Promise<Array<ContactsStatic.Group>> {
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

        return this.request<Array<ContactsStatic.Group>>('POST', '/contact_group/search', options, data)
    }

    /**
     * show a specific groups
     *
     * @param {number} groupId
     * @returns {Promise<ContactsStatic.Group>}
     * @memberof Contacts
     */
    public async showGroup(groupId: number): Promise<ContactsStatic.Group> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return this.request<ContactsStatic.Group>('GET', '/contact_group/' + groupId.toString(), {})
    }

    /**
     * Creates a new group
     *
     * @param {ContactsStatic.Group} group
     * @returns {Promise<ContactsStatic.Group>}
     * @memberof Contacts
     */
    public async createGroup(group: ContactsStatic.Group): Promise<ContactsStatic.Group> {
        this.validateScope(Scopes.GENERAL)

        return this.request<ContactsStatic.Group>('POST', '/contact_group', {}, group)
    }

    /**
     * overwrite a specific group
     *
     * @param {number} groupId
     * @param {ContactsStatic.Group} group
     * @returns {Promise<ContactsStatic.Group>}
     * @memberof Contacts
     */
    public async overwriteGroup(groupId: number, group: ContactsStatic.Group): Promise<ContactsStatic.Group> {
        this.validateScope(Scopes.GENERAL)

        return this.request<ContactsStatic.Group>('PUT', '/contact_group/' + groupId.toString(), {}, group)
    }

    /**
     * edit a group
     *
     * @param {number} groupId
     * @param {ContactsStatic.Group} group
     * @returns {Promise<ContactsStatic.Group>}
     * @memberof Contacts
     */
    public async editGroup(groupId: number, group: ContactsStatic.Group): Promise<ContactsStatic.Group> {
        this.validateScope(Scopes.GENERAL)

        return this.request<ContactsStatic.Group>('POST', '/contact_group/' + groupId.toString(), {}, group)
    }

    /** 
     * =====================================================
     *                RELATIONS SECTION
     * =====================================================
     */
    /**
     * list all relations
     *
     * @param {BaseOptions} options
     * @returns {Promise<Array<ContactsStatic.Relation>>}
     * @memberof Contacts
     */
    public async listRelations(options: BaseOptions): Promise<Array<ContactsStatic.Relation>> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return this.request<Array<ContactsStatic.Relation>>('GET', '/contact_relation', options)
    }

    /**
     * search for relations
     *
     * @param {BaseOptions} options
     * @param {ContactsStatic.RelationSearchParameters} searchParams
     * @returns {Promise<Array<ContactsStatic.Relation>>}
     * @memberof Contacts
     */
    public async searchRelations(options: BaseOptions, searchParams: ContactsStatic.RelationSearchParameters): Promise<Array<ContactsStatic.Relation>> {
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

        return this.request<Array<ContactsStatic.Relation>>('POST', '/contact_relation/search', options, data)
    }

    /**
     * show a specific relation
     *
     * @param {number} relationId
     * @returns {Promise<ContactsStatic.Relation>}
     * @memberof Contacts
     */
    public async showRelation(relationId: number): Promise<ContactsStatic.Relation> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return this.request<ContactsStatic.Relation>('GET', '/contact_relation/' + relationId.toString(), {})
    }

    /**
     * Creates a new relation
     *
     * @param {ContactsStatic.Relation} relation
     * @returns {Promise<ContactsStatic.Relation>}
     * @memberof Contacts
     */
    public async createRelation(relation: ContactsStatic.Relation): Promise<ContactsStatic.Relation> {
        this.validateScope(Scopes.CONTACT_EDIT)

        return this.request<ContactsStatic.Relation>('POST', '/contact_relation', {}, relation)
    }

    /**
     * overwrite a specific relation
     *
     * @param {number} relationId
     * @param {ContactsStatic.Relation} relation
     * @returns {Promise<ContactsStatic.Relation>}
     * @memberof Contacts
     */
    public async overwriteRelation(relationId: number, relation: ContactsStatic.Relation): Promise<ContactsStatic.Relation> {
        this.validateScope(Scopes.CONTACT_EDIT)

        return this.request<ContactsStatic.Relation>('PUT', '/contact_relation/' + relationId.toString(), {}, relation)
    }

    /**
     * edit a relation
     *
     * @param {number} relationId
     * @param {ContactsStatic.Relation} relation
     * @returns {Promise<ContactsStatic.Relation>}
     * @memberof Contacts
     */
    public async editRelation(relationId: number, relation: ContactsStatic.Relation): Promise<ContactsStatic.Relation> {
        this.validateScope(Scopes.CONTACT_EDIT)

        return this.request<ContactsStatic.Relation>('POST', '/contact_relation/' + relationId.toString(), {}, relation)
    }

    /**
    * delete a relation
    *
    * @param {number} relationId
    * @returns {Promise<boolean>}
    * @memberof Contacts
    */
    public async deleteRelation(relationId: number): Promise<boolean> {
        this.validateScope(Scopes.CONTACT_EDIT)

        return (await this.request<{ success: boolean }>('DELETE', '/contact_relation/' + relationId.toString(), {})).success
    }

    /** 
     * =====================================================
     *                ADDITIONAL ADDRESSES SECTION
     * =====================================================
     */
    /**
     * list all additional addresses
     *
     * @param {number} contactId
     * @param {BaseOptions} options
     * @returns {Promise<Array<ContactsStatic.AdditionalAddress>>}
     * @memberof Contacts
     */
    public async listAdditionalAddresses(contactId: number, options: BaseOptions): Promise<Array<ContactsStatic.AdditionalAddress>> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return this.request<Array<ContactsStatic.AdditionalAddress>>('GET', '/contact/' + contactId.toString() + '/additional_address', options)
    }

    /**
     * search for additional addresses
     *
     * @param {number} contactId
     * @param {BaseOptions} options
     * @param {ContactsStatic.AdditionalAddressSearchParameters} searchParams
     * @returns {Promise<Array<ContactsStatic.AdditionalAddress>>}
     * @memberof Contacts
     */
    public async searchAdditionalAddresses(contactId: number, options: BaseOptions, searchParams: ContactsStatic.AdditionalAddressSearchParameters): Promise<Array<ContactsStatic.AdditionalAddress>> {
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

        return this.request<Array<ContactsStatic.AdditionalAddress>>('POST', '/contact/' + contactId.toString() + '/additional_address/search', options, data)
    }

    /**
     * show a specific additionalAddress
     *
     * @param {number} contactId
     * @param {number} additionalAddressId
     * @returns {Promise<ContactsStatic.AdditionalAddress>}
     * @memberof Contacts
     */
    public async showAdditionalAddress(contactId: number, additionalAddressId: number): Promise<ContactsStatic.AdditionalAddress> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return this.request<ContactsStatic.AdditionalAddress>('GET', '/contact/' + contactId.toString() + '/additional_address/' + additionalAddressId.toString(), {})
    }

    /**
     * Creates a new additionalAddress
     *
     * @param {number} contactId
     * @param {ContactsStatic.AdditionalAddress} additionalAddress
     * @returns {Promise<ContactsStatic.AdditionalAddress>}
     * @memberof Contacts
     */
    public async createAdditionalAddress(contactId: number, additionalAddress: ContactsStatic.AdditionalAddress): Promise<ContactsStatic.AdditionalAddress> {
        this.validateScope(Scopes.CONTACT_EDIT)

        return this.request<ContactsStatic.AdditionalAddress>('POST', '/contact/' + contactId.toString() + '/additional_address', {}, additionalAddress)
    }

    /**
     * overwrite a specific additionalAddress
     *
     * @param {number} contactId
     * @param {number} additionalAddressId
     * @param {ContactsStatic.AdditionalAddress} additionalAddress
     * @returns {Promise<ContactsStatic.AdditionalAddress>}
     * @memberof Contacts
     */
    public async overwriteAdditionalAddress(contactId: number, additionalAddressId: number, additionalAddress: ContactsStatic.AdditionalAddress): Promise<ContactsStatic.AdditionalAddress> {
        this.validateScope(Scopes.CONTACT_EDIT)

        return this.request<ContactsStatic.AdditionalAddress>('PUT', '/contact/' + contactId.toString() + '/additional_address/' + additionalAddressId.toString(), {}, additionalAddress)
    }

    /**
     * edit a additionalAddress
     *
     * @param {number} contactId
     * @param {number} additionalAddressId
     * @param {ContactsStatic.AdditionalAddress} additionalAddress
     * @returns {Promise<ContactsStatic.AdditionalAddress>}
     * @memberof Contacts
     */
    public async editAdditionalAddress(contactId: number, additionalAddressId: number, additionalAddress: ContactsStatic.AdditionalAddress): Promise<ContactsStatic.AdditionalAddress> {
        this.validateScope(Scopes.CONTACT_EDIT)

        return this.request<ContactsStatic.AdditionalAddress>('POST', '/contact/' + contactId.toString() + '/additional_address/' + additionalAddressId.toString(), {}, additionalAddress)
    }

    /**
    * delete a additionalAddress
    *
    * @param {number} contactId
    * @param {number} additionalAddressId
    * @returns {Promise<boolean>}
    * @memberof Contacts
    */
    public async deleteAdditionalAddress(contactId: number, additionalAddressId: number): Promise<boolean> {
        this.validateScope(Scopes.CONTACT_EDIT)

        return (await this.request<{ success: boolean }>('DELETE', '/contact/' + contactId.toString() + '/additional_address/' + additionalAddressId.toString(), {})).success
    }

    /** 
     * =====================================================
     *                SALUTATIONS SECTION
     * =====================================================
     */
    /**
     * list all salutations
     *
     * @param {BaseOptions} options
     * @returns {Promise<Array<ContactsStatic.Salutation>>}
     * @memberof Contacts
     */
    public async listSalutations(options: BaseOptions): Promise<Array<ContactsStatic.Salutation>> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return this.request<Array<ContactsStatic.Salutation>>('GET', '/salutation', options)
    }

    /**
     * search for salutations
     *
     * @param {BaseOptions} options
     * @param {ContactsStatic.SalutationSearchParameters} searchParams
     * @returns {Promise<Array<ContactsStatic.Salutation>>}
     * @memberof Contacts
     */
    public async searchSalutations(options: BaseOptions, searchParams: ContactsStatic.SalutationSearchParameters): Promise<Array<ContactsStatic.Salutation>> {
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

        return this.request<Array<ContactsStatic.Salutation>>('POST', '/salutation/search', options, data)
    }

    /**
     * show a specific salutation
     *
     * @param {number} salutationId
     * @returns {Promise<ContactsStatic.Salutation>}
     * @memberof Contacts
     */
    public async showSalutation(salutationId: number): Promise<ContactsStatic.Salutation> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return this.request<ContactsStatic.Salutation>('GET', '/salutation/' + salutationId.toString(), {})
    }

    /**
     * Creates a new salutation
     *
     * @param {ContactsStatic.Salutation} salutation
     * @returns {Promise<ContactsStatic.Salutation>}
     * @memberof Contacts
     */
    public async createSalutation(salutation: ContactsStatic.Salutation): Promise<ContactsStatic.Salutation> {
        this.validateScope(Scopes.GENERAL)

        return this.request<ContactsStatic.Salutation>('POST', '/salutation', {}, salutation)
    }

    /**
     * overwrite a specific salutation
     *
     * @param {number} salutationId
     * @param {ContactsStatic.Salutation} salutation
     * @returns {Promise<ContactsStatic.Salutation>}
     * @memberof Contacts
     */
    public async overwriteSalutation(salutationId: number, salutation: ContactsStatic.Salutation): Promise<ContactsStatic.Salutation> {
        this.validateScope(Scopes.GENERAL)

        return this.request<ContactsStatic.Salutation>('PUT', '/salutation/' + salutationId.toString(), {}, salutation)
    }

    /**
     * edit a salutation
     *
     * @param {number} salutationId
     * @param {ContactsStatic.Salutation} salutation
     * @returns {Promise<ContactsStatic.Salutation>}
     * @memberof Contacts
     */
    public async editSalutation(salutationId: number, salutation: ContactsStatic.Salutation): Promise<ContactsStatic.Salutation> {
        this.validateScope(Scopes.GENERAL)

        return this.request<ContactsStatic.Salutation>('POST', '/salutation/' + salutationId.toString(), {}, salutation)
    }

    /**
    * delete a salutation
    *
    * @param {number} salutationId
    * @returns {Promise<boolean>}
    * @memberof Contacts
    */
    public async deleteSalutation(salutationId: number): Promise<boolean> {
        this.validateScope(Scopes.GENERAL)

        return (await this.request<{ success: boolean }>('DELETE', '/salutation/' + salutationId.toString(), {})).success
    }

    /** 
     * =====================================================
     *                TITLES SECTION
     * =====================================================
     */
    /**
     * list all titles
     *
     * @param {BaseOptions} options
     * @returns {Promise<Array<ContactsStatic.Title>>}
     * @memberof Contacts
     */
    public async listTitles(options: BaseOptions): Promise<Array<ContactsStatic.Title>> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return this.request<Array<ContactsStatic.Title>>('GET', '/title', options)
    }

    /**
     * search for titles
     *
     * @param {BaseOptions} options
     * @param {ContactsStatic.TitleSearchParameters} searchParams
     * @returns {Promise<Array<ContactsStatic.Title>>}
     * @memberof Contacts
     */
    public async searchTitles(options: BaseOptions, searchParams: ContactsStatic.TitleSearchParameters): Promise<Array<ContactsStatic.Title>> {
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

        return this.request<Array<ContactsStatic.Title>>('POST', '/title/search', options, data)
    }

    /**
     * show a specific title
     *
     * @param {number} titleId
     * @returns {Promise<ContactsStatic.Title>}
     * @memberof Contacts
     */
    public async showTitle(titleId: number): Promise<ContactsStatic.Title> {
        this.validateScope(Scopes.CONTACT_SHOW)

        return this.request<ContactsStatic.Title>('GET', '/title/' + titleId.toString(), {})
    }

    /**
     * Creates a new title
     *
     * @param {ContactsStatic.Title} title
     * @returns {Promise<ContactsStatic.Title>}
     * @memberof Contacts
     */
    public async createTitle(title: ContactsStatic.Title): Promise<ContactsStatic.Title> {
        this.validateScope(Scopes.GENERAL)

        return this.request<ContactsStatic.Title>('POST', '/title', {}, title)
    }

    /**
     * overwrite a specific title
     *
     * @param {number} titleId
     * @param {ContactsStatic.Title} title
     * @returns {Promise<ContactsStatic.Title>}
     * @memberof Contacts
     */
    public async overwriteTitle(titleId: number, title: ContactsStatic.Title): Promise<ContactsStatic.Title> {
        this.validateScope(Scopes.GENERAL)

        return this.request<ContactsStatic.Title>('PUT', '/title/' + titleId.toString(), {}, title)
    }

    /**
     * edit a title
     *
     * @param {number} titleId
     * @param {ContactsStatic.Title} title
     * @returns {Promise<ContactsStatic.Title>}
     * @memberof Contacts
     */
    public async editTitle(titleId: number, title: ContactsStatic.Title): Promise<ContactsStatic.Title> {
        this.validateScope(Scopes.GENERAL)

        return this.request<ContactsStatic.Title>('POST', '/title/' + titleId.toString(), {}, title)
    }

    /**
    * delete a title
    *
    * @param {number} titleId
    * @returns {Promise<boolean>}
    * @memberof Contacts
    */
    public async deleteTitle(titleId: number): Promise<boolean> {
        this.validateScope(Scopes.GENERAL)

        return (await this.request<{ success: boolean }>('DELETE', '/title/' + titleId.toString(), {})).success
    }
}