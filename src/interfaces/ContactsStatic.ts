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
    /** @deprecated */
    address?: string;
    street_name?: string;
    house_number?: string;
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
    nr?: string | null;
    name_1: string;
    user_id: number;
    country_id?: number | null;
    owner_id: number;
    contact_type_id: number;
    contact_group_ids?: Array<number> | null;
    name_2?: string | null;
    salutation_id?: number | null;
    salutation_form?: number | null;
    title_id?: number | null;
    birthday?: string | null;
    street_name?: string | null;
    house_number?: string | null;
    address_addition?: string | null;
    postcode?: string | null;
    city?: string | null;
    mail?: string | null;
    mail_second?: string | null;
    phone_fixed?: string | null;
    phone_fixed_second?: string | null;
    phone_mobile?: string | null;
    fax?: string | null;
    url?: string | null;
    skype_name?: string | null;
    remarks?: string | null;
    language_id?: number | null;
    contact_branch_ids?: string | null;
  }

  export interface ContactOverwrite {
    nr?: string | null;
    name_1: string;
    user_id: number;
    country_id?: number | null;
    owner_id: number;
    contact_type_id: number;
    contact_group_ids?: Array<number> | null;
    name_2?: string | null;
    salutation_id?: number | null;
    salutation_form?: number | null;
    title_id?: number | null;
    birthday?: string | null;
    street_name?: string | null;
    house_number?: string | null;
    address_addition?: string | null;
    postcode?: string | null;
    city?: string | null;
    mail?: string | null;
    mail_second?: string | null;
    phone_fixed?: string | null;
    phone_fixed_second?: string | null;
    phone_mobile?: string | null;
    fax?: string | null;
    url?: string | null;
    skype_name?: string | null;
    remarks?: string | null;
    language_id?: number | null;
    contact_branch_ids?: string | null;
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
