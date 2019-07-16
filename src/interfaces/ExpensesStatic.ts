export namespace ExpensesStatic {
  export interface Expense {
    id: number;
    document_nr: string;
    title?: string;
    contact_id: number;
    contact_sub_id?: number;
    user_id: number;
    pr_project_id?: number;
    logopaper_id: number;
    language_id: number;
    bank_account_id: number;
    currency_id: number;
    mwst_type: number;
    mwst_is_net: boolean;
    show_position_taxes: boolean;
    is_valid_from: string;
    is_valid_to: string;
    kb_item_status_id: number;
    api_reference?: string;
    total_gross: string;
    total_net: string;
    total_taxes: string;
    total_paid_payments: string;
    total_remaining_payments: string;
    viewed_by_client_at?: string;
    total: string;
    updated_at: string;
    taxs: Array<Tax>;
    info?: string;
    allowable_bill: null;
    account_id?: number;
    tax_id: number;
    amount: string;
  }

  export interface Tax {
    percentage: number;
    value: string;
  }

  export interface ExpenseCreate {
    user_id: number;
    contact_id: number;
    tax_id: number;
    amount: string;
    account_id: number;
    mwst_type: 0 | 1 | 2;
  }

  export interface ExpenseOverwrite {
    user_id: number;
    contact_id: number;
    tax_id: number;
    amount: string;
    account_id: number;
    mwst_type: 0 | 1 | 2;
    logopaper_id: number;
    language_id: number;
    bank_account_id: number;
    currency_id: number;
    nb_decimals_amount: number;
    nb_decimals_price: number;
    is_valid_from: number;
    is_compact_view: boolean;
    show_position_taxes: boolean;
    payment_type_id: number;
  }

  export enum SearchParameters {
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
