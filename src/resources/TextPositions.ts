import BaseCrud from "./BaseCrud";
import { PositionsStatic } from "../interfaces/PositionsStatic";
import { BaseStatic } from "../interfaces/BaseStatic";

export default class TextPositions extends BaseCrud<
  PositionsStatic.TextPosition,
  PositionsStatic.TextPosition,
  {},
  {},
  PositionsStatic.TextPositionCreate,
  {}
> {
  constructor(
    apiToken: string,
    documentType: PositionsStatic.KbDocumentType,
    documentId: number
  ) {
    super(
      apiToken,
      `/2.0/${documentType}/${documentId}/kb_position_text`
    );
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {Array<BaseStatic.SearchParameter<{}>>} searchOptions
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {Promise<Array<{}>>}
   * @memberof TextPositions
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
   * @returns {Promise<PositionsStatic.TextPosition>}
   * @memberof TextPositions
   */
  public async overwrite(
    id: number,
    ressource: {}
  ): Promise<PositionsStatic.TextPosition> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {Partial<{}>} ressource
   * @returns {Promise<PositionsStatic.TextPosition>}
   * @memberof TextPositions
   */
  public async edit(
    id: number,
    ressource: Partial<{}>
  ): Promise<PositionsStatic.TextPosition> {
    throw new Error("not implemented by Bexio yet");
  }
}
