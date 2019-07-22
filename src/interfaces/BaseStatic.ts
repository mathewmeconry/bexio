export namespace BaseStatic {
  export interface PdfResponse {
    name: string;
    size: number;
    mime: string;
    content: string;
  }

  export type SearchCriteria =
    | "="
    | "!="
    | ">"
    | "<"
    | ">="
    | "<="
    | "equal"
    | "not_equal"
    | "greater_than"
    | "less_than"
    | "greater_equal"
    | "less_equal"
    | "like"
    | "not_like"
    | "is_null"
    | "not_null";

  export interface SearchParameter<T> {
    field: T;
    value: any;
    criteria?: SearchCriteria;
  }

  export interface BaseOptions {
    limit?: number;
    offset?: number;
    order_by?: string;
    [index: string]: any;
  }
}
