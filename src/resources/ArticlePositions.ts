import BaseCrud from "./BaseCrud";
import { PositionsStatic } from "../interfaces/PositionsStatic";
import { BaseStatic } from "../interfaces/BaseStatic";

export default class ArticlePositions extends BaseCrud<
  PositionsStatic.ArticlePosition,
  PositionsStatic.ArticlePosition,
  {},
  {},
  PositionsStatic.ArticlePositionCreate,
  {}
> {
  constructor(
    apiToken: string,
    documentType: PositionsStatic.KbDocumentType,
    documentId: number
  ) {
    super(
      apiToken,
      `/2.0/${documentType}/${documentId}/kb_position_article`
    );
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {Array<BaseStatic.SearchParameter<{}>>} searchOptions
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {Promise<Array<{}>>}
   * @memberof ArticlePositions
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
   * @returns {Promise<PositionsStatic.ArticlePosition>}
   * @memberof ArticlePositions
   */
  public async overwrite(
    id: number,
    ressource: {}
  ): Promise<PositionsStatic.ArticlePosition> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {Partial<{}>} ressource
   * @returns {Promise<PositionsStatic.ArticlePosition>}
   * @memberof ArticlePositions
   */
  public async edit(
    id: number,
    ressource: Partial<{}>
  ): Promise<PositionsStatic.ArticlePosition> {
    throw new Error("not implemented by Bexio yet");
  }
}
