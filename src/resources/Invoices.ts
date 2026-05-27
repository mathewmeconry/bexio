import { ContactsStatic } from "./../interfaces/ContactsStatic";
import BaseCrud from "./BaseCrud";
import { BaseStatic } from "../interfaces/BaseStatic";
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

  /**
   * Send an invoice by email.
   *
   * @param {number} id
   * @param {Partial<InvoicesStatic.InvoiceSend>} ressource
   * @returns {Promise<InvoicesStatic.InvoiceSentAnswer>}
   * @memberof Invoices
   */
  public async send(
    id: number,
    ressource: Partial<InvoicesStatic.InvoiceSend>
  ): Promise<InvoicesStatic.InvoiceSentAnswer> {
    return this.request<InvoicesStatic.InvoiceSentAnswer>(
      "POST",
      `${this.apiEndpoint}/${id}/send`,
      undefined,
      ressource
    );
  }

  /**
   * @deprecated Use `send` instead.
   */
  public async sent(
    id: number,
    ressource: Partial<InvoicesStatic.InvoiceSend>
  ): Promise<InvoicesStatic.InvoiceSentAnswer> {
    return this.send(id, ressource);
  }

  public async cancel(id: number): Promise<InvoicesStatic.InvoiceCancelled> {
    return this.request<InvoicesStatic.InvoiceCancelled>(
      "POST",
      `${this.apiEndpoint}/${id}/cancel`,
    );
  }

  /**
   * This action returns a pdf document of the invoice.
   *
   * @param {number} id
   * @param {0 | 1} [logopaper] Whether the PDF should be generated using the letterhead, or not.
   * @returns {Promise<BaseStatic.PdfResponse>}
   * @memberof Invoices
   */
  public async showPdf(
    id: number,
    logopaper?: 0 | 1
  ): Promise<BaseStatic.PdfResponse> {
    return this.request<BaseStatic.PdfResponse>(
      "GET",
      `${this.apiEndpoint}/${id}/pdf`,
      logopaper !== undefined ? { logopaper } : undefined
    );
  }

  /**
   * Issue an invoice. The invoice must be in the draft status.
   *
   * @param {number} id
   * @returns {Promise<InvoicesStatic.InvoiceIssued>}
   * @memberof Invoices
   */
  public async issue(id: number): Promise<InvoicesStatic.InvoiceIssued> {
    return this.request<InvoicesStatic.InvoiceIssued>(
      "POST",
      `${this.apiEndpoint}/${id}/issue`
    );
  }

  /**
   * Mark an invoice as sent.
   *
   * @param {number} id
   * @returns {Promise<InvoicesStatic.InvoiceSentAnswer>}
   * @memberof Invoices
   */
  public async markAsSent(
    id: number
  ): Promise<InvoicesStatic.InvoiceSentAnswer> {
    return this.request<InvoicesStatic.InvoiceSentAnswer>(
      "POST",
      `${this.apiEndpoint}/${id}/mark_as_sent`
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
