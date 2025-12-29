import { OutgoingPaymentsStatic } from "../interfaces/OutgoingPaymentsStatic";
import BaseCrud from "./BaseCrud";

export default class OutgoingPayments extends BaseCrud<
  OutgoingPaymentsStatic.OutgoingPayment,
  OutgoingPaymentsStatic.OutgoingPayment,
  OutgoingPaymentsStatic.OutgoingPayment,
  any,
  OutgoingPaymentsStatic.OutgoingPaymentCreate,
  OutgoingPaymentsStatic.OutgoingPaymentUpdate
> {
  constructor(apiToken: string) {
    super(apiToken, "/4.0/purchase/outgoing-payments");
  }

  /**
   * search for resources - Not implemented for OutgoingPayments V4
   *
   * @memberof OutgoingPayments
   */
  public async search(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  /**
   * overwrite an existing outgoing payment - Not implemented for OutgoingPayments V4
   *
   * @memberof OutgoingPayments
   */
  public async overwrite(id: any, ressource: any): Promise<any> {
    throw new Error("Method not implemented. Use update() instead.");
  }

  /**
   * edit an existing outgoing payment - Not implemented for OutgoingPayments V4
   *
   * @memberof OutgoingPayments
   */
  public async edit(id: any, ressource: any): Promise<any> {
    throw new Error("Method not implemented. Use update() instead.");
  }

  /**
   * delete an existing outgoing payment
   *
   * @param {T} id
   * @returns {Promise<any>}
   * @memberof OutgoingPayments
   */
  public async delete<T = string>(id: T): Promise<boolean> {
    const resp = await this.request<{}>("DELETE", `${this.apiEndpoint}/${id}`);
    if (!resp || resp && Object.keys(resp).length === 0) {
      return true;
    }

    throw new Error(`Failed to delete outgoing payment with id ${id}`);
  }

  /**
   * cancel an existing outgoing payment
   *
   * @param {string} id
   * @returns {Promise<void>}
   * @memberof OutgoingPayments
   */
  public async cancel(id: string): Promise<void> {
    return this.request<void>("POST", `${this.apiEndpoint}/${id}/cancel`);
  }

  /**
   * edit an existing outgoing payment
   *
   * @param {OutgoingPaymentsStatic.OutgoingPaymentUpdate} data
   * @returns {Promise<OutgoingPaymentsStatic.OutgoingPayment>}
   * @memberof OutgoingPayments
   */
  public async update(
    data: OutgoingPaymentsStatic.OutgoingPaymentUpdate
  ): Promise<OutgoingPaymentsStatic.OutgoingPayment> {
    return this.request<OutgoingPaymentsStatic.OutgoingPayment>(
      "PUT",
      this.apiEndpoint,
      undefined,
      data
    );
  }

  /**
   * Lists the outgoing payments
   *
   * @param {OutgoingPaymentsStatic.ListOptions} options
   * @returns {Promise<OutgoingPaymentsStatic.OutgoingPayment[]>}
   * @memberof OutgoingPayments
   */
  public async list(
    options: OutgoingPaymentsStatic.ListOptions
  ): Promise<OutgoingPaymentsStatic.OutgoingPayment[]> {
    const response = await this.request<{
      data: OutgoingPaymentsStatic.OutgoingPayment[];
    }>("GET", this.apiEndpoint, options);
    return response.data;
  }

  /**
   * create a new outgoing payment
   *
   * @param {OutgoingPaymentsStatic.OutgoingPaymentCreate} data
   * @returns {Promise<OutgoingPaymentsStatic.OutgoingPayment>}
   * @memberof OutgoingPayments
   */
  public async create(
    data: OutgoingPaymentsStatic.OutgoingPaymentCreate
  ): Promise<OutgoingPaymentsStatic.OutgoingPayment> {
    return this.request<OutgoingPaymentsStatic.OutgoingPayment>(
      "POST",
      this.apiEndpoint,
      undefined,
      data
    );
  }
}
