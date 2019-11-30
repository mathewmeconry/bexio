import { BillsStatic } from "./../interfaces/BillsStatic";
import BaseCrud from "./BaseCrud";
import OAuth2 from "../libs/OAuth2";
import Scopes from "../constants/Scopes";
import Payments from "./Payments";
import { PaymentsStatic } from "../interfaces/PaymentsStatic";
import { BaseStatic } from "../interfaces/BaseStatic";

export default class Bills extends BaseCrud<
  BillsStatic.Bill,
  BillsStatic.BillFull,
  BillsStatic.Bill,
  BillsStatic.SearchParameters,
  BillsStatic.BillCreate,
  BillsStatic.BillOverwrite
> {
  constructor(bexioAuth: OAuth2) {
    super(bexioAuth, "/kb_bill", Scopes.KB_BILL_SHOW, Scopes.KB_BILL_EDIT);
  }

  /**
   * issue a bill
   *
   * @param {number} id
   * @returns {Promise<{ success: boolean }>}
   * @memberof Bills
   */
  public async issue(id: number): Promise<{ success: boolean }> {
    this.checkScopes(this.showScopes);
    return this.request<{ success: boolean }>(
      "POST",
      `${this.apiEndpoint}/${id.toString()}/issue`,
      {}
    );
  }

  /**
   * revert a bill issue
   *
   * @param {number} id
   * @returns {Promise<{ success: boolean }>}
   * @memberof Bills
   */
  public async revertIssue(id: number): Promise<{ success: boolean }> {
    this.checkScopes(this.showScopes);
    return this.request<{ success: boolean }>(
      "POST",
      `${this.apiEndpoint}/${id.toString()}/revert_issue`,
      {}
    );
  }

  /**
   * List all payments for this bill
   *
   * @param {BaseStatic.BaseOptions} options
   * @param {number} billId
   * @returns {Promise<PaymentsStatic.Payment[]>}
   * @memberof Bills
   */
  public async listPayments(
    options: BaseStatic.BaseOptions,
    billId: number
  ): Promise<PaymentsStatic.Payment[]> {
    const paymentCrud = new Payments(this.bexioAuth, billId);
    return paymentCrud.list({});
  }

  /**
   * Show a specific payment for this bill
   *
   * @param {BaseStatic.BaseOptions} options
   * @param {number} billId
   * @param {number} paymentId
   * @returns {Promise<PaymentsStatic.Payment>}
   * @memberof Bills
   */
  public async showPayment(
    options: BaseStatic.BaseOptions,
    billId: number,
    paymentId: number
  ): Promise<PaymentsStatic.Payment> {
    const paymentCrud = new Payments(this.bexioAuth, billId);
    return paymentCrud.show({}, paymentId);
  }

  /**
   * Create a new payment for this bill
   *
   * @param {number} billId
   * @param {PaymentsStatic.PaymentCreate} payment
   * @returns {Promise<PaymentsStatic.Payment>}
   * @memberof Bills
   */
  public async createPayment(
    billId: number,
    payment: PaymentsStatic.PaymentCreate
  ): Promise<PaymentsStatic.Payment> {
    const paymentCrud = new Payments(this.bexioAuth, billId);
    return paymentCrud.create(payment);
  }

  /**
   * delete a specific payment for this bill
   *
   * @param {number} billId
   * @param {number} paymentId
   * @returns {Promise<boolean>}
   * @memberof Bills
   */
  public async deletePayment(
    billId: number,
    paymentId: number
  ): Promise<boolean> {
    const paymentCrud = new Payments(this.bexioAuth, billId);
    return paymentCrud.delete(paymentId);
  }
}
