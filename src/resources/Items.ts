import { ItemsStatic } from "../interfaces/ItemsStatic";
import BaseCrud from "./BaseCrud";

export default class Items extends BaseCrud<
  ItemsStatic.Item,
  ItemsStatic.Item,
  ItemsStatic.Item,
  ItemsStatic.ItemSearchParameters,
  ItemsStatic.ItemCreate,
  ItemsStatic.ItemOverwrite
> {
  constructor(apiToken: string) {
    super(apiToken, "/2.0/article");
  }
}
