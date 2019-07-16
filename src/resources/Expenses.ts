import OAuth2 from "../libs/OAuth2";
import BaseCrud from "./BaseCrud";
import Scopes from "../constants/Scopes";
import { ExpensesStatic } from "../interfaces/ExpensesStatic";

export default class Contacts extends BaseCrud<
  ExpensesStatic.Expense,
  ExpensesStatic.Expense,
  ExpensesStatic.Expense,
  ExpensesStatic.SearchParameters,
  ExpensesStatic.ExpenseCreate,
  ExpensesStatic.ExpenseOverwrite
> {
  constructor(bexioAuth: OAuth2) {
    super(
      bexioAuth,
      "/kb_expense",
      Scopes.KB_EXPENSE_SHOW,
      Scopes.KB_EXPENSE_EDIT
    );
  }
}
