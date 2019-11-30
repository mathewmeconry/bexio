import BaseCrud from "./BaseCrud";
import { PaymentsStatic } from "../interfaces/PaymentsStatic";
import OAuth2 from "../libs/OAuth2";
import { Scopes } from "..";
import { BaseStatic } from "../interfaces/BaseStatic";

export default class Payments extends BaseCrud<
  PaymentsStatic.Payment,
  PaymentsStatic.Payment,
  {},
  {},
  PaymentsStatic.PaymentCreate,
  {}
> {
  constructor(bexioAuth: OAuth2, billId: number) {
    super(
      bexioAuth,
      `/kb_bill/${billId}/payment`,
      [
        Scopes.KB_INVOICE_SHOW,
        Scopes.KB_BILL_SHOW,
        Scopes.KB_CREDIT_VOUCHER_SHOW
      ],
      [
        Scopes.KB_INVOICE_SHOW,
        Scopes.KB_BILL_SHOW,
        Scopes.KB_CREDIT_VOUCHER_SHOW
      ]
    );
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {BaseStatic.BaseOptions} options
   * @param {Array<BaseStatic.SearchParameter<{}>>} searchOptions
   * @returns {Promise<Array<{}>>}
   * @memberof Payments
   */
  public async search(
    options: BaseStatic.BaseOptions,
    searchOptions: Array<BaseStatic.SearchParameter<{}>>
  ): Promise<Array<{}>> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<PaymentsStatic.Payment>}
   * @memberof Payments
   */
  public async overwrite(
    id: number,
    ressource: {}
  ): Promise<PaymentsStatic.Payment> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {Partial<{}>} ressource
   * @returns {Promise<PaymentsStatic.Payment>}
   * @memberof Payments
   */
  public async edit(
    id: number,
    ressource: Partial<{}>
  ): Promise<PaymentsStatic.Payment> {
    throw new Error("not implemented by Bexio yet");
  }
}
