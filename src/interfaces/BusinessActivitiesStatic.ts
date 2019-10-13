export namespace BusinessActivitiesStatic {
  export interface BusinessActivity {
    id: number;
    name: string;
    default_is_billable?: boolean;
    default_price_per_hour?: string;
    account_id?: number;
  }

  export interface BusinessActivityCreate {
    name: string;
    default_is_billable?: boolean;
    default_price_per_hour?: string;
    account_id?: number;
  }

  export interface BusinessActivityOverwrite {
    name: string;
    default_is_billable?: boolean;
    default_price_per_hour?: string;
    account_id?: number;
  }

  export enum BusinessActivitySearchParameters {
    name = "name",
  }
}
