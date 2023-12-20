import {PositionStatic} from "./PositionStatic";

export namespace InvoicesStatic {

  export interface Invoice {
    "id":number
    "title": string|null,
    "contact_id": number,
    "contact_sub_id": number|null,
    "user_id": number,
    "pr_project_id": number|null,
    "logopaper_id": number,
    "language_id": number,
    "bank_account_id": number,
    "currency_id": number,
    "payment_type_id": number,
    "header": string,
    "footer": string,
    "mwst_type": number,
    "mwst_is_net": boolean,
    "show_position_taxes": boolean,
    "is_valid_from": string,
    "is_valid_to": string,
    "reference": null|string,
    "api_reference": null|string,
    "template_slug": string,
    "positions": PositionStatic.Position[]
  }

  export interface InvoiceCreate {
    "title"?: string|null,
    "contact_id": number,
    "contact_sub_id"?: number|null,
    "user_id": number,
    "pr_project_id"?: number|null,
    "logopaper_id"?: number,
    "language_id"?: number,
    "bank_account_id"?: number,
    "currency_id"?: number,
    "payment_type_id"?: number,
    "header"?: string,
    "footer"?: string,
    "mwst_type"?: number,
    "mwst_is_net"?: boolean,
    "show_position_taxes"?: boolean,
    "is_valid_from"?: string,
    "is_valid_to"?: string,
    "reference"?: string|null,
    "api_reference"?: string|null,
    "template_slug"?: string,
    "positions": PositionStatic.PositionCreate[]
  }
  export interface InvoiceOverwrite {
    "title"?: string|null,
    "contact_id"?: number,
    "contact_sub_id"?: number|null,
    "user_id"?: number,
    "pr_project_id"?: number|null,
    "logopaper_id"?: number,
    "language_id"?: number,
    "bank_account_id"?: number,
    "currency_id"?: number,
    "payment_type_id"?: number,
    "header"?: string,
    "footer"?: string,
    "mwst_type"?: number,
    "mwst_is_net"?: boolean,
    "show_position_taxes"?: boolean,
    "is_valid_from"?: string,
    "is_valid_to"?: string,
    "reference"?: null,
    "api_reference"?: null,
    "template_slug"?: string,
    "positions": PositionStatic.PositionCreate[]
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
    "recipient_email":string,
    "subject": string,
    "message": string,
    "mark_as_open": boolean,
    "attach_pdf"?: boolean
  }
  export interface InvoiceSentAnswer {
    "success": boolean
  }
}

