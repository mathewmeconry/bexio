
import { expect } from "chai";
import Expenses from "../resources/Expenses";
import { ExpensesStatic } from "../interfaces/ExpensesStatic";
import dotenv from "dotenv";

dotenv.config();

describe("Expenses", function() {
  // increasing timeout to 60s
  this.timeout(60000);

  
  let moduleToTest: Expenses;
  let expense: ExpensesStatic.Expense;
  const { BEXIO_APITOKEN } = process.env;

  it("init Expenses object", () => {
    moduleToTest = new Expenses(BEXIO_APITOKEN as string);
  });

  it("create new expense", async () => {
    expense = await moduleToTest.create({
      account_id: 90,
      amount: "99",
      contact_id: 1,
      tax_id: 7,
      user_id: 1,
      mwst_type: 2
    });
  });

  it("list expenses", async () => {
    const list = await moduleToTest.list({});
    expect(list.map(el => el.id)).includes(expense.id);
  });

  it("search expense", async () => {
    const searchResult = await moduleToTest.search({}, [
      {
        field: ExpensesStatic.SearchParameters.id,
        value: expense.id,
        criteria: "="
      }
    ]);
    expect(searchResult.length).to.be.eq(1);
    expect(searchResult[0].id).to.be.eq(expense.id);
  });

  it("show expense", async () => {
    const show = await moduleToTest.show({}, expense.id);
    expect(show.id).to.be.eq(expense.id);
  });

  it("overwrite expense", async () => {
    const overwritten = await moduleToTest.overwrite(expense.id, {
      account_id: 99,
      amount: "99",
      contact_id: 1,
      tax_id: 7,
      user_id: 1,
      mwst_type: 2,
      bank_account_id: 1,
      currency_id: 1,
      is_compact_view: false,
      is_valid_from: Date.now(),
      language_id: 1,
      logopaper_id: 1,
      nb_decimals_amount: 99,
      nb_decimals_price: 2,
      payment_type_id: 1,
      show_position_taxes: true
    });
    expect(overwritten.account_id).to.be.eq(99);
  });

  it("edit expense", async () => {
    const edited = await moduleToTest.edit(expense.id, { amount: "88" });
    expect(edited.amount).to.be.eq("88");
  });

  it("delete expense", async () => {
    const result = await moduleToTest.delete(expense.id);
    expect(result).to.be.true;
  });
});
