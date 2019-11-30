export namespace PaymentsStatic {
  export interface Payment {
    id: number;
    date: string;
    value: string;
    bank_account_id?: number;
    title: string;
    payment_service_id?: number;
    is_client_account_redemption: boolean;
    is_cash_discount: boolean;
    kb_invoice_id?: number;
    kb_credit_voucher_id?: number;
    kb_bill_id: number;
    kb_credit_voucher_text: string;
  }

  export interface PaymentCreate {
    date: string;
    value: number;
    bank_account_id?: number;
    payment_service_id?: number;
  }
}
