import BaseCrud from "./BaseCrud";
import { PositionsStatic } from "../interfaces/PositionsStatic";
import { BaseStatic } from "../interfaces/BaseStatic";

export default class CustomPositions extends BaseCrud<
  PositionsStatic.CustomPosition,
  PositionsStatic.CustomPosition,
  {},
  {},
  PositionsStatic.CustomPositionCreate,
  {}
> {
  constructor(
    apiToken: string,
    documentType: PositionsStatic.KbDocumentType,
    documentId: number
  ) {
    super(
      apiToken,
      `/2.0/${documentType}/${documentId}/kb_position_custom`
    );
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {Array<BaseStatic.SearchParameter<{}>>} searchOptions
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {Promise<Array<{}>>}
   * @memberof CustomPositions
   */
  public async search(
    searchOptions: Array<BaseStatic.SearchParameter<{}>>,
    options?: BaseStatic.BaseOptions
  ): Promise<Array<{}>> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<PositionsStatic.CustomPosition>}
   * @memberof CustomPositions
   */
  public async overwrite(
    id: number,
    ressource: {}
  ): Promise<PositionsStatic.CustomPosition> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {Partial<{}>} ressource
   * @returns {Promise<PositionsStatic.CustomPosition>}
   * @memberof CustomPositions
   */
  public async edit(
    id: number,
    ressource: Partial<{}>
  ): Promise<PositionsStatic.CustomPosition> {
    throw new Error("not implemented by Bexio yet");
  }
}
