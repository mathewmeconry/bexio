import { BillsV4Static } from "../interfaces/BillsV4Static";
import BaseCrud from "./BaseCrud";
import { BaseStatic } from "../interfaces/BaseStatic";

export default class BillsV4 extends BaseCrud<
  BillsV4Static.Bill,
  BillsV4Static.BillFull,
  BillsV4Static.Bill,
  BillsV4Static.SearchParameters,
  BillsV4Static.BillCreate,
  BillsV4Static.BillOverwrite
> {
  constructor(apiToken: string) {
    super(apiToken, "/4.0/purchase/bills");
  }

  /**
   * Lists the bills
   *
   * @param {BillsV4Static.ListOptions} [options]
   * @returns {Promise<BillsV4Static.Bill[]>}
   * @memberof BillsV4
   */
  public async list(
    options?: BillsV4Static.ListOptions
  ): Promise<BillsV4Static.Bill[]> {
    const response = await this.request<{ data: BillsV4Static.Bill[] }>(
      "GET",
      "/4.0/purchase/bills",
      options
    );
    return response.data;
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {Array<BaseStatic.SearchParameter<BillsV4Static.SearchParameters>>} searchOptions
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {Promise<BillsV4Static.Bill[]>}
   * @memberof BillsV4
   */
  public async search(
    searchOptions: Array<
      BaseStatic.SearchParameter<BillsV4Static.SearchParameters>
    >,
    options?: BaseStatic.BaseOptions
  ): Promise<BillsV4Static.Bill[]> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Update bill status
   *
   * @param {string} id
   * @param {BillsV4Static.BillStatusUpdate} status
   * @returns {Promise<BillsV4Static.BillFull>}
   * @memberof BillsV4
   */
  public async updateStatus(
    id: string,
    status: BillsV4Static.BillStatusUpdate
  ): Promise<BillsV4Static.BillFull> {
    return this.request<BillsV4Static.BillFull>(
      "PUT",
      `${this.apiEndpoint}/${id}/bookings/${status}`
    );
  }

  /**
   * Execute bill action
   *
   * @param {string} id
   * @param {BillsV4Static.BillAction} action
   * @returns {Promise<BillsV4Static.BillFull>}
   * @memberof BillsV4
   */
  public async executeAction(
    id: string,
    action: BillsV4Static.BillAction
  ): Promise<BillsV4Static.BillFull> {
    return this.request<BillsV4Static.BillFull>(
      "POST",
      `${this.apiEndpoint}/${id}/actions`,
      undefined,
      { action }
    );
  }

  /**
   * Validate whether document number is available or not
   *
   * @param {string} documentNo
   * @returns {Promise<{ valid: boolean; next_available_no: string }>}
   * @memberof BillsV4
   */
  public async validateDocumentNumber(
    documentNo: string
  ): Promise<{ valid: boolean; next_available_no: string }> {
    return this.request<{ valid: boolean; next_available_no: string }>(
      "GET",
      "/4.0/purchase/documentnumbers/bills",
      { document_no: documentNo }
    );
  }
}