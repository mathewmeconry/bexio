import { AccountsStatic } from "../interfaces/AccountsStatic";
import BaseCrud from "./BaseCrud";
import { BaseStatic } from "../interfaces/BaseStatic";

export default class Accounts extends BaseCrud<
  AccountsStatic.Account,
  AccountsStatic.Account,
  AccountsStatic.Account,
  AccountsStatic.SearchParameters,
  AccountsStatic.Account,
  AccountsStatic.Account
> {
  constructor(apiToken: string) {
    super(apiToken, "/2.0/accounts");
  }

  /**
   * show a specific ressource
   *
   * @param {string | number} id
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {Promise<AccountsStatic.Account>}
   * @memberof Accounts
   */
  public async show(
    id: string | number,
    options?: BaseStatic.BaseOptions
  ): Promise<AccountsStatic.Account> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * create a new ressource
   *
   * @param {AccountsStatic.Account} ressource
   * @returns {Promise<AccountsStatic.Account>}
   * @memberof Accounts
   */
  public async create(
    ressource: AccountsStatic.Account
  ): Promise<AccountsStatic.Account> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * overwrite an existing ressource
   *
   * @param {number} id
   * @param {AccountsStatic.Account} ressource
   * @returns {Promise<AccountsStatic.Account>}
   * @memberof Accounts
   */
  public async overwrite(
    id: number,
    ressource: AccountsStatic.Account
  ): Promise<AccountsStatic.Account> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * edit an existing ressource
   *
   * @param {number} id
   * @param {Partial<AccountsStatic.Account>} ressource
   * @returns {Promise<AccountsStatic.Account>}
   * @memberof Accounts
   */
  public async edit(
    id: number,
    ressource: Partial<AccountsStatic.Account>
  ): Promise<AccountsStatic.Account> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * delete a ressource
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof Accounts
   */
  public async delete(id: number): Promise<boolean> {
    throw new Error("not implemented by Bexio yet");
  }
}
