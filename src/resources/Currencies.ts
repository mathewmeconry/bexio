import BaseCrud from "./BaseCrud";
import { CurrenciesStatic } from "../interfaces/CurrenciesStatic";
import { BaseStatic } from "../interfaces/BaseStatic";

export default class Currencies extends BaseCrud<
  // The list endpoint returns more data than the detail endpoint...
  CurrenciesStatic.CurrencyFull,
  CurrenciesStatic.Currency,
  {},
  {},
  CurrenciesStatic.CurrencyCreate,
  {}
> {
  constructor(apiToken: string) {
    super(apiToken, `/3.0/currencies`);
  }

  /**
   * NOT IMPLEMENTED BY BEXIO YET
   *
   * @param {Array<BaseStatic.SearchParameter<{}>>} searchOptions
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {Promise<Array<{}>>}
   * @memberof Currencies
   */
  public async search(
    searchOptions: Array<BaseStatic.SearchParameter<{}>>,
    options?: BaseStatic.BaseOptions
  ): Promise<Array<{}>> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * NOT IMPLEMENTED BY BEXIO YET
   *
   * @param {number} id
   * @param {Overwrite} ressource
   * @returns {Promise<{}>}
   * @memberof Currencies
   */
  public async overwrite(
    id: number,
    ressource: CurrenciesStatic.Currency
  ): Promise<CurrenciesStatic.Currency> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * NOT IMPLEMENTED BY BEXIO YET
   *
   * @param {number} id
   * @param {Partial<{}>} ressource
   * @returns {Promise<CurrenciesStatic.Currency>}
   * @memberof BaseCrud
   */
  public async edit(
    id: number,
    ressource: Partial<{}>
  ): Promise<CurrenciesStatic.Currency> {
    throw new Error("not implemented by Bexio yet");
  }
}
