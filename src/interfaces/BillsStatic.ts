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
    total_paid_payments: string;
    total_remaining_payments: string;
    total: string;
    mwst_type: number;
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

  export interface Tax {
    percentage: number;
    value: string;
  }

  export interface SearchParameters {
    id?: string;
    kb_item_status_id?: string;
    document_nr?: string;
    title?: string;
    contact_id?: string;
    contact_sub_id?: string;
    user_id?: string;
    currency_id?: string;
    total_gross?: string;
    total_net?: string;
    total?: string;
    is_valid_from?: string;
    is_valid_to?: string;
    is_valid_until?: string;
    updated_at?: string;
  }
}
