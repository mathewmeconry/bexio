export namespace BillsStatic {
  export interface Bill {
    id: number;
    document_nr: string;
    title: string;
    contact_id: number;
    contact_sub_id: number;
    user_id: number;
    pr_project_id: number;
    logopaper_id: number;
    language_id: number;
    bank_account_id: number;
    currency_id: number;
    header: string;
    footer: string;
    total_gross: string;
    total_net: string;
    total_taxes: string;
    total_regards_taxes: string;
    total_paid_payments: string;
    total_remaining_payments: string;
    total: string;
    total_rounding_difference: number;
    mwst_type: 0 | 1 | 2;
    mwst_is_net: boolean;
    show_position_taxes: boolean;
    is_valid_from: string;
    is_valid_to: string;
    contact_address: string;
    kb_item_status_id: number;
    api_reference: string;
    viewed_by_client_at: string;
    updated_at: string;
    taxs: Array<Tax>;
  }

  export interface BillFull extends Bill {
    positions: Array<CustomPosition | ArticlePosition>;
  }

  export interface BillCreate {
    contact_id: number;
    user_id: number;
    api_reference?: string;
    bank_account_id?: number;
    contact_address_id?: number;
    contact_address_manual?: string;
    contact_sub_id?: number;
    currency_id?: number;
    footer?: string;
    header?: string;
    is_compact_view?: boolean;
    is_valid_from?: string;
    is_valid_to?: string;
    language_id?: number;
    logopaper_id?: number;
    mwst_is_net?: boolean;
    mwst_type?: 0 | 1 | 2;
    nb_decimals_amount?: number;
    nb_decimals_price?: number;
    payment_type_id?: number;
    pr_project_id?: number;
    show_position_taxes?: boolean;
    terms_of_payment_text?: string;
    title?: string;
    viewed_by_client_at?: string;
    positions: Array<CustomPositionCreate | ArticlePositionCreate>;
  }

  export interface Tax {
    percentage: number;
    value: string;
  }

  export enum SearchParameters {
    id = 'id',
    kb_item_status_id = 'kb_item_status_id',
    document_nr = 'document_nr',
    title = 'title',
    contact_id = 'contact_id',
    contact_sub_id = 'contact_sub_id',
    user_id = 'user_id',
    currency_id = 'currency_id',
    total_gross = 'total_gross',
    total_net = 'total_net',
    total = 'total',
    is_valid_from = 'is_valid_from',
    is_valid_to = 'is_valid_to',
    is_valid_until = 'is_valid_until',
    updated_at = 'updated_at',
  }

  export interface Position {
    id: number;
    type: "KbPositionCustom" | "KbPositionArticle";
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
  }

  export interface PositionCreate {
    type: "KbPositionCustom" | "KbPositionArticle";
    unit_price: string;
    tax_id: number;
    amount: string;
    account_id: number;
    text?: string;
    discount_in_percent?: number;
    unit_id?: number;
  }

  export interface CustomPositionCreate extends PositionCreate {
  }

  export interface CustomPosition extends Position {
  }

  export interface ArticlePositionCreate extends PositionCreate {
    type: "KbPositionArticle";
    article_id: number;
  }

  export interface ArticlePosition extends Position {
    type: "KbPositionArticle";
    article_id: number;
  }

  export interface BillOverwrite {
    contact_id: number;
    user_id: number;
    api_reference: string;
    bank_account_id: number;
    contact_address_id?: number;
    contact_address_manual?: string;
    contact_sub_id: number;
    currency_id: number;
    footer: string;
    header: string;
    is_valid_from: string;
    is_valid_to: string;
    language_id: number;
    logopaper_id: number;
    mwst_is_net: boolean;
    mwst_type: 0 | 1 | 2;
    show_position_taxes: boolean;
    title: string;
    positions: Array<CustomPositionOverwrite | ArticlePositionOverwrite>;
    nb_decimals_amount: number,
    nb_decimals_price: number,
    is_compact_view: boolean,
    payment_type_id: number
  }

  export interface PositionOverwrite {
    type: "KbPositionCustom" | "KbPositionArticle";
    unit_price: string;
    tax_id: number;
    amount: string;
    account_id: number;
    text: string;
  }

  export interface ArticlePositionOverwrite extends PositionOverwrite {
    type: "KbPositionArticle";
    article_id: number;
  }

  export interface CustomPositionOverwrite extends PositionOverwrite {
  }

}
