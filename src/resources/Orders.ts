import { OrdersStatic } from "./../interfaces/OrdersStatic";
import BaseCrud from "./BaseCrud";
import { PositionsStatic } from "../interfaces/PositionsStatic";
import DefaultPositions from "./DefaultPositions";
import ItemPositions from "./ItemPositions";
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
   * Create a default position for an order
   *
   * @param {number} orderId
   * @param {PositionsStatic.DefaultPositionCreate} position
   * @returns {Promise<PositionsStatic.DefaultPosition>}
   * @memberof Orders
   */
  public async createDefaultPosition(
    orderId: number,
    position: PositionsStatic.DefaultPositionCreate
  ): Promise<PositionsStatic.DefaultPosition> {
    return new DefaultPositions(this.apiToken, "kb_order", orderId).create(
      position
    );
  }

  /**
   * Create an item position for an order
   *
   * @param {number} orderId
   * @param {PositionsStatic.ItemPositionCreate} position
   * @returns {Promise<PositionsStatic.ItemPosition>}
   * @memberof Orders
   */
  public async createItemPosition(
    orderId: number,
    position: PositionsStatic.ItemPositionCreate
  ): Promise<PositionsStatic.ItemPosition> {
    return new ItemPositions(this.apiToken, "kb_order", orderId).create(
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
