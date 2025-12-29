export namespace OutgoingPaymentsStatic {
  /**
   * Outgoing Payment Status
   */
  export enum OutgoingPaymentStatus {
    DOWNLOADED = 'DOWNLOADED',
    OPEN = 'OPEN',
    RECONCILED = 'RECONCILED',
    CANCELLED = 'CANCELLED',
    UPLOADED = 'UPLOADED',
    REJECTED = 'REJECTED',
  }

  /**
   * Outgoing Payment Type
   */
  export enum OutgoingPaymentType {
    IBAN = 'IBAN',
    MANUAL = 'MANUAL',
    CASH_DISCOUNT = 'CASH_DISCOUNT',
    QR = 'QR',
  }

  /**
   * Fee Type
   */
  export enum FeeType {
    BY_SENDER = 'BY_SENDER',
    BY_RECEIVER = 'BY_RECEIVER',
    BREAKDOWN = 'BREAKDOWN',
    NO_FEE = 'NO_FEE',
  }

  /**
   * Outgoing Payment
   */
  export interface OutgoingPayment {
    id: string;
    status: OutgoingPaymentStatus | string;
    created_at: string;
    bill_id: string;
    payment_type: OutgoingPaymentType | string;
    execution_date: string;
    amount: number;
    currency_code: string;
    exchange_rate: number;
    note?: string;
    sender_bank_account_id?: number;
    sender_iban?: string;
    sender_name?: string;
    sender_street?: string;
    sender_house_no?: string;
    sender_city?: string;
    sender_postcode?: string;
    sender_country_code?: string;
    sender_bc_no?: string;
    sender_bank_no?: string;
    sender_bank_name?: string;
    receiver_iban?: string;
    receiver_name?: string;
    receiver_street?: string;
    receiver_house_no?: string;
    receiver_city?: string;
    receiver_postcode?: string;
    receiver_country_code?: string;
    receiver_bc_no?: string;
    receiver_bank_no?: string;
    receiver_bank_name?: string;
    fee_type?: FeeType | string;
    is_salary_payment: boolean;
    reference_no?: string;
    message?: string;
    booking_text?: string;
    banking_payment_id?: string;
    banking_payment_entry_id?: string;
    transaction_id?: string;
  }

  /**
   * Outgoing Payment Create
   */
  export interface OutgoingPaymentCreate {
    bill_id: string;
    payment_type: OutgoingPaymentType | string;
    execution_date: string;
    amount: number;
    currency_code: string;
    exchange_rate: number;
    note?: string;
    sender_bank_account_id?: number;
    sender_iban?: string;
    sender_name?: string;
    sender_street?: string;
    sender_house_no?: string;
    sender_city?: string;
    sender_postcode?: string;
    sender_country_code?: string;
    sender_bc_no?: string;
    sender_bank_no?: string;
    sender_bank_name?: string;
    receiver_iban?: string;
    receiver_name?: string;
    receiver_street?: string;
    receiver_house_no?: string;
    receiver_city?: string;
    receiver_postcode?: string;
    receiver_country_code?: string;
    receiver_bc_no?: string;
    receiver_bank_no?: string;
    receiver_bank_name?: string;
    fee_type?: FeeType | string;
    is_salary_payment: boolean;
    reference_no?: string;
    message?: string;
    booking_text?: string;
  }

  /**
   * Outgoing Payment Update
   */
  export interface OutgoingPaymentUpdate {
    payment_id: string;
    execution_date: string;
    amount: number;
    fee_type?: FeeType | string;
    is_salary_payment: boolean;
    reference_no?: string | null;
    message?: string | null;
    receiver_iban?: string;
    receiver_name?: string;
    receiver_street?: string;
    receiver_house_no?: string;
    receiver_city?: string;
    receiver_postcode?: string;
    receiver_country_code?: string;
  }

  /**
   * List Options
   */
  export interface ListOptions {
    bill_id: string;
    limit?: number;
    page?: number;
    order?: 'asc' | 'desc';
    sort?: string;
  }
}
