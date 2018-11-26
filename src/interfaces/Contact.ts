export namespace Contact {
    export interface Contact {
        'id'?: number,
        'nr'?: string,
        'contact_type_id'?: number,
        'name_1'?: string,
        'name_2'?: string,
        'salutation_id'?: number,
        'salutation_form'?: number,
        'title_id'?: number,
        'birthday'?: string,
        'address'?: string,
        'postcode'?: string,
        'city'?: string,
        'country_id'?: number,
        'mail'?: string,
        'mail_second'?: string,
        'phone_fixed'?: string,
        'phone_fixed_second'?: string,
        'phone_mobile'?: string,
        'fax'?: string,
        'url'?: string,
        'skype_name'?: string,
        'remarks'?: string,
        'language_id'?: number
        'is_lead'?: boolean,
        'contact_group_ids'?: string,
        'contact_branch_ids'?: string,
        'user_id'?: number,
        'owner_id'?: number,
        'updated_at'?: string
    }

    export interface Type {
        'id': number,
        'name': string
    }

    export interface Sector {
        'id': number,
        'name': string
    }

    export interface Group {
        'id': number,
        'name': string
    }

    export interface Relation {
        'id': number,
        'contact_id': number,
        'contact_sub_id': number,
        'description': string,
        'updated_at': string
    }

    export interface AdditionalAdress {
        "id": number,
        "name": string,
        "address": string,
        "postcode": string,
        "city": string,
        "country_id": number,
        "subject": string,
        "description": string,
    }

    export interface Solutation {
        'id': number,
        'name': string
    }

    export interface Title {
        'id': number,
        'name': string
    }

    export interface SearchParameters {
        'id'?: string,
        'name_1'?: string,
        'name_2'?: string,
        'nr'?: string,
        'address'?: string,
        'mail'?: string,
        'mail_second'?: string,
        'postcode'?: string,
        'city'?: string,
        'country_id'?: string,
        'contact_group_ids'?: string,
        'contact_type_id'?: string,
        'updated_at'?: string,
        'user_id'?: string,
        'phone_fixed'?: string,
        'phone_mobile'?: string,
        'fax'?: string,
        [index:string]: string | undefined
    }

    export enum SortParameters {
        'id' = 'id',
        'nr' = 'nr',
        'name_1' = 'name_1',
        'updated_at' = 'updated_at'
    }
}
