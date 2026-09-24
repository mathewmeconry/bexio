import BaseCrud from "./BaseCrud";
import { PositionStatic } from "../interfaces/PositionStatic";
import { PositionsStatic } from "../interfaces/PositionsStatic";
import { BaseStatic } from "../interfaces/BaseStatic";

export default class Positions extends BaseCrud<
  PositionStatic.Position,
  PositionStatic.Position,
  {},
  {},
  PositionStatic.PositionCreate,
  PositionStatic.PositionCreate
> {
  private static readonly endpoints: Record<
    PositionsStatic.PositionType,
    string
  > = {
    KbPositionCustom: "kb_position_custom",
    KbPositionArticle: "kb_position_article",
    KbPositionText: "kb_position_text",
    KbPositionSubtotal: "kb_position_subtotal",
    KbPositionPagebreak: "kb_position_pagebreak",
    KbPositionDiscount: "kb_position_discount",
    KbPositionSubposition: "kb_position_subposition",
  };

  constructor(
    apiToken: string,
    documentType: PositionsStatic.KbDocumentType,
    documentId: number,
    positionType: PositionsStatic.PositionType
  ) {
    super(
      apiToken,
      `/2.0/${documentType}/${documentId}/${Positions.endpoint(positionType)}`
    );
  }

  /**
   * Endpoint segment of a position type
   *
   * @private
   * @static
   * @param {PositionsStatic.PositionType} positionType
   * @returns {string}
   * @memberof Positions
   */
  private static endpoint(positionType: PositionsStatic.PositionType): string {
    if (
      !Object.prototype.hasOwnProperty.call(Positions.endpoints, positionType)
    ) {
      throw new Error(`Unknown position type "${positionType}"`);
    }
    return Positions.endpoints[positionType];
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {Array<BaseStatic.SearchParameter<{}>>} searchOptions
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {Promise<Array<{}>>}
   * @memberof Positions
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
   * @returns {Promise<PositionStatic.Position>}
   * @memberof Positions
   */
  public async overwrite(
    id: number,
    ressource: {}
  ): Promise<PositionStatic.Position> {
    throw new Error("not implemented by Bexio yet");
  }
}
