import BaseCrud from "./BaseCrud";
import { InvoicesStatic } from "../interfaces/InvoicesStatic";
import Payments from "./Payments";
import { PaymentsStatic } from "../interfaces/PaymentsStatic";
import { BaseStatic } from "../interfaces/BaseStatic";

export default class Invoices extends BaseCrud<
  InvoicesStatic.Invoice,
  InvoicesStatic.Invoice,
  InvoicesStatic.Invoice,
  InvoicesStatic.InvoiceSearchParameters,
  InvoicesStatic.InvoiceCreate,
  InvoicesStatic.InvoiceOverwrite
> {
  constructor(apiToken: string) {
    super(apiToken, "/2.0/kb_invoice");
  }

  public async sent(
    id: number,
    ressource: Partial<InvoicesStatic.InvoiceSent>
  ): Promise<InvoicesStatic.InvoiceSentAnswer> {
    return this.request<InvoicesStatic.InvoiceSentAnswer>(
      "POST",
      `${this.apiEndpoint}/${id}/send`,
      undefined,
      ressource
    );
  }

  /**
   * revert a Invoice issue
   *
   * @param {number} id
   * @returns {Promise<{ success: boolean }>}
   * @memberof Invoices
   */
  public async revertIssue(id: number): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(
      "POST",
      `${this.apiEndpoint}/${id.toString()}/revert_issue`
    );
  }

  /**
   * List all payments for this invoice
   *
   * @param {number} invoiceId
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {Promise<PaymentsStatic.Payment[]>}
   * @memberof Invoices
   */
  public async listPayments(
    invoiceId: number,
    options?: BaseStatic.BaseOptions
  ): Promise<PaymentsStatic.Payment[]> {
    const paymentCrud = new Payments(this.apiToken, invoiceId, 'kb_invoice');
    return paymentCrud.list(options);
  }

  /**
   * Show a specific payment for this invoice
   *
   * @param {number} invoiceId
   * @param {number} paymentId
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {Promise<PaymentsStatic.Payment>}
   * @memberof Invoices
   */
  public async showPayment(
    invoiceId: number,
    paymentId: number,
    options?: BaseStatic.BaseOptions
  ): Promise<PaymentsStatic.Payment> {
    const paymentCrud = new Payments(this.apiToken, invoiceId, 'kb_invoice');
    return paymentCrud.show(paymentId, options);
  }

  /**
   * Create a new payment for this invoice
   *
   * @param {number} invoiceId
   * @param {PaymentsStatic.PaymentCreate} payment
   * @returns {Promise<PaymentsStatic.Payment>}
   * @memberof Invoices
   */
  public async createPayment(
    invoiceId: number,
    payment: PaymentsStatic.PaymentCreate
  ): Promise<PaymentsStatic.Payment> {
    const paymentCrud = new Payments(this.apiToken, invoiceId, 'kb_invoice');
    return paymentCrud.create(payment);
  }

  /**
   * delete a specific payment for this invoice
   *
   * @param {number} invoiceId
   * @param {number} paymentId
   * @returns {Promise<boolean>}
   * @memberof Invoices
   */
  public async deletePayment(
    invoiceId: number,
    paymentId: number
  ): Promise<boolean> {
    const paymentCrud = new Payments(this.apiToken, invoiceId, 'kb_invoice');
    return paymentCrud.delete(paymentId);
  }
}
