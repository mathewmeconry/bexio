export namespace PositionStatic {
    export interface PositionCreate {
        amount?: string,
        unit_id?: number,
        account_id?: number,
        tax_id?: number,
        text: string,
        unit_price?: string,
        discount_in_percent?: string
        type: string,
        parent_id?: number|null
        article_id?: number
        show_pos_nr?: boolean
        is_percentual?: boolean
        value?: string
    }
    export interface Position {
        id: number,
        type: string,
        amount: string,
        unit_id: number,
        account_id: number,
        unit_name: string,
        tax_id: number,
        tax_value: string,
        text: string,
        unit_price: string,
        discount_in_percent: null,
        position_total: string,
        pos: string,
        internal_pos: number,
        parent_id: null,
        is_optional: false

    }
}
