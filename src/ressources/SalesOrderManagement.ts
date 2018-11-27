import { Invoice } from "./../interfaces/SalesOrderManagementStatic";
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
     * @returns {Promise<SalesOrderManagementStatic.Estimate>}
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
     * @returns {Promise<SalesOrderManagementStatic.Estimate>}
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
}