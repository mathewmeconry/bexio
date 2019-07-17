import { OrdersStatic } from "./../interfaces/OrdersStatic";
import BaseCrud from "./BaseCrud";
import OAuth2 from "../libs/OAuth2";
import Scopes from "../constants/Scopes";

export default class Orders extends BaseCrud<
  OrdersStatic.OrderSmall,
  OrdersStatic.OrderFull,
  OrdersStatic.OrderSmall,
  OrdersStatic.OrderSearchParameters,
  OrdersStatic.OrderCreate,
  OrdersStatic.OrderCreate
> {
  constructor(bexioAuth: OAuth2) {
    super(bexioAuth, "/kb_order", Scopes.KB_ORDER_SHOW, Scopes.KB_ORDER_EDIT);
  }
}
