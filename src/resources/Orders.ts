import { OrdersStatic } from "./../interfaces/OrdersStatic";
import BaseCrud from "./BaseCrud";
import { PositionsStatic } from "../interfaces/PositionsStatic";
import CustomPositions from "./CustomPositions";
import ArticlePositions from "./ArticlePositions";
import TextPositions from "./TextPositions";

export default class Orders extends BaseCrud<
  OrdersStatic.OrderSmall,
  OrdersStatic.OrderFull,
  OrdersStatic.OrderSmall,
  OrdersStatic.OrderSearchParameters,
  OrdersStatic.OrderCreate,
  OrdersStatic.OrderCreate
> {
  constructor(apiToken: string) {
    super(apiToken, "/2.0/kb_order");
  }

  /**
   * Create a custom position for an order
   *
   * @param {number} orderId
   * @param {PositionsStatic.CustomPositionCreate} position
   * @returns {Promise<PositionsStatic.CustomPosition>}
   * @memberof Orders
   */
  public async createCustomPosition(
    orderId: number,
    position: PositionsStatic.CustomPositionCreate
  ): Promise<PositionsStatic.CustomPosition> {
    return new CustomPositions(this.apiToken, "kb_order", orderId).create(
      position
    );
  }

  /**
   * Create an article position for an order
   *
   * @param {number} orderId
   * @param {PositionsStatic.ArticlePositionCreate} position
   * @returns {Promise<PositionsStatic.ArticlePosition>}
   * @memberof Orders
   */
  public async createArticlePosition(
    orderId: number,
    position: PositionsStatic.ArticlePositionCreate
  ): Promise<PositionsStatic.ArticlePosition> {
    return new ArticlePositions(this.apiToken, "kb_order", orderId).create(
      position
    );
  }

  /**
   * Create a text position for an order
   *
   * @param {number} orderId
   * @param {PositionsStatic.TextPositionCreate} position
   * @returns {Promise<PositionsStatic.TextPosition>}
   * @memberof Orders
   */
  public async createTextPosition(
    orderId: number,
    position: PositionsStatic.TextPositionCreate
  ): Promise<PositionsStatic.TextPosition> {
    return new TextPositions(this.apiToken, "kb_order", orderId).create(
      position
    );
  }
}
