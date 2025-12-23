import BaseCrud from "./BaseCrud";
import { ExpensesStatic } from "../interfaces/ExpensesStatic";

export default class Expenses extends BaseCrud<
  ExpensesStatic.Expense,
  ExpensesStatic.Expense,
  ExpensesStatic.Expense,
  ExpensesStatic.SearchParameters,
  ExpensesStatic.ExpenseCreate,
  ExpensesStatic.ExpenseOverwrite
> {
  constructor(apiToken: string) {
    super(apiToken, "/2.0/kb_expense");
  }
}
