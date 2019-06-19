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

  export type ContactSearchParameters =
    | "id"
    | "name_1"
    | "name_2"
    | "nr"
    | "address"
    | "mail"
    | "mail_second"
    | "postcode"
    | "city"
    | "country_id"
    | "contact_group_ids"
    | "contact_type_id"
    | "updated_at"
    | "user_id"
    | "phone_fixed"
    | "phone_mobile"
    | "fax";
}
