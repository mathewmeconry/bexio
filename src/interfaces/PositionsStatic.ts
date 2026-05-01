export namespace PositionsStatic {
  export type KbDocumentType = "kb_invoice" | "kb_offer" | "kb_order";

  export interface DefaultPositionCreate {
    amount: string;
    amount_reserved: string;
    amount_open: string;
    amount_completed: string;
    unit_id: number;
    account_id: number;
    tax_id: number;
    text: string;
    unit_price: string;
    discount_in_percent: string | null;
    is_optional: boolean;
  }

  export interface DefaultPosition extends Omit<DefaultPositionCreate, "unit_price"> {
    id: number;
    unit_name: string;
    tax_value: string;
    position_total: string;
    unit_price: string | null;
    pos: string;
    internal_pos: number;
    type: "KbPositionCustom";
    parent_id: number | null;
  }

  export interface ItemPositionCreate extends DefaultPositionCreate {
    article_id: number;
  }

  export interface ItemPosition extends Omit<DefaultPosition, "type"> {
    article_id: number;
    type: "KbPositionArticle";
  }

  export interface TextPositionCreate {
    text: string;
    show_pos_nr: boolean;
  }

  export interface TextPosition extends TextPositionCreate {
    id: number;
    pos: string | null;
    internal_pos: number;
    is_optional: boolean;
    type: "KbPositionText";
    parent_id: number | null;
  }
}
