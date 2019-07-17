import { BillsStatic } from "./../interfaces/BillsStatic";
import BaseCrud from "./BaseCrud";
import OAuth2 from "../libs/OAuth2";
import Scopes from "../constants/Scopes";

export default class Bills extends BaseCrud<
  BillsStatic.Bill,
  BillsStatic.BillFull,
  BillsStatic.Bill,
  BillsStatic.SearchParameters,
  BillsStatic.BillCreate,
  BillsStatic.BillOverwrite
> {
  constructor(bexioAuth: OAuth2) {
    super(bexioAuth, "/kb_bill", Scopes.KB_BILL_SHOW, Scopes.KB_BILL_EDIT);
  }
}
