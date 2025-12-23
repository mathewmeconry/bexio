export namespace CurrenciesStatic {
  export interface Currency {
    id: number;
    name: string;
    round_factor: number;
  }

  export interface CurrencyFull extends Currency {
    exchange_rate?: number;
    exchange_rate_id?: number;
    ratio?: number;
    exchange_rate_to_ratio?: number;
    source?: "custom" | "monthly_average";
    source_reason?:
      | "monthly_average_provided"
      | "monthly_average_unavailable"
      | "monthly_average_unreachable"
      | "source_custom";
    exchange_rate_date?: string;
  }

  export interface CurrencyCreate {
    name: string;
    round_factor: number;
  }
}
