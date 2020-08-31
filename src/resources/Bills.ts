import { BillsStatic } from "./../interfaces/BillsStatic";
import BaseCrud from "./BaseCrud";
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
  constructor(apiToken: string) {
    super(apiToken, "/kb_bill");
  }

  /**
   * issue a bill
   *
   * @param {number} id
   * @returns {Promise<{ success: boolean }>}
   * @memberof Bills
   */
  public async issue(id: number): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(
      "POST",
      `${this.apiEndpoint}/${id.toString()}/issue`
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
    return this.request<{ success: boolean }>(
      "POST",
      `${this.apiEndpoint}/${id.toString()}/revert_issue`
    );
  }

  /**
   * List all payments for this bill
   *
   * @param {number} billId
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {Promise<PaymentsStatic.Payment[]>}
   * @memberof Bills
   */
  public async listPayments(
    billId: number,
    options?: BaseStatic.BaseOptions
  ): Promise<PaymentsStatic.Payment[]> {
    const paymentCrud = new Payments(this.apiToken, billId);
    return paymentCrud.list(options);
  }

  /**
   * Show a specific payment for this bill
   *
   * @param {number} billId
   * @param {number} paymentId
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {Promise<PaymentsStatic.Payment>}
   * @memberof Bills
   */
  public async showPayment(
    billId: number,
    paymentId: number,
    options?: BaseStatic.BaseOptions,
  ): Promise<PaymentsStatic.Payment> {
    const paymentCrud = new Payments(this.apiToken, billId);
    return paymentCrud.show(paymentId, options);
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
    const paymentCrud = new Payments(this.apiToken, billId);
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
    const paymentCrud = new Payments(this.apiToken, billId);
    return paymentCrud.delete(paymentId);
  }
}
