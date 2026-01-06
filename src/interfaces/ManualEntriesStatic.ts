import { BaseStatic } from "./BaseStatic";

export namespace ManualEntriesStatic {
  export type ManualEntryType =
    | "manual_single_entry"
    | "manual_compound_entry"
    | "manual_group_entry";

  export interface Entry {
    id?: number;
    debit_account_id: number;
    credit_account_id: number;
    tax_id?: number;
    tax_account_id?: number;
    amount: number;
    currency_id: number;
    exchange_rate?: number;
    text?: string;
  }

  export interface ManualEntry {
    id: number;
    type: ManualEntryType;
    date: string;
    reference_nr: string;
    entries: Entry[];
    created_by_user_id: number;
    edited_by_user_id: number;
    is_locked: boolean;
    locked_info?: string;
  }

  export interface ManualEntryCreate {
    type: ManualEntryType;
    date: string;
    reference_nr?: string;
    entries: Entry[];
  }

  export interface ManualEntryUpdate extends ManualEntryCreate {
    id: number;
  }

  export interface ListOptions extends BaseStatic.BaseOptions {}

  export interface SearchParameters {
    id?: number;
    date?: string;
    reference_nr?: string;
  }
}
