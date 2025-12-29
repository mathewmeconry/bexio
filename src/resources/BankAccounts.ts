import BaseCrud from "./BaseCrud";
import { BankAccountsStatic } from "../interfaces/BankAccountsStatic";
import { BaseStatic } from "../interfaces/BaseStatic";

export default class BankAccounts extends BaseCrud<
  BankAccountsStatic.BankAccount,
  BankAccountsStatic.BankAccountFull,
  BankAccountsStatic.BankAccount,
  {},
  {},
  {}
> {
  constructor(apiToken: string) {
    super(apiToken, "/3.0/banking/accounts");
  }

  /**
   * NOT IMPLEMENTED BY BEXIO YET
   *
   * @param {Array<BaseStatic.SearchParameter<{}>>} searchOptions
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {Promise<Array<{}>>}
   * @memberof BankAccounts
   */
  public async search(
    searchOptions: Array<BaseStatic.SearchParameter<{}>>,
    options?: BaseStatic.BaseOptions
  ): Promise<Array<BankAccountsStatic.BankAccount>> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * NOT IMPLEMENTED BY BEXIO YET
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<BankAccountsStatic.BankAccountFull>}
   * @memberof BankAccounts
   */
  public async overwrite(
    id: number,
    ressource: {}
  ): Promise<BankAccountsStatic.BankAccountFull> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * NOT IMPLEMENTED BY BEXIO YET
   *
   * @param {number} id
   * @param {Partial<{}>} ressource
   * @returns {Promise<BankAccountsStatic.BankAccountFull>}
   * @memberof BankAccounts
   */
  public async edit(
    id: number,
    ressource: Partial<{}>
  ): Promise<BankAccountsStatic.BankAccountFull> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * NOT IMPLEMENTED BY BEXIO YET
   *
   * @param {{}} ressource
   * @returns {Promise<BankAccountsStatic.BankAccountFull>}
   * @memberof BankAccounts
   */
  public async create(
    ressource: {}
  ): Promise<BankAccountsStatic.BankAccountFull> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * NOT IMPLEMENTED BY BEXIO YET
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof BankAccounts
   */
  public async delete(id: number): Promise<boolean> {
    throw new Error("not implemented by Bexio yet");
  }
}
