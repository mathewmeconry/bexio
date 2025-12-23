import { PositionStatic } from "./PositionStatic";

export namespace InvoicesStatic {
  export interface Invoice {
    id: number;
    title: string | null;
    contact_id: number;
    contact_sub_id: number | null;
    user_id: number;
    pr_project_id: number | null;
    logopaper_id: number;
    language_id: number;
    bank_account_id: number;
    currency_id: number;
    payment_type_id: number;
    header: string;
    footer: string;
    mwst_type: number;
    mwst_is_net: boolean;
    show_position_taxes: boolean;
    is_valid_from: string;
    is_valid_to: string;
    reference: null | string;
    api_reference: null | string;
    template_slug: string;
    positions: PositionStatic.Position[];
    document_nr: string;
    total_gross: string;
    total_net: string;
    total_taxes: string;
    total_received_payments: string;
    total_credit_vouchers: string;
    total_remaining_payments: string;
    total: string;
    total_rounding_difference: number;
    contact_address: string;
    kb_item_status_id: number;
    viewed_by_client_at: string | null;
    updated_at: string;
    esr_id: number;
    qr_invoice_id: number;
    taxs: {
      percentage: string;
      value: string;
    }[];
    network_link: string | null;
  }

  export interface InvoiceCreate {
    title?: string | null;
    contact_id: number;
    contact_sub_id?: number | null;
    user_id: number;
    pr_project_id?: number | null;
    logopaper_id?: number;
    language_id?: number;
    bank_account_id?: number;
    currency_id?: number;
    payment_type_id?: number;
    header?: string;
    footer?: string;
    mwst_type?: number;
    mwst_is_net?: boolean;
    show_position_taxes?: boolean;
    is_valid_from?: string;
    is_valid_to?: string;
    reference?: string | null;
    api_reference?: string | null;
    template_slug?: string;
    positions: PositionStatic.PositionCreate[];
  }
  export interface InvoiceOverwrite {
    title?: string | null;
    contact_id?: number;
    contact_sub_id?: number | null;
    user_id?: number;
    pr_project_id?: number | null;
    logopaper_id?: number;
    language_id?: number;
    bank_account_id?: number;
    currency_id?: number;
    payment_type_id?: number;
    header?: string;
    footer?: string;
    mwst_type?: number;
    mwst_is_net?: boolean;
    show_position_taxes?: boolean;
    is_valid_from?: string;
    is_valid_to?: string;
    reference?: null;
    api_reference?: null;
    template_slug?: string;
    positions: PositionStatic.PositionCreate[];
  }

  export enum InvoiceSearchParameters {
    id = "id",
    kb_item_status_id = "kb_item_status_id",
    document_nr = "document_nr",
    title = "title",
    api_reference = "api_reference",
    contact_id = "contact_id",
    contact_sub_id = "contact_sub_id",
    user_id = "user_id",
    currency_id = "currency_id",
    total_gross = "total_gross",
    total_net = "total_net",
    total = "total",
    is_valid_from = "is_valid_from",
    is_valid_to = "is_valid_to",
    updated_at = "updated_at",
  }

  export interface InvoiceSent {
    recipient_email: string;
    subject: string;
    message: string;
    mark_as_open: boolean;
    attach_pdf?: boolean;
  }
  export interface InvoiceSentAnswer {
    success: boolean;
  }

  export enum KB_ITEM_STATUS {
    Draft = 7,
    Pending = 8,
    Paid = 9,
    Partial = 16,
    Canceled = 19,
    Unpaid = 31,
  }

  export enum MWST_TYPE {
    INCLUDING_TAXES = 0,
    EXCLUDING_TAXES = 1,
    EXEMPT_FROM_TAXES = 2,
  }
}
