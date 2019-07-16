export namespace SalesOrderManagementStatic {
  export interface Estimate {
    id?: number;
    document_nr?: string;
    title?: string;
    contact_id: number;
    contact_sub_id?: number;
    user_id: number;
    project_id?: number;
    logopaper_id?: number;
    language_id?: number;
    bank_account_id?: number;
    currency_id?: number;
    payment_type_id?: number;
    header?: string;
    footer?: string;
    total_gross?: string;
    total_net?: string;
    total_taxes?: string;
    total?: string;
    mwst_type?: number;
    mwst_is_net?: boolean;
    show_position_taxes?: boolean;
    is_valid_from?: string;
    is_valid_until?: string;
    contact_address?: string;
    delivery_address_type?: number;
    delivery_address?: string;
    kb_item_status_id?: number;
    api_reference?: string;
    viewed_by_client_at?: string;
    kb_terms_of_payment_template_id?: number;
    show_total?: boolean;
    updated_at?: string;
    taxs?: Array<Tax>;
    network_link?: string;
    positions?: Array<Position>;
  }

  export interface Invoice {
    id?: number;
    document_nr?: string;
    title?: string;
    contact_id?: number;
    contact_sub_id?: number;
    user_id?: number;
    project_id?: number;
    logopaper_id?: number;
    language_id?: number;
    bank_account_id?: number;
    currency_id?: number;
    payment_type_id?: number;
    header?: string;
    footer?: string;
    total_gross?: string;
    total_net?: string;
    total_taxes?: string;
    total_received_payments?: string;
    total_credit_vouchers?: string;
    total_remaining_payments?: string;
    total?: string;
    mwst_type?: number;
    mwst_is_net?: boolean;
    show_position_taxes?: boolean;
    is_valid_from?: string;
    is_valid_to?: string;
    contact_address?: string;
    kb_item_status_id?: number;
    api_reference?: string;
    viewed_by_client_at?: string;
    updated_at?: string;
    esr_id?: number;
    taxs?: Array<Tax>;
    positions?: Array<Position>;
    network_link?: string;
  }

  export interface Order {
    id?: number;
    document_nr?: string;
    title?: string;
    contact_id?: number;
    contact_sub_id?: number;
    user_id?: number;
    project_id?: number;
    logopaper_id?: number;
    language_id?: number;
    bank_account_id?: number;
    currency_id?: number;
    payment_type_id?: number;
    header?: string;
    footer?: string;
    total_gross?: string;
    total_net?: string;
    total_taxes?: string;
    total?: string;
    mwst_type?: number;
    mwst_is_net?: boolean;
    show_position_taxes?: boolean;
    is_valid_from?: string;
    contact_address?: string;
    delivery_address_type?: number;
    delivery_address?: string;
    kb_item_status_id?: number;
    is_recurring?: boolean;
    api_reference?: string;
    viewed_by_client_at?: string;
    updated_at?: string;
    taxs?: Array<Tax>;
    positions?: Array<Position>;
    network_link?: string;
  }

  export interface Delivery {
    id?: number;
    document_nr?: string;
    title?: string;
    contact_id?: number;
    contact_sub_id?: number;
    user_id?: number;
    logopaper_id?: number;
    language_id?: number;
    bank_account_id?: number;
    currency_id?: number;
    header?: string;
    footer?: string;
    total_gross?: string;
    total_net?: string;
    total_taxes?: string;
    total?: string;
    mwst_type?: number;
    mwst_is_net?: boolean;
    is_valid_from?: string;
    contact_address?: string;
    delivery_address_type?: number;
    delivery_address?: string;
    kb_item_status_id?: number;
    api_reference?: string;
    viewed_by_client_at?: string;
    updated_at?: string;
    taxs?: Array<Tax>;
    positions?: Array<Position>;
  }

  export interface Comment {
    id?: number;
    text?: string;
    user_id?: number;
    user_email?: string;
    user_name?: string;
    date?: string;
    is_public?: boolean;
    image?: string;
    image_path?: string;
  }

  export interface Repetition {
    start: string;
    end: string;
    repetition: {
      type: string;
      interval: number;
      schedule: string;
    };
  }

  export interface Tax {
    percentage: number;
    value: string;
  }

  export interface Position {
    id?: number;
    type?: string;
    amount?: string;
    unit_id?: number;
    account_id?: number;
    unit_name?: string;
    tax_id?: number;
    tax_value?: string;
    text?: string;
    unit_price?: string;
    discount_in_percent?: string;
    position_total?: string;
    pos?: string;
    internal_pos?: number;
    parent_id?: number;
    is_optional?: boolean;
    article_id?: number;
  }

  export interface Payment {
    id: number;
    date: string;
    value: string;
    bank_account_id: number;
    title: string;
    payment_service_id: number;
    is_client_account_redemption: boolean;
    is_cash_discount: boolean;
    kb_invoice_id: number;
    kb_credit_voucher_id: number;
    kb_bill_id: number;
    kb_credit_voucher_text: string;
  }

  export enum EstimateSearchParameters {
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
    updated_at = 'updated_at'
  }

  export enum CommentSearchParameters {
    id = 'id',
    user_id = 'user_id',
    text = 'text',
    date = 'date',
    is_public = 'is_public'
  }

  export enum OrderSearchParameters {
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
    updated_at = 'updated_at'
  }

  export enum InvoiceSearchParameters {
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
    updated_at = 'updated_at'
  }

  export interface EstimateAcceptDecline {
    user_id?: number;
    user_name?: string;
    user_email?: string;
  }

  export interface EstimateSend {
    recipient_email?: string;
    subject?: string;
    message?: string;
    mark_as_open?: boolean;
    sender?: string;
  }

  export interface EstimateCopy {
    contact_id: number;
    contact_sub_id?: number;
    is_valid_from?: string;
    pr_project_id?: number;
    title?: string;
  }

  export interface InvoiceCopy {
    contact_id: number;
    contact_sub_id?: number;
    is_valid_from?: string;
    pr_project_id?: number;
    title?: string;
  }

  export interface InvoiceSend {
    message: string;
    recipient_email: string;
    subject: string;
    mark_as_open?: boolean;
    sender?: string;
  }
}
