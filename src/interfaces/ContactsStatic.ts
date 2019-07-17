export namespace ContactsStatic {
  export interface ContactSmall {
    id: number;
    nr: string;
    contact_type_id: number;
    name_1: string;
    name_2: string;
    salutation_id: number;
    salutation_form?: number;
    title_id?: number;
    birthday?: string;
    address: string;
    postcode: string;
    city: string;
    country_id: number;
    mail: string;
    mail_second: string;
    phone_fixed: string;
    phone_fixed_second: string;
    phone_mobile: string;
    fax: string;
    url: string;
    skype_name: string;
    remarks: string;
    language_id?: number;
    is_lead: boolean;
    contact_group_ids: string;
    contact_branch_ids?: string;
    user_id: number;
    owner_id: number;
    updated_at: string;
  }

  export interface ContactFull extends ContactSmall {
    profile_image: string;
  }

  export interface ContactCreate {
    name_1: string;
    user_id: number;
    country_id: number;
    owner_id: number;
    contact_type_id: number;
    contact_group_ids: Array<number>;
  }

  export interface ContactOverwrite {
    nr: string;
    name_1: string;
    user_id: number;
    country_id: number;
    owner_id: number;
    contact_type_id: number;
    contact_group_ids: Array<number>;
    id?: number;
    name_2?: string;
    salutation_id?: number;
    salutation_form?: number;
    title_id?: number;
    birthday?: string;
    address?: string;
    postcode?: string;
    city?: string;
    mail?: string;
    mail_second?: string;
    phone_fixed?: string;
    phone_fixed_second?: string;
    phone_mobile?: string;
    fax?: string;
    url?: string;
    skype_name?: string;
    remarks?: string;
    language_id?: number;
    is_lead?: boolean;
    contact_branch_ids?: string;
    updated_at?: string;
    profile_image?: string;
  }

  export enum ContactSearchParameters {
    id = "id",
    name_1 = "name_1",
    name_2 = "name_2",
    nr = "nr",
    address = "address",
    mail = "mail",
    mail_second = "mail_second",
    postcode = "postcode",
    city = "city",
    country_id = "country_id",
    contact_group_ids = "contact_group_ids",
    contact_type_id = "contact_type_id",
    updated_at = "updated_at",
    user_id = "user_id",
    phone_fixed = "phone_fixed",
    phone_mobile = "phone_mobile",
    fax = "fax",
  }
}
