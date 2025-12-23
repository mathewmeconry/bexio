import { OrdersStatic } from "./../interfaces/OrdersStatic";
import BaseCrud from "./BaseCrud";

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
}
