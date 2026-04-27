export namespace PositionsStatic {
  export type KbDocumentType =
    | "kb_invoice"
    | "kb_offer"
    | "kb_order"
    | "kb_credit_voucher"
    | "kb_delivery";

  export interface CustomPositionCreate {
    amount?: string;
    amount_reserved?: string;
    amount_open?: string;
    amount_completed?: string;
    unit_id?: number;
    account_id?: number;
    tax_id?: number;
    text?: string;
    unit_price?: string;
    discount_in_percent?: string | null;
    is_optional?: boolean;
  }

  export interface CustomPosition extends CustomPositionCreate {
    id: number;
    unit_name?: string;
    tax_value?: string;
    position_total?: string;
    pos?: number | null;
    internal_pos?: number;
    type: "KbPositionCustom";
    parent_id?: number | null;
  }

  export interface ArticlePositionCreate extends CustomPositionCreate {
    article_id?: number;
  }

  export interface ArticlePosition extends Omit<CustomPosition, "type"> {
    article_id?: number;
    type: "KbPositionArticle";
  }

  export interface TextPositionCreate {
    text?: string;
    show_pos_nr?: boolean;
  }

  export interface TextPosition extends TextPositionCreate {
    id: number;
    pos?: number | null;
    internal_pos?: number;
    is_optional?: boolean;
    type: "KbPositionText";
    parent_id?: number | null;
  }
}
