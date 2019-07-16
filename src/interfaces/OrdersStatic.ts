export namespace OrdersStatic {
  export interface OrderSmall {
    id: number;
    document_nr: string;
    title?: string;
    contact_id: number;
    contact_sub_id?: number;
    user_id: number;
    project_id?: number;
    logopaper_id: number;
    language_id: number;
    bank_account_id: number;
    currency_id: number;
    payment_type_id: number;
    header: string;
    footer: string;
    total_gross: string;
    total_net: string;
    total_taxes: string;
    total: string;
    mwst_type: number;
    mwst_is_net: boolean;
    show_position_taxes: boolean;
    is_valid_from: string;
    contact_address: string;
    delivery_address_type: number;
    delivery_address: string;
    kb_item_status_id: number;
    is_recurring: boolean;
    api_reference?: string;
    viewed_by_client_at?: string;
    updated_at: string;
    taxs: Tax[];
    network_link: string;
  }

  export interface Tax {
    percentage: number;
    value: string;
  }

  export interface OrderFull extends OrderSmall {
    positions: Position[];
  }

  export interface OrderCreate {
    user_id: number;
    contact_id: number;
    positions: Position[];
  }

  export interface Position {
    id: number;
    type: string;
    amount: string;
    unit_id?: number;
    account_id: number;
    unit_name?: string;
    tax_id: number;
    tax_value: string;
    text: string;
    unit_price: string;
    discount_in_percent?: string;
    position_total: string;
    pos: string;
    internal_pos: number;
    parent_id?: number;
    is_optional: boolean;
    article_id: number;
  }

  export enum OrderSearchParameters {
    id = "id",
    kb_item_status_id = "kb_item_status_id",
    document_nr = "document_nr",
    title = "title",
    contact_id = "contact_id",
    contact_sub_id = "contact_sub_id",
    user_id = "user_id",
    currency_id = "currency_id",
    total_gross = "total_gross",
    total_net = "total_net",
    total = "total",
    is_valid_from = "is_valid_from",
    is_valid_to = "is_valid_to",
    is_valid_until = "is_valid_until",
    updated_at = "updated_at"
  }
}
