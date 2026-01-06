import { ManualEntriesStatic } from "../interfaces/ManualEntriesStatic";
import BaseCrud from "./BaseCrud";
import { BaseStatic } from "../interfaces/BaseStatic";

export default class ManualEntries extends BaseCrud<
  ManualEntriesStatic.ManualEntry,
  ManualEntriesStatic.ManualEntry,
  ManualEntriesStatic.ManualEntry,
  ManualEntriesStatic.SearchParameters,
  ManualEntriesStatic.ManualEntryCreate,
  ManualEntriesStatic.ManualEntryUpdate
> {
  constructor(apiToken: string) {
    super(apiToken, "/3.0/accounting/manual_entries");
  }

  /**
   * Lists the manual entries
   *
   * @param {ManualEntriesStatic.ListOptions} [options]
   * @returns {Promise<Array<ManualEntriesStatic.ManualEntry>>}
   * @memberof ManualEntries
   */
  public async list(
    options?: ManualEntriesStatic.ListOptions
  ): Promise<Array<ManualEntriesStatic.ManualEntry>> {
    return this.request<Array<ManualEntriesStatic.ManualEntry>>(
      "GET",
      this.apiEndpoint,
      options
    );
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {string | number} id
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {Promise<ManualEntriesStatic.ManualEntry>}
   * @memberof ManualEntries
   */
  public async show(
    id: string | number,
    options?: BaseStatic.BaseOptions
  ): Promise<ManualEntriesStatic.ManualEntry> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {Array<BaseStatic.SearchParameter<ManualEntriesStatic.SearchParameters>>} searchOptions
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {Promise<ManualEntriesStatic.ManualEntry[]>}
   * @memberof ManualEntries
   */
  public async search(
    searchOptions: Array<
      BaseStatic.SearchParameter<ManualEntriesStatic.SearchParameters>
    >,
    options?: BaseStatic.BaseOptions
  ): Promise<ManualEntriesStatic.ManualEntry[]> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {Partial<ManualEntriesStatic.ManualEntryUpdate>} ressource
   * @returns {Promise<ManualEntriesStatic.ManualEntry>}
   * @memberof ManualEntries
   */
  public async edit(
    id: number,
    ressource: Partial<ManualEntriesStatic.ManualEntryUpdate>
  ): Promise<ManualEntriesStatic.ManualEntry> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Get the next reference number for a manual entry
   *
   * @returns {Promise<{ next_ref_nr: string }>}
   * @memberof ManualEntries
   */
  public async getNextReferenceNumber(): Promise<{ next_ref_nr: string }> {
    return this.request<{ next_ref_nr: string }>(
      "GET",
      `${this.apiEndpoint}/next_ref_nr`
    );
  }
}
