import { ContactsStatic } from "./../interfaces/ContactsStatic";
import BaseCrud from "./BaseCrud";
import { InvoicesStatic } from "../interfaces/InvoicesStatic";

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
}
