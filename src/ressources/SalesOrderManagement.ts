import RessourceBase, { BaseOptions } from "./RessourceBase";
import Scopes from "../constants/Scopes";
import { SalesOrderManagementStatic } from "../interfaces/SalesOrderManagementStatic";
import { BaseStatic } from "../interfaces/BaseStatic";

export default class SalesOrderManagement extends RessourceBase {
    /** 
     * =====================================================
     *                ESTIMATES SECTION
     * =====================================================
     */

    /**
     * list all estimates
     *
     * @param {BaseOptions} options
     * @returns {Promise<Array<SalesOrderManagementStatic.Estimate>>}
     * @memberof SalesOrderManagement
     */
    public async listEstimates(options: BaseOptions): Promise<Array<SalesOrderManagementStatic.Estimate>> {
        this.validateScope(Scopes.KB_OFFER_SHOW)

        return this.request<Array<SalesOrderManagementStatic.Estimate>>('GET', '/kb_offer', options)
    }

    /**
     * search all estimates
     *
     * @param {BaseOptions} options
     * @param {SalesOrderManagementStatic.EstimateSearchParameters} searchParams
     * @returns {Promise<Array<SalesOrderManagementStatic.Estimate>>}
     * @memberof SalesOrderManagement
     */
    public async searchEstimates(options: BaseOptions, searchParams: SalesOrderManagementStatic.EstimateSearchParameters): Promise<Array<SalesOrderManagementStatic.Estimate>> {
        this.validateScope(Scopes.KB_OFFER_SHOW)

        let data = []
        for (let i in searchParams) {
            if (searchParams.hasOwnProperty(i)) {
                data.push({
                    'field': i,
                    'value': searchParams[i]
                })
            }
        }

        return this.request<Array<SalesOrderManagementStatic.Estimate>>('POST', '/kb_offer/search', options)
    }

    /**
     * get one specific estimate
     *
     * @param {number} estimatetId
     * @returns {Promise<SalesOrderManagementStatic.Estimate>}
     * @memberof SalesOrderManagement
     */
    public async showEstimate(estimatetId: number): Promise<SalesOrderManagementStatic.Estimate> {
        this.validateScope(Scopes.KB_OFFER_SHOW)

        return this.request<SalesOrderManagementStatic.Estimate>('GET', '/kb_offer/' + estimatetId.toString(), {})
    }

    /**
     * create a new estimate
     *
     * @param {SalesOrderManagementStatic.Estimate} estimate
     * @returns {Promise<SalesOrderManagementStatic.Estimate>}
     * @memberof SalesOrderManagement
     */
    public async createEstimate(estimate: SalesOrderManagementStatic.Estimate): Promise<SalesOrderManagementStatic.Estimate> {
        this.validateScope(Scopes.KB_OFFER_EDIT)

        return this.request<SalesOrderManagementStatic.Estimate>('POST', '/kb_offer', {}, estimate)
    }

    /**
     * overwrite a specific estimate
     *
     * @param {number} estimateId
     * @param {SalesOrderManagementStatic.Estimate} estimate
     * @returns {Promise<SalesOrderManagementStatic.Estimate>}
     * @memberof SalesOrderManagement
     */
    public async overwriteEstimate(estimateId: number, estimate: SalesOrderManagementStatic.Estimate): Promise<SalesOrderManagementStatic.Estimate> {
        this.validateScope(Scopes.KB_OFFER_EDIT)

        return this.request<SalesOrderManagementStatic.Estimate>('PUT', '/kb_offer/' + estimateId.toString(), {}, estimate)
    }

    /**
     * edit a estimate
     *
     * @param {number} estimateId
     * @param {SalesOrderManagementStatic.Estimate} estimate
     * @returns {Promise<SalesOrderManagementStatic.Estimate>}
     * @memberof SalesOrderManagement
     */
    public async editEstimate(estimateId: number, estimate: SalesOrderManagementStatic.Estimate): Promise<SalesOrderManagementStatic.Estimate> {
        this.validateScope(Scopes.KB_OFFER_EDIT)

        return this.request<SalesOrderManagementStatic.Estimate>('POST', '/kb_offer/' + estimateId.toString(), {}, estimate)
    }

    /**
     * delete a estimate
     *
     * @param {number} estimateId
     * @returns {Promise<boolean>}
     * @memberof SalesOrderManagement
     */
    public async deleteEstimate(estimateId: number): Promise<boolean> {
        this.validateScope(Scopes.KB_OFFER_EDIT)

        return (await this.request<{ success: boolean }>('DELETE', '/kb_offer/' + estimateId.toString(), {})).success
    }

    /**
     * get one specific estimates pdf
     *
     * @param {number} estimatetId
     * @returns {Promise<BaseStatic.PdfResponse>}
     * @memberof SalesOrderManagement
     */
    public async showEstimatePdf(estimatetId: number): Promise<BaseStatic.PdfResponse> {
        this.validateScope(Scopes.KB_OFFER_SHOW)

        return this.request<BaseStatic.PdfResponse>('GET', '/kb_offer/' + estimatetId.toString() + '/pdf', {})
    }

    /**
     * accept an estimate. works only if kb_item_status_id = 2 (status open)
     *
     * @param {number} estimateId
     * @param {SalesOrderManagementStatic.EstimateAcceptDecline} data
     * @returns {Promise<boolean>}
     * @memberof SalesOrderManagement
     */
    public async acceptEstimate(estimateId: number, data: SalesOrderManagementStatic.EstimateAcceptDecline): Promise<boolean> {
        this.validateScope(Scopes.KB_OFFER_SHOW)

        return (await this.request<{ success: boolean }>('POST', '/kb_offer/' + estimateId.toString() + '/accept', {}, data)).success
    }

    /**
     * decline an estimate. works only if kb_item_status_id = 2 (status open)
     *
     * @param {number} estimateId
     * @param {SalesOrderManagementStatic.EstimateAcceptDecline} data
     * @returns {Promise<boolean>}
     * @memberof SalesOrderManagement
     */
    public async declineEstimate(estimateId: number, data: SalesOrderManagementStatic.EstimateAcceptDecline): Promise<boolean> {
        this.validateScope(Scopes.KB_OFFER_SHOW)

        return (await this.request<{ success: boolean }>('POST', '/kb_offer/' + estimateId.toString() + '/reject', {}, data)).success
    }

    /**
     * issue a estimate
     *
     * @param {number} estimateId
     * @returns {Promise<boolean>}
     * @memberof SalesOrderManagement
     */
    public async issueEstimate(estimateId: number): Promise<boolean> {
        this.validateScope(Scopes.KB_OFFER_SHOW)

        return (await this.request<{ success: boolean }>('POST', '/kb_offer/' + estimateId.toString() + '/issue', {})).success
    }

    /**
     * reissue a estimate
     *
     * @param {number} estimateId
     * @returns {Promise<boolean>}
     * @memberof SalesOrderManagement
     */
    public async reissueEstimate(estimateId: number): Promise<boolean> {
        this.validateScope(Scopes.KB_OFFER_SHOW)

        return (await this.request<{ success: boolean }>('POST', '/kb_offer/' + estimateId.toString() + '/reissue', {})).success
    }

    /**
     * revert issue a estimate
     *
     * @param {number} estimateId
     * @returns {Promise<boolean>}
     * @memberof SalesOrderManagement
     */
    public async revertIssueEstimate(estimateId: number): Promise<boolean> {
        this.validateScope(Scopes.KB_OFFER_SHOW)

        return (await this.request<{ success: boolean }>('POST', '/kb_offer/' + estimateId.toString() + '/revertIssue', {})).success
    }

    /**
     * mark as sent a estimate
     *
     * @param {number} estimateId
     * @returns {Promise<boolean>}
     * @memberof SalesOrderManagement
     */
    public async markAsSentEstimate(estimateId: number): Promise<boolean> {
        this.validateScope(Scopes.KB_OFFER_SHOW)

        return (await this.request<{ success: boolean }>('POST', '/kb_offer/' + estimateId.toString() + '/mark_as_sent', {})).success
    }

    /**
     * send a estimate
     *
     * @param {number} estimateId
     * @param {SalesOrderManagementStatic.EstimateSend} message
     * @returns {Promise<boolean>}
     * @memberof SalesOrderManagement
     */
    public async sendEstimate(estimateId: number, message: SalesOrderManagementStatic.EstimateSend): Promise<boolean> {
        this.validateScope(Scopes.KB_OFFER_SHOW)

        return (await this.request<{ success: boolean }>('POST', '/kb_offer/' + estimateId.toString() + '/send', {}, message)).success
    }

    /**
     * copies an estimate
     *
     * @param {number} estimateId
     * @param {SalesOrderManagementStatic.EstimateCopy} copyCommand
     * @returns {Promise<SalesOrderManagementStatic.Estimate>}
     * @memberof SalesOrderManagement
     */
    public async copyEstimate(estimateId: number, copyCommand: SalesOrderManagementStatic.EstimateCopy): Promise<SalesOrderManagementStatic.Estimate> {
        this.validateScope(Scopes.KB_OFFER_SHOW)

        return this.request<SalesOrderManagementStatic.Estimate>('POST', '/kb_offer/' + estimateId.toString() + '/copy', {}, copyCommand)
    }

    /**
     * creates a new invoice from this estimate
     *
     * @param {number} estimateId
     * @param {{ position?: Array<SalesOrderManagementStatic.Position> }} [positions={}]
     * @returns {Promise<SalesOrderManagementStatic.Invoice>}
     * @memberof SalesOrderManagement
     */
    public async createInvoiceFromEstimate(estimateId: number, positions: { position?: Array<SalesOrderManagementStatic.Position> } = {}): Promise<SalesOrderManagementStatic.Invoice> {
        this.validateScope(Scopes.KB_OFFER_SHOW)

        return this.request<SalesOrderManagementStatic.Invoice>('POST', '/kb_offer/' + estimateId.toString() + '/invoice', {}, positions)
    }

    /**
     * creates a new order from this estimate
     *
     * @param {number} estimateId
     * @param {{ position?: Array<SalesOrderManagementStatic.Position> }} [positions={}]
     * @returns {Promise<SalesOrderManagementStatic.Order>}
     * @memberof SalesOrderManagement
     */
    public async createOrderFromEstimate(estimateId: number, positions: { position?: Array<SalesOrderManagementStatic.Position> } = {}): Promise<SalesOrderManagementStatic.Order> {
        this.validateScope(Scopes.KB_OFFER_SHOW)

        return this.request<SalesOrderManagementStatic.Order>('POST', '/kb_offer/' + estimateId.toString() + '/order', {}, positions)
    }

    /**
     * list all comments of an estimate
     *
     * @param {number} estimateId
     * @param {BaseOptions} options
     * @returns {Promise<Array<SalesOrderManagementStatic.Comment>>}
     * @memberof SalesOrderManagement
     */
    public async listEstimateComments(estimateId: number, options: BaseOptions): Promise<Array<SalesOrderManagementStatic.Comment>> {
        this.validateScope(Scopes.GENERAL)

        return this.request<Array<SalesOrderManagementStatic.Comment>>('GET', '/kb_offer/' + estimateId.toString() + '/comment', options)
    }

    /**
     * search all comments
     *
     * @param {number} estimateId
     * @param {BaseOptions} options
     * @param {SalesOrderManagementStatic.CommentSearchParameters} searchParams
     * @returns {Promise<Array<SalesOrderManagementStatic.Comment>>}
     * @memberof SalesOrderManagement
     */
    public async searchEstimateComments(estimateId: number, options: BaseOptions, searchParams: SalesOrderManagementStatic.CommentSearchParameters): Promise<Array<SalesOrderManagementStatic.Comment>> {
        this.validateScope(Scopes.GENERAL)

        let data = []
        for (let i in searchParams) {
            if (searchParams.hasOwnProperty(i)) {
                data.push({
                    'field': i,
                    'value': searchParams[i]
                })
            }
        }

        return this.request<Array<SalesOrderManagementStatic.Comment>>('POST', '/kb_offer/' + estimateId.toString() + '/comment/search', options, data)
    }

    /**
     * get one specific comment
     *
     * @param {number} estimateId
     * @param {number} commentId
     * @returns {Promise<SalesOrderManagementStatic.Comment>}
     * @memberof SalesOrderManagement
     */
    public async showEstimateComment(estimateId: number, commentId: number): Promise<SalesOrderManagementStatic.Comment> {
        this.validateScope(Scopes.GENERAL)

        return this.request<SalesOrderManagementStatic.Comment>('GET', '/kb_offer/' + estimateId.toString() + '/comment/' + commentId.toString(), {})
    }

    /**
     * create a new comment
     *
     * @param {number} estimateId
     * @param {SalesOrderManagementStatic.Comment} estimate
     * @returns {Promise<SalesOrderManagementStatic.Comment>}
     * @memberof SalesOrderManagement
     */
    public async createEstimateComment(estimateId: number, comment: SalesOrderManagementStatic.Comment): Promise<SalesOrderManagementStatic.Comment> {
        this.validateScope(Scopes.GENERAL)

        return this.request<SalesOrderManagementStatic.Comment>('POST', '/kb_offer/' + estimateId.toString() + '/comment/', {}, comment)
    }

    /** 
     * =====================================================
     *                ORDERS SECTION
     * =====================================================
     */

    /**
     * list all orders
     *
     * @param {BaseOptions} options
     * @returns {Promise<Array<SalesOrderManagementStatic.Order>>}
     * @memberof SalesOrderManagement
     */
    public async listOrders(options: BaseOptions): Promise<Array<SalesOrderManagementStatic.Order>> {
        this.validateScope(Scopes.KB_ORDER_SHOW)

        return this.request<Array<SalesOrderManagementStatic.Order>>('GET', '/kb_order', options)
    }

    /**
     * search all orders
     *
     * @param {BaseOptions} options
     * @param {SalesOrderManagementStatic.OrderSearchParameters} searchParams
     * @returns {Promise<Array<SalesOrderManagementStatic.Order>>}
     * @memberof SalesOrderManagement
     */
    public async searchOrders(options: BaseOptions, searchParams: SalesOrderManagementStatic.OrderSearchParameters): Promise<Array<SalesOrderManagementStatic.Order>> {
        this.validateScope(Scopes.KB_ORDER_SHOW)

        let data = []
        for (let i in searchParams) {
            if (searchParams.hasOwnProperty(i)) {
                data.push({
                    'field': i,
                    'value': searchParams[i]
                })
            }
        }

        return this.request<Array<SalesOrderManagementStatic.Order>>('POST', '/kb_order/search', options)
    }

    /**
     * get one specific order
     *
     * @param {number} orderId
     * @returns {Promise<SalesOrderManagementStatic.Order>}
     * @memberof SalesOrderManagement
     */
    public async showOrder(orderId: number): Promise<SalesOrderManagementStatic.Order> {
        this.validateScope(Scopes.KB_ORDER_SHOW)

        return this.request<SalesOrderManagementStatic.Order>('GET', '/kb_order/' + orderId.toString(), {})
    }

    /**
     * create a new order
     *
     * @param {SalesOrderManagementStatic.Order} order
     * @returns {Promise<SalesOrderManagementStatic.Order>}
     * @memberof SalesOrderManagement
     */
    public async createOrder(order: SalesOrderManagementStatic.Order): Promise<SalesOrderManagementStatic.Order> {
        this.validateScope(Scopes.KB_ORDER_EDIT)

        return this.request<SalesOrderManagementStatic.Order>('POST', '/kb_order', {}, order)
    }

    /**
     * overwrite a specific order
     *
     * @param {number} orderId
     * @param {SalesOrderManagementStatic.Order} order
     * @returns {Promise<SalesOrderManagementStatic.Order>}
     * @memberof SalesOrderManagement
     */
    public async overwriteOrder(orderId: number, order: SalesOrderManagementStatic.Order): Promise<SalesOrderManagementStatic.Order> {
        this.validateScope(Scopes.KB_ORDER_EDIT)

        return this.request<SalesOrderManagementStatic.Order>('PUT', '/kb_order/' + orderId.toString(), {}, order)
    }

    /**
     * edit a order
     *
     * @param {number} orderId
     * @param {SalesOrderManagementStatic.Order} order
     * @returns {Promise<SalesOrderManagementStatic.Order>}
     * @memberof SalesOrderManagement
     */
    public async editOrder(orderId: number, order: SalesOrderManagementStatic.Order): Promise<SalesOrderManagementStatic.Order> {
        this.validateScope(Scopes.KB_ORDER_EDIT)

        return this.request<SalesOrderManagementStatic.Order>('POST', '/kb_order/' + orderId.toString(), {}, order)
    }

    /**
     * delete a order
     *
     * @param {number} orderId
     * @returns {Promise<boolean>}
     * @memberof SalesOrderManagement
     */
    public async deleteOrder(orderId: number): Promise<boolean> {
        this.validateScope(Scopes.KB_ORDER_EDIT)

        return (await this.request<{ success: boolean }>('DELETE', '/kb_order/' + orderId.toString(), {})).success
    }

    /**
     * create a delivery from an order
     *
     * @param {number} orderId
     * @param {{ position?: Array<SalesOrderManagementStatic.Position> }} [positions={}]
     * @returns {Promise<SalesOrderManagementStatic.Delivery>}
     * @memberof SalesOrderManagement
     */
    public async createDeliveryFromOrder(orderId: number, positions: { position?: Array<SalesOrderManagementStatic.Position> } = {}): Promise<SalesOrderManagementStatic.Delivery> {
        this.validateScope(Scopes.KB_ORDER_SHOW)

        return this.request<SalesOrderManagementStatic.Delivery>('POST', '/kb_order/' + orderId.toString() + '/delivery', {}, positions)
    }


    /**
     * create a invoice from an order
     *
     * @param {number} orderId
     * @param {{ position?: Array<SalesOrderManagementStatic.Position> }} [positions={}]
     * @returns {Promise<SalesOrderManagementStatic.Invoice>}
     * @memberof SalesOrderManagement
     */
    public async createInvoiceFromOrder(orderId: number, positions: { position?: Array<SalesOrderManagementStatic.Position> } = {}): Promise<SalesOrderManagementStatic.Invoice> {
        this.validateScope(Scopes.KB_ORDER_SHOW)

        return this.request<SalesOrderManagementStatic.Invoice>('POST', '/kb_order/' + orderId.toString() + '/invoice', {}, positions)
    }

    /**
     * get one specific order pdf
     *
     * @param {number} orderId
     * @returns {Promise<BaseStatic.PdfResponse>}
     * @memberof SalesOrderManagement
     */
    public async showOrderPdf(orderId: number): Promise<BaseStatic.PdfResponse> {
        this.validateScope(Scopes.KB_ORDER_SHOW)

        return this.request<BaseStatic.PdfResponse>('GET', '/kb_order/' + orderId.toString() + '/pdf', {})
    }

    /**
     * list all comments of an estimate
     *
     * @param {number} orderId
     * @param {BaseOptions} options
     * @returns {Promise<Array<SalesOrderManagementStatic.Comment>>}
     * @memberof SalesOrderManagement
     */
    public async listOrderComments(orderId: number, options: BaseOptions): Promise<Array<SalesOrderManagementStatic.Comment>> {
        this.validateScope(Scopes.GENERAL)

        return this.request<Array<SalesOrderManagementStatic.Comment>>('GET', '/kb_order/' + orderId.toString() + '/comment', options)
    }

    /**
     * search all comments
     *
     * @param {number} orderId
     * @param {BaseOptions} options
     * @param {SalesOrderManagementStatic.CommentSearchParameters} searchParams
     * @returns {Promise<Array<SalesOrderManagementStatic.Comment>>}
     * @memberof SalesOrderManagement
     */
    public async searchOrderComments(orderId: number, options: BaseOptions, searchParams: SalesOrderManagementStatic.CommentSearchParameters): Promise<Array<SalesOrderManagementStatic.Comment>> {
        this.validateScope(Scopes.GENERAL)

        let data = []
        for (let i in searchParams) {
            if (searchParams.hasOwnProperty(i)) {
                data.push({
                    'field': i,
                    'value': searchParams[i]
                })
            }
        }

        return this.request<Array<SalesOrderManagementStatic.Comment>>('POST', '/kb_order/' + orderId.toString() + '/comment/search', options, data)
    }

    /**
     * get one specific comment
     *
     * @param {number} orderId
     * @param {number} commentId
     * @returns {Promise<SalesOrderManagementStatic.Comment>}
     * @memberof SalesOrderManagement
     */
    public async showOrderComment(orderId: number, commentId: number): Promise<SalesOrderManagementStatic.Comment> {
        this.validateScope(Scopes.GENERAL)

        return this.request<SalesOrderManagementStatic.Comment>('GET', '/kb_order/' + orderId.toString() + '/comment/' + commentId.toString(), {})
    }

    /**
     * create a new comment
     *
     * @param {number} orderId
     * @param {SalesOrderManagementStatic.Comment} estimate
     * @returns {Promise<SalesOrderManagementStatic.Comment>}
     * @memberof SalesOrderManagement
     */
    public async createOrderComment(orderId: number, comment: SalesOrderManagementStatic.Comment): Promise<SalesOrderManagementStatic.Comment> {
        this.validateScope(Scopes.GENERAL)

        return this.request<SalesOrderManagementStatic.Comment>('POST', '/kb_order/' + orderId.toString() + '/comment/', {}, comment)
    }

    /**
     * create a new reptition
     *
     * @param {number} orderId
     * @param {SalesOrderManagementStatic.Repetition} repetition
     * @returns {Promise<SalesOrderManagementStatic.Repetition>}
     * @memberof SalesOrderManagement
     */
    public async createOrderRepetition(orderId: number, repetition: SalesOrderManagementStatic.Repetition): Promise<SalesOrderManagementStatic.Repetition> {
        this.validateScope(Scopes.KB_ORDER_SHOW)

        return this.request<SalesOrderManagementStatic.Repetition>('POST', '/kb_order/' + orderId.toString() + '/repetition/', {}, repetition)
    }

    /**
     * get one specific repetition
     *
     * @param {number} orderId
     * @param {number} repetitionId
     * @returns {Promise<SalesOrderManagementStatic.Repetition>}
     * @memberof SalesOrderManagement
     */
    public async showOrderRepetition(orderId: number, repetitionId: number): Promise<SalesOrderManagementStatic.Repetition> {
        this.validateScope(Scopes.KB_ORDER_SHOW)

        return this.request<SalesOrderManagementStatic.Repetition>('GET', '/kb_order/' + orderId.toString() + '/repetition/' + repetitionId.toString(), {})
    }

    /**
     * delete a repetition
     *
     * @param {number} orderId
     * @param {number} repetitionId
     * @returns {Promise<boolean>}
     * @memberof SalesOrderManagement
     */
    public async deleteOrderRepetition(orderId: number, repetitionId: number): Promise<boolean> {
        this.validateScope(Scopes.KB_ORDER_SHOW)

        return (await this.request<{ success: boolean }>('DELETE', '/kb_order/' + orderId.toString() + '/repetition/' + repetitionId.toString(), {})).success
    }

    /** 
     * =====================================================
     *                DELIVERY SECTION
     * =====================================================
     */

    /**
    * list all deliveries
    *
    * @param {BaseOptions} options
    * @returns {Promise<Array<SalesOrderManagementStatic.Delivery>>}
    * @memberof SalesOrderManagement
    */
    public async listDeliveries(options: BaseOptions): Promise<Array<SalesOrderManagementStatic.Delivery>> {
        // TODO: Add scope validation (ps.: no scope defined in documentation)
        return this.request<Array<SalesOrderManagementStatic.Order>>('GET', '/kb_delivery', options)
    }

    /**
     * get one specific delivery
     *
     * @param {number} deliveryId
     * @returns {Promise<SalesOrderManagementStatic.Delivery>}
     * @memberof SalesOrderManagement
     */
    public async showDelivery(deliveryId: number): Promise<SalesOrderManagementStatic.Delivery> {
        // TODO: Add scope validation (ps.: no scope defined in documentation)
        return this.request<SalesOrderManagementStatic.Order>('GET', '/kb_delivery/' + deliveryId.toString(), {})
    }

    /**
     * issue a delivery
     *
     * @param {number} deliveryId
     * @returns {Promise<boolean>}
     * @memberof SalesOrderManagement
     */
    public async issueDelivery(deliveryId: number): Promise<boolean> {
        // TODO: Add scope validation (ps.: no scope defined in documentation)
        return (await this.request<{ success: boolean }>('POST', '/kb_delivery/' + deliveryId.toString() + '/issue', {})).success
    }

    /** 
     * =====================================================
     *                INVOICES SECTION
     * =====================================================
     */

    /**
     * list all invoices
     *
     * @param {BaseOptions} options
     * @returns {Promise<Array<SalesOrderManagementStatic.Invoice>>}
     * @memberof SalesOrderManagement
     */
    public async listInvoices(options: BaseOptions): Promise<Array<SalesOrderManagementStatic.Invoice>> {
        this.validateScope(Scopes.KB_INVOICE_SHOW)

        return this.request<Array<SalesOrderManagementStatic.Invoice>>('GET', '/kb_invoice', options)
    }

    /**
     * search all invoices
     *
     * @param {BaseOptions} options
     * @param {SalesOrderManagementStatic.InvoiceSearchParameters} searchParams
     * @returns {Promise<Array<SalesOrderManagementStatic.Invoice>>}
     * @memberof SalesOrderManagement
     */
    public async searchInvoices(options: BaseOptions, searchParams: SalesOrderManagementStatic.InvoiceSearchParameters): Promise<Array<SalesOrderManagementStatic.Invoice>> {
        this.validateScope(Scopes.KB_INVOICE_SHOW)

        let data = []
        for (let i in searchParams) {
            if (searchParams.hasOwnProperty(i)) {
                data.push({
                    'field': i,
                    'value': searchParams[i]
                })
            }
        }

        return this.request<Array<SalesOrderManagementStatic.Invoice>>('POST', '/kb_invoice/search', options)
    }

    /**
     * get one specific invoice
     *
     * @param {number} invoiceId
     * @returns {Promise<SalesOrderManagementStatic.Invoice>}
     * @memberof SalesOrderManagement
     */
    public async showInvoice(invoiceId: number): Promise<SalesOrderManagementStatic.Invoice> {
        this.validateScope(Scopes.KB_INVOICE_SHOW)

        return this.request<SalesOrderManagementStatic.Invoice>('GET', '/kb_invoice/' + invoiceId.toString(), {})
    }

    /**
     * create a new invoice
     *
     * @param {SalesOrderManagementStatic.Invoice} invoice
     * @returns {Promise<SalesOrderManagementStatic.Invoice>}
     * @memberof SalesOrderManagement
     */
    public async createInvoice(invoice: SalesOrderManagementStatic.Invoice): Promise<SalesOrderManagementStatic.Invoice> {
        this.validateScope(Scopes.KB_INVOICE_EDIT)

        return this.request<SalesOrderManagementStatic.Invoice>('POST', '/kb_invoice', {}, invoice)
    }

    /**
     * overwrite a specific invoice
     *
     * @param {number} invoiceId
     * @param {SalesOrderManagementStatic.Invoice} invoice
     * @returns {Promise<SalesOrderManagementStatic.Invoice>}
     * @memberof SalesOrderManagement
     */
    public async overwriteInvoice(invoiceId: number, invoice: SalesOrderManagementStatic.Invoice): Promise<SalesOrderManagementStatic.Invoice> {
        this.validateScope(Scopes.KB_INVOICE_EDIT)

        return this.request<SalesOrderManagementStatic.Invoice>('PUT', '/kb_invoice/' + invoiceId.toString(), {}, invoice)
    }

    /**
     * edit a invoice
     *
     * @param {number} invoiceId
     * @param {SalesOrderManagementStatic.Invoice} invoice
     * @returns {Promise<SalesOrderManagementStatic.Invoice>}
     * @memberof SalesOrderManagement
     */
    public async editInvoice(invoiceId: number, invoice: SalesOrderManagementStatic.Invoice): Promise<SalesOrderManagementStatic.Invoice> {
        this.validateScope(Scopes.KB_INVOICE_EDIT)

        return this.request<SalesOrderManagementStatic.Invoice>('POST', '/kb_invoice/' + invoiceId.toString(), {}, invoice)
    }

    /**
     * delete a invoice
     *
     * @param {number} invoiceId
     * @returns {Promise<boolean>}
     * @memberof SalesOrderManagement
     */
    public async deleteInvoice(invoiceId: number): Promise<boolean> {
        this.validateScope(Scopes.KB_INVOICE_EDIT)

        return (await this.request<{ success: boolean }>('DELETE', '/kb_invoice/' + invoiceId.toString(), {})).success
    }

    /**
     * get one specific invoices pdf
     *
     * @param {number} invoiceId
     * @returns {Promise<BaseStatic.PdfResponse>}
     * @memberof SalesOrderManagement
     */
    public async showInvoicePdf(invoiceId: number): Promise<BaseStatic.PdfResponse> {
        this.validateScope(Scopes.KB_INVOICE_SHOW)

        return this.request<BaseStatic.PdfResponse>('GET', '/kb_invoice/' + invoiceId.toString() + '/pdf', {})
    }

    /**
     * copy a invoice
     *
     * @param {number} invoiceId
     * @param {SalesOrderManagementStatic.InvoiceCopy} copyCommand
     * @returns {Promise<SalesOrderManagementStatic.Invoice>}
     * @memberof SalesOrderManagement
     */
    public async copyInvoice(invoiceId: number, copyCommand: SalesOrderManagementStatic.InvoiceCopy): Promise<SalesOrderManagementStatic.Invoice> {
        this.validateScope(Scopes.KB_INVOICE_SHOW)

        return this.request<SalesOrderManagementStatic.Invoice>('POST', '/kb_invoice/' + invoiceId.toString() + '/copy', {}, copyCommand)
    }

    /**
 * issue a invoice
 *
 * @param {number} invoiceId
 * @returns {Promise<boolean>}
 * @memberof SalesOrderManagement
 */
    public async issueInvoice(invoiceId: number): Promise<boolean> {
        this.validateScope(Scopes.KB_OFFER_SHOW)

        return (await this.request<{ success: boolean }>('POST', '/kb_invoice/' + invoiceId.toString() + '/issue', {})).success
    }

    /**
     * mark as sent a invoice
     *
     * @param {number} invoiceId
     * @returns {Promise<boolean>}
     * @memberof SalesOrderManagement
     */
    public async markAsSentInvoice(invoiceId: number): Promise<boolean> {
        this.validateScope(Scopes.KB_OFFER_SHOW)

        return (await this.request<{ success: boolean }>('POST', '/kb_invoice/' + invoiceId.toString() + '/mark_as_sent', {})).success
    }

    /**
     * send a invoice
     *
     * @param {number} invoiceId
     * @param {SalesOrderManagementStatic.InvoiceSend} message
     * @returns {Promise<boolean>}
     * @memberof SalesOrderManagement
     */
    public async sendInvoice(invoiceId: number, message: SalesOrderManagementStatic.InvoiceSend): Promise<boolean> {
        this.validateScope(Scopes.KB_OFFER_SHOW)

        return (await this.request<{ success: boolean }>('POST', '/kb_invoice/' + invoiceId.toString() + '/send', {}, message)).success
    }

    /**
     * list all comments of an invoice
     *
     * @param {number} invoiceId
     * @param {BaseOptions} options
     * @returns {Promise<Array<SalesOrderManagementStatic.Comment>>}
     * @memberof SalesOrderManagement
     */
    public async listInvoiceComments(invoiceId: number, options: BaseOptions): Promise<Array<SalesOrderManagementStatic.Comment>> {
        this.validateScope(Scopes.GENERAL)

        return this.request<Array<SalesOrderManagementStatic.Comment>>('GET', '/kb_invoice/' + invoiceId.toString() + '/comment', options)
    }

    /**
     * search all comments
     *
     * @param {number} invoiceId
     * @param {BaseOptions} options
     * @param {SalesOrderManagementStatic.CommentSearchParameters} searchParams
     * @returns {Promise<Array<SalesOrderManagementStatic.Comment>>}
     * @memberof SalesOrderManagement
     */
    public async searchInvoiceComments(invoiceId: number, options: BaseOptions, searchParams: SalesOrderManagementStatic.CommentSearchParameters): Promise<Array<SalesOrderManagementStatic.Comment>> {
        this.validateScope(Scopes.GENERAL)

        let data = []
        for (let i in searchParams) {
            if (searchParams.hasOwnProperty(i)) {
                data.push({
                    'field': i,
                    'value': searchParams[i]
                })
            }
        }

        return this.request<Array<SalesOrderManagementStatic.Comment>>('POST', '/kb_invoice/' + invoiceId.toString() + '/comment/search', options, data)
    }

    /**
     * get one specific comment
     *
     * @param {number} invoiceId
     * @param {number} commentId
     * @returns {Promise<SalesOrderManagementStatic.Comment>}
     * @memberof SalesOrderManagement
     */
    public async showInvoiceComment(invoiceId: number, commentId: number): Promise<SalesOrderManagementStatic.Comment> {
        this.validateScope(Scopes.GENERAL)

        return this.request<SalesOrderManagementStatic.Comment>('GET', '/kb_invoice/' + invoiceId.toString() + '/comment/' + commentId.toString(), {})
    }

    /**
     * create a new comment
     *
     * @param {number} invoiceId
     * @param {SalesOrderManagementStatic.Comment} invoice
     * @returns {Promise<SalesOrderManagementStatic.Comment>}
     * @memberof SalesOrderManagement
     */
    public async createInvoiceComment(invoiceId: number, comment: SalesOrderManagementStatic.Comment): Promise<SalesOrderManagementStatic.Comment> {
        this.validateScope(Scopes.GENERAL)

        return this.request<SalesOrderManagementStatic.Comment>('POST', '/kb_invoice/' + invoiceId.toString() + '/comment/', {}, comment)
    }

    /**
     * list all payments
     *
     * @param {number} invoiceId
     * @param {BaseOptions} options
     * @returns {Promise<Array<SalesOrderManagementStatic.Payment>>}
     * @memberof SalesOrderManagement
     */
    public async listInvoicePayments(invoiceId: number, options: BaseOptions): Promise<Array<SalesOrderManagementStatic.Payment>> {
        this.validateScopes([Scopes.KB_INVOICE_SHOW, Scopes.KB_BILL_SHOW, Scopes.KB_CREDIT_VOUCHER_SHOW])

        return this.request<Array<SalesOrderManagementStatic.Payment>>('GET', '/kb_invoice/' + invoiceId.toString() + '/payment', options)
    }
    
    /**
     * create a new payment
     *
     * @param {number} invoiceId
     * @param {SalesOrderManagementStatic.Payment} payment
     * @returns {Promise<SalesOrderManagementStatic.Payment>}
     * @memberof SalesInvoiceManagement
     */
    public async createInvoicePayment(invoiceId: number, payment: SalesOrderManagementStatic.Payment): Promise<SalesOrderManagementStatic.Payment> {
        this.validateScopes([Scopes.KB_INVOICE_SHOW, Scopes.KB_BILL_SHOW, Scopes.KB_CREDIT_VOUCHER_SHOW])

        return this.request<SalesOrderManagementStatic.Payment>('POST', '/kb_invoice/' + invoiceId.toString() + '/payment/', {}, payment)
    }

    /**
     * get one specific payment
     *
     * @param {number} invoiceId
     * @param {number} paymentId
     * @returns {Promise<SalesOrderManagementStatic.Payment>}
     * @memberof SalesInvoiceManagement
     */
    public async showInvoicePayment(invoiceId: number, paymentId: number): Promise<SalesOrderManagementStatic.Payment> {
        this.validateScopes([Scopes.KB_INVOICE_SHOW, Scopes.KB_BILL_SHOW, Scopes.KB_CREDIT_VOUCHER_SHOW])

        return this.request<SalesOrderManagementStatic.Payment>('GET', '/kb_invoice/' + invoiceId.toString() + '/payment/' + paymentId.toString(), {})
    }

    /**
     * delete a payment
     *
     * @param {number} invoiceId
     * @param {number} paymentId
     * @returns {Promise<boolean>}
     * @memberof SalesInvoiceManagement
     */
    public async deleteInvoicePayment(invoiceId: number, paymentId: number): Promise<boolean> {
        this.validateScopes([Scopes.KB_INVOICE_SHOW, Scopes.KB_BILL_SHOW, Scopes.KB_CREDIT_VOUCHER_SHOW])

        return (await this.request<{ success: boolean }>('DELETE', '/kb_invoice/' + invoiceId.toString() + '/payment/' + paymentId.toString(), {})).success
    }
}