export namespace BillsV4Static {
  export interface Bill {
    id: string; // uuid, required
    document_no: string; // required, 1..255 chars
    title?: string; // 1..80 chars
    status: BillStatus; // required, enum
    firstname_suffix?: string; // 1..80 chars
    lastname_company: string; // required, 1..80 chars
    created_at: string; // required, date-time
    vendor_ref?: string; // 1..255 chars
    pending_amount?: number; // double
    currency_code: string; // required, 1..20 chars
    net?: number; // double, calculated from line_items and discounts
    gross?: number; // double, calculated from line_items and discounts
    bill_date: string; // required, date
    due_date: string; // required, date
    overdue: boolean; // required
    booking_account_ids: number[]; // required, array of int32
    attachment_ids: string[]; // required, array of uuid
  }

  export interface BillFull extends Bill {
    supplier_id: number;
    contact_partner_id: number;
    amount_man: number;
    amount_calc: number;
    manual_amount: boolean;
    exchange_rate: number;
    base_currency_code: string;
    item_net: boolean;
    split_into_line_items: boolean;
    purchase_order_id?: number;
    base_currency_amount: number;
    qr_bill_information?: string;
    address: Address;
    line_items: LineItem[];
    discounts: Discount[];
    payment?: Payment;
    note?: string;
  }

  export interface Address {
    title?: string;
    salutation?: string;
    firstname_suffix?: string;
    lastname_company: string;
    address_line?: string;
    postcode?: string;
    city?: string;
    country_code?: string;
    main_contact_id?: number;
    contact_address_id?: number;
    type: "PRIVATE" | "COMPANY";
  }

  export interface LineItem {
    position: number;
    title?: string;
    tax_id?: number;
    amount: number;
    booking_account_id?: number;
  }

  export interface Discount {
    position: number;
    amount: number;
  }

  export interface Payment {
    type: PaymentType;
    bank_account_id?: number;
    fee?: PaymentFee;
    execution_date: string;
    exchange_rate?: number;
    amount: number;
    account_no?: string;
    iban?: string;
    name?: string;
    address?: string;
    street?: string;
    house_no?: string;
    postcode?: string;
    city?: string;
    country_code?: string;
    message?: string;
    booking_text?: string;
    salary_payment?: boolean;
    reference_no?: string;
  }

  export interface BillCreate {
    supplier_id: number;
    vendor_ref?: string;
    title?: string;
    contact_partner_id: number;
    bill_date: string;
    due_date: string;
    amount_man?: number;
    amount_calc?: number;
    manual_amount: boolean;
    currency_code: string;
    exchange_rate?: number;
    base_currency_amount?: number;
    item_net: boolean;
    purchase_order_id?: number;
    qr_bill_information?: string;
    attachment_ids: string[];
    address: Address;
    line_items: LineItem[];
    discounts: Discount[];
    payment?: Payment;
    salary_payment?: boolean;
    reference_no?: string;
    note?: string;
  }

  export interface BillOverwrite {
    document_no?: string;
    title?: string;
    supplier_id: number;
    vendor_ref?: string;
    contact_partner_id: number;
    bill_date: string;
    due_date: string;
    amount_man?: number;
    amount_calc?: number;
    manual_amount: boolean;
    currency_code: string;
    exchange_rate?: number;
    item_net: boolean;
    split_into_line_items: boolean;
    base_currency_amount?: number;
    attachment_ids: string[];
    address: Address;
    line_items: LineItem[];
    discounts: Discount[];
    payment?: Payment;
  }

  export enum SearchParameters {
    document_no = "document_no",
    title = "title",
    vendor_ref = "vendor_ref",
    currency_code = "currency_code",
    lastname_company = "lastname_company",
    firstname_suffix = "firstname_suffix",
  }

  export enum BillStatusUpdate {
    DRAFT = "DRAFT",
    BOOKED = "BOOKED",
  }

  export enum BillAction {
    DUPLICATE = "DUPLICATE",
  }

  export enum BillStatusFilter {
    DRAFTS = "DRAFTS",
    TODO = "TODO", 
    PAID = "PAID",
    OVERDUE = "OVERDUE",
  }

  export interface ListOptions {
    limit?: number;
    page?: number;
    order?: "asc" | "desc";
    sort?: string;
    search_term?: string;
    "fields[]"?: string[];
    status?: BillStatusFilter;
    bill_date_start?: string;
    bill_date_end?: string;
    due_date_start?: string;
    due_date_end?: string;
    vendor_ref?: string;
    title?: string;
    currency_code?: string;
    pending_amount_min?: number;
    pending_amount_max?: number;
    vendor?: string;
    gross_min?: number;
    gross_max?: number;
    net_min?: number;
    net_max?: number;
    document_no?: string;
    supplier_id?: number;
    average_exchange_rate_enabled?: boolean;
  }

  export enum PaymentType {
    IBAN = "IBAN",
    MANUAL = "MANUAL",
    QR = "QR",
  }

  export enum PaymentFee {
    BY_SENDER = "BY_SENDER",
    BY_RECEIVER = "BY_RECEIVER",
    BREAKDOWN = "BREAKDOWN",
    NO_FEE = "NO_FEE",
  }

  export enum BillStatus {
    DRAFT = "DRAFT",
    BOOKED = "BOOKED",
    PARTIALLY_CREATED = "PARTIALLY_CREATED",
    CREATED = "CREATED",
    PARTIALLY_SENT = "PARTIALLY_SENT",
    SENT = "SENT",
    PARTIALLY_DOWNLOADED = "PARTIALLY_DOWNLOADED",
    DOWNLOADED = "DOWNLOADED",
    PARTIALLY_PAID = "PARTIALLY_PAID",
    PAID = "PAID",
    PARTIALLY_FAILED = "PARTIALLY_FAILED",
    FAILED = "FAILED",
  }
}
