import Bexio, { Scopes } from "..";
import { expect } from "chai";
import Orders from "../resources/Orders";
import { OrdersStatic } from "../interfaces/OrdersStatic";
import dotenv from "dotenv";

dotenv.config();

describe("Orders", function() {
  // increasing timeout to 60s
  this.timeout(60000);

  let api: Bexio;
  let moduleToTest: Orders;
  let order: OrdersStatic.OrderFull;
  const {
    BEXIO_CLIENTID,
    BEXIO_CLIENTSECRET,
    HOSTNAME,
    BEXIO_USERNAME,
    BEXIO_PASSWORD
  } = process.env;

  before(async () => {
    if (
      !BEXIO_CLIENTID ||
      !BEXIO_CLIENTSECRET ||
      !HOSTNAME ||
      !BEXIO_USERNAME ||
      !BEXIO_PASSWORD
    )
      throw new Error("not all necessary variables defined");

    api = new Bexio(
      BEXIO_CLIENTID,
      BEXIO_CLIENTSECRET,
      `http://${HOSTNAME}/callback`,
      [Scopes.KB_ORDER_EDIT, Scopes.KB_ORDER_SHOW]
    );
    await api.fakeLogin(BEXIO_USERNAME, BEXIO_PASSWORD);
  });

  it("init Orders object", () => {
    moduleToTest = new Orders(api["bexioAuth"]);
  });

  it("create new order", async () => {
    order = await moduleToTest.create({
      contact_id: 1,
      user_id: 1,
      logopaper_id: 1,
      bank_account_id: 1,
      currency_id: 1,
      is_compact_view: false,
      is_valid_from: Date.now(),
      language_id: 1,
      mwst_type: 2,
      nb_decimals_amount: 99,
      nb_decimals_price: 123,
      payment_type_id: 1,
      show_position_taxes: true,
      positions: [
        {
          amount: "99",
          unit_price: "1",
          is_optional: false,
          tax_id: 16,
          text: "test",
          type: "KbPositionCustom" as "KbPositionCustom"
        }
      ]
    });

    expect(order.contact_id).to.be.eq(1);
  });

  it("list Orders", async () => {
    const list = await moduleToTest.list({});
    expect(list.map(el => el.id)).includes(order.id);
  });

  it("search order", async () => {
    const searchResult = await moduleToTest.search({}, [
      {
        field: OrdersStatic.OrderSearchParameters.id,
        value: order.id,
        criteria: "="
      }
    ]);
    expect(searchResult.length).to.be.eq(1);
    expect(searchResult[0].id).to.be.eq(order.id);
  });

  it("show order", async () => {
    const show = await moduleToTest.show({}, order.id);
    expect(show.id).to.be.eq(order.id);
  });

  it("overwrite order", async () => {
    const overwritten = await moduleToTest.overwrite(order.id, {
      contact_id: 2,
      user_id: 1,
      logopaper_id: 1,
      bank_account_id: 1,
      currency_id: 1,
      is_compact_view: false,
      is_valid_from: Date.now(),
      language_id: 1,
      mwst_type: 2,
      nb_decimals_amount: 99,
      nb_decimals_price: 123,
      payment_type_id: 1,
      show_position_taxes: true,
      positions: [
        {
          amount: "99",
          article_id: 1,
          unit_price: "1",
          is_optional: false,
          tax_id: 16,
          text: "test",
          type: "KbPositionArticle" as "KbPositionArticle"
        }
      ]
    });

    expect(overwritten.contact_id).to.be.eq(2);
  });

  it("edit order", async () => {
    const edited = await moduleToTest.edit(order.id, {
      is_compact_view: true,
      language_id: 2
    });
    expect(edited.language_id).to.be.eq(2);
  });

  it("delete order", async () => {
    const result = await moduleToTest.delete(order.id);
    expect(result).to.be.true;
  });
});
