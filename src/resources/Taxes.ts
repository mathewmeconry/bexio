import { TaxesStatic } from '../interfaces/TaxesStatic';
import BaseCrud from './BaseCrud';

export class Taxes extends BaseCrud<
  TaxesStatic.Tax,
  TaxesStatic.Tax,
  TaxesStatic.Tax,
  TaxesStatic.TaxOptions,
  any,
  any
> {
  constructor(accessToken: string) {
    super(accessToken, '/3.0/taxes');
  }

  /**
   * Lists the taxes
   *
   * @param {TaxesStatic.TaxOptions} [options]
   * @returns {Promise<TaxesStatic.Tax[]>}
   * @memberof Taxes
   */
  public override async list(options?: TaxesStatic.TaxOptions): Promise<TaxesStatic.Tax[]> {
    return super.list(options);
  }

  /**
   * Search for taxes is not implemented in the API.
   * Use list() with parameters instead.
   */
  public override async search(): Promise<TaxesStatic.Tax[]> {
    throw new Error('Method not implemented.');
  }

  /**
   * Create a tax is not implemented in the API.
   */
  public override async create(): Promise<TaxesStatic.Tax> {
    throw new Error('Method not implemented.');
  }

  /**
   * Overwrite a tax is not implemented in the API.
   */
  public override async overwrite(): Promise<TaxesStatic.Tax> {
    throw new Error('Method not implemented.');
  }

  /**
   * Edit a tax is not implemented in the API.
   */
  public override async edit(): Promise<TaxesStatic.Tax> {
    throw new Error('Method not implemented.');
  }
}
