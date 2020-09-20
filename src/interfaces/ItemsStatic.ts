export namespace ItemsStatic {
  export interface Item {
    id: number;
    user_id: number;
    article_type_id: number;
    contact_id: number;
    deliverer_code?: string;
    deliverer_name?: string;
    deliverer_description?: string;
    intern_code: string;
    intern_name: string;
    intern_description?: string;
    purchase_price?: number;
    sale_price?: number;
    purchase_total?: number;
    sale_total?: number;
    currency_id?: number;
    tax_income_id?: number;
    tax_id?: number;
    tax_expense_id?: number;
    unit_id?: number;
    is_stock: boolean;
    stock_id?: number;
    stock_place_id?: number;
    stock_nr: number;
    stock_min_nr: number;
    stock_reserved_nr: number;
    stock_available_nr: number;
    stock_picked_nr: number;
    stock_disposed_nr: number;
    stock_ordered_nr: number;
    width?: number;
    height?: number;
    weight?: number;
    volume?: number;
    html_text?: string;
    remarks?: string;
    delivery_price?: number;
    article_group_id?: number;
  }

  export interface ItemCreate {
    user_id: number;
    article_type_id: number;
    contact_id: number;
    deliverer_code?: string;
    deliverer_name?: string;
    deliverer_description?: string;
    intern_code: string;
    intern_name: string;
    intern_description?: string;
    purchase_price?: number;
    sale_price?: number;
    purchase_total?: number;
    sale_total?: number;
    currency_id?: number;
    tax_income_id?: number;
    tax_id?: number;
    tax_expense_id?: number;
    unit_id?: number;
    is_stock: boolean;
    stock_id?: number;
    stock_place_id?: number;
    stock_nr: number;
    stock_min_nr: number;
    stock_reserved_nr: number;
    stock_available_nr: number;
    stock_picked_nr: number;
    stock_disposed_nr: number;
    stock_ordered_nr: number;
    width?: number;
    height?: number;
    weight?: number;
    volume?: number;
    html_text?: string;
    remarks?: string;
    delivery_price?: number;
    article_group_id?: number;
  }

  export interface ItemOverwrite extends ItemCreate {}

  export enum ItemSearchParameters {
    id = "id",
    user_id = "user_id",
    article_type_id = "article_type_id",
    contact_id = "contact_id",
    deliverer_code = "deliverer_code",
    deliverer_name = "deliverer_name",
    deliverer_description = "deliverer_description",
    intern_code = "intern_code",
    intern_name = "intern_name",
    intern_description = "intern_description",
    purchase_price = "purchase_price",
    sale_price = "sale_price",
    purchase_total = "purchase_total",
    sale_total = "sale_total",
    currency_id = "currency_id",
    tax_income_id = "tax_income_id",
    tax_id = "tax_id",
    tax_expense_id = "tax_expense_id",
    unit_id = "unit_id",
    is_stock = "is_stock",
    stock_id = "stock_id",
    stock_place_id = "stock_place_id",
    stock_nr = "stock_nr",
    stock_min_nr = "stock_min_nr",
    stock_reserved_nr = "stock_reserved_nr",
    stock_available_nr = "stock_available_nr",
    stock_picked_nr = "stock_picked_nr",
    stock_disposed_nr = "stock_disposed_nr",
    stock_ordered_nr = "stock_ordered_nr",
    width = "width",
    height = "height",
    weight = "weight",
    volume = "volume",
    html_text = "html_text",
    remarks = "remarks",
    delivery_price = "delivery_price",
    article_group_id = "article_group_id",
  }
}
