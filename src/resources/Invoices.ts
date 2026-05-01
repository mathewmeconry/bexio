import { ContactsStatic } from "./../interfaces/ContactsStatic";
import BaseCrud from "./BaseCrud";
import { InvoicesStatic } from "../interfaces/InvoicesStatic";
import { PositionsStatic } from "../interfaces/PositionsStatic";
import DefaultPositions from "./DefaultPositions";
import ItemPositions from "./ItemPositions";
import TextPositions from "./TextPositions";

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

  public async cancel(id: number): Promise<InvoicesStatic.InvoiceCancelled> {
    return this.request<InvoicesStatic.InvoiceCancelled>(
      "POST",
      `${this.apiEndpoint}/${id}/cancel`,
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
   * Create a payment for an invoice
   *
   * @param {number} invoiceId
   * @param {Date} date
   * @param {string} value
   * @param {number} [bank_account_id]
   * @param {number} [payment_service_id]
   * @return {*}  {Promise<InvoicesStatic.Payment>}
   * @memberof Invoices
   */
  public async createPayment(
    invoiceId: number,
    date: Date,
    value: string,
    bank_account_id?: number,
    payment_service_id?: number
  ): Promise<InvoicesStatic.Payment> {
    return this.request<InvoicesStatic.Payment>(
      "POST",
      `${this.apiEndpoint}/${invoiceId.toString()}/payment`,
      undefined,
      {
        date: `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
        value,
        bank_account_id,
        payment_service_id,
      }
    );
  }

  /**
   * Get a payment for an invoice
   *
   * @param {number} invoiceId
   * @param {number} paymentId
   * @return {*}  {Promise<InvoicesStatic.Payment>}
   * @memberof Invoices
   */
  public async getPayment(
    invoiceId: number,
    paymentId: number
  ): Promise<InvoicesStatic.Payment> {
    return this.request<InvoicesStatic.Payment>(
      "GET",
      `${
        this.apiEndpoint
      }/${invoiceId.toString()}/payment/${paymentId.toString()}`
    );
  }

  /**
   * Delete a payment for an invoice
   *
   * @param {number} invoiceId
   * @param {number} paymentId
   * @return {*}  {Promise<void>}
   * @memberof Invoices
   */
  public async deletePayment(
    invoiceId: number,
    paymentId: number
  ): Promise<void> {
    return this.request<void>(
      "DELETE",
      `${
        this.apiEndpoint
      }/${invoiceId.toString()}/payment/${paymentId.toString()}`
    );
  }

  /**
   * Create a default position for an invoice
   *
   * @param {number} invoiceId
   * @param {PositionsStatic.DefaultPositionCreate} position
   * @returns {Promise<PositionsStatic.DefaultPosition>}
   * @memberof Invoices
   */
  public async createDefaultPosition(
    invoiceId: number,
    position: PositionsStatic.DefaultPositionCreate
  ): Promise<PositionsStatic.DefaultPosition> {
    return new DefaultPositions(this.apiToken, "kb_invoice", invoiceId).create(
      position
    );
  }

  /**
   * Create an item position for an invoice
   *
   * @param {number} invoiceId
   * @param {PositionsStatic.ItemPositionCreate} position
   * @returns {Promise<PositionsStatic.ItemPosition>}
   * @memberof Invoices
   */
  public async createItemPosition(
    invoiceId: number,
    position: PositionsStatic.ItemPositionCreate
  ): Promise<PositionsStatic.ItemPosition> {
    return new ItemPositions(this.apiToken, "kb_invoice", invoiceId).create(
      position
    );
  }

  /**
   * Create a text position for an invoice
   *
   * @param {number} invoiceId
   * @param {PositionsStatic.TextPositionCreate} position
   * @returns {Promise<PositionsStatic.TextPosition>}
   * @memberof Invoices
   */
  public async createTextPosition(
    invoiceId: number,
    position: PositionsStatic.TextPositionCreate
  ): Promise<PositionsStatic.TextPosition> {
    return new TextPositions(this.apiToken, "kb_invoice", invoiceId).create(
      position
    );
  }
}
