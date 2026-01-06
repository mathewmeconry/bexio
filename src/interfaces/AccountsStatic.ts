export namespace AccountsStatic {
  export interface Account {
    id: number;
    uuid: string;
    account_no: string;
    name: string;
    account_type: number;
    tax_id: number;
    fibu_account_group_id: number;
    is_active: boolean;
    is_locked: boolean;
  }

  export type SearchParameters =
    | "account_no"
    | "fibu_account_group_id"
    | "name"
    | "account_type";
}
