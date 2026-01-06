import { BaseStatic } from "./BaseStatic";

export namespace TaxesStatic {
  export interface Tax {
    id: number;
    uuid: string;
    name: string;
    code: string;
    digit: string;
    type: 'sales_tax' | 'pre_tax';
    account_id: number;
    tax_settlement_type: string;
    value: number;
    net_tax_value: number | null;
    start_year: number;
    end_year: number | null;
    is_active: boolean;
    display_name: string;
    start_month: number;
    end_month: number;
  }

  export interface TaxOptions extends BaseStatic.BaseOptions {
    scope?: 'active' | 'inactive';
    date?: string;
    types?: 'sales_tax' | 'pre_tax';
  }

  /**
   * @deprecated Use TaxOptions instead
   */
  export interface SearchParameters extends TaxOptions {}
}
