import Bexio, { Scopes } from "..";
import { expect } from "chai";
import Bills from "../resources/Bills";
import { BillsStatic } from "../interfaces/BillsStatic";
import dotenv from "dotenv";
import { PaymentsStatic } from "../interfaces/PaymentsStatic";

dotenv.config();

describe("Bills", function() {
  // increasing timeout to 60s
  this.timeout(60000);

  let api: Bexio;
  let moduleToTest: Bills;
  let bill: BillsStatic.BillFull;
  let payment: PaymentsStatic.Payment;
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
      [
        Scopes.KB_BILL_EDIT,
        Scopes.KB_BILL_SHOW,
        Scopes.KB_INVOICE_SHOW,
        Scopes.KB_CREDIT_VOUCHER_SHOW
      ]
    );
    await api.fakeLogin(BEXIO_USERNAME, BEXIO_PASSWORD);
  });

  it("init bill object", () => {
    moduleToTest = new Bills(api["bexioAuth"]);
  });

  it("create new bill", async () => {
    bill = await moduleToTest.create({
      contact_id: 1,
      api_reference: `test-at-${Date.now()}`,
      title: `test-at-${Date.now()}`,
      user_id: 1,
      positions: [
        {
          account_id: 90,
          amount: "999",
          tax_id: 7,
          unit_price: "99.99",
          type: "KbPositionCustom" as "KbPositionCustom"
        },
        {
          account_id: 90,
          amount: "999",
          tax_id: 7,
          unit_price: "99.99",
          article_id: 1,
          type: "KbPositionArticle" as "KbPositionArticle"
        }
      ]
    });
  });

  it("list bills", async () => {
    const list = await moduleToTest.list({});
    expect(list.map(el => el.id)).includes(bill.id);
  });

  it("search bill", async () => {
    const searchResult = await moduleToTest.search({}, [
      { field: BillsStatic.SearchParameters.id, value: bill.id, criteria: "=" }
    ]);
    expect(searchResult.length).to.be.eq(1);
    expect(searchResult[0].id).to.be.eq(bill.id);
  });

  it("show bill", async () => {
    const showedBill = await moduleToTest.show({}, bill.id);
    expect(showedBill.id).to.be.eq(bill.id);
  });

  it("overwrite bill", async () => {
    const overwriteBill = {
      ...bill,
      contact_id: 1,
      api_reference: `overwritten-${Date.now()}`,
      title: `overwritten-${Date.now()}`,
      user_id: 1,
      bank_account_id: 1,
      contact_address: "Address 1",
      nb_decimals_amount: 2,
      nb_decimals_price: 99,
      is_compact_view: false,
      payment_type_id: 1,
      positions: [
        {
          account_id: 90,
          amount: "1",
          tax_id: 7,
          unit_price: "0.99",
          type: "KbPositionCustom" as "KbPositionCustom",
          text: "overwritten-position"
        }
      ]
    };

    // delete unaccepeted fields
    delete overwriteBill.document_nr;
    delete overwriteBill.total_gross;
    delete overwriteBill.total_net;
    delete overwriteBill.total_taxes;
    delete overwriteBill.total_paid_payments;
    delete overwriteBill.total_regards_taxes;
    delete overwriteBill.total_remaining_payments;
    delete overwriteBill.total_rounding_difference;
    delete overwriteBill.total;
    delete overwriteBill.contact_address;
    delete overwriteBill.kb_item_status_id;
    delete overwriteBill.updated_at;
    delete overwriteBill.taxs;

    const overwritten = await moduleToTest.overwrite(bill.id, overwriteBill);
    expect(overwritten.title).to.be.contains(`overwritten-`);
    expect(overwritten.positions.length).to.be.eq(3);
    expect(overwritten.positions[2].amount).to.be.eq("1");
    expect(overwritten.positions[2].unit_price).to.be.eq("0.99");
  });

  it("edit bill", async () => {
    const edited = await moduleToTest.edit(bill.id, {
      title: `edit-${bill.title}`
    });
    expect(edited.title).to.be.eq(`edit-${bill.title}`);
  });

  it("issue bill", async () => {
    const result = await moduleToTest.issue(bill.id);
    expect(result.success).to.be.true;
  });

  it("create payment", async () => {
    payment = await moduleToTest.createPayment(bill.id, {
      date: "01-01-1970",
      value: 1
    });
  });

  it("list payments", async () => {
    const payments = await moduleToTest.listPayments({}, bill.id);
    expect(payments.length).to.be.greaterThan(0);
    expect(payments.map(p => p.id)).includes(payment.id);
  });

  it("show payment", async () => {
    const p = await moduleToTest.showPayment({}, bill.id, payment.id);
    expect(p.id).to.be.eq(payment.id);
  });

  it("delete payment", async () => {
    const result = await moduleToTest.deletePayment(bill.id, payment.id);
    expect(result).to.be.true;
  });

  it("revert issue bill", async () => {
    const result = await moduleToTest.revertIssue(bill.id);
    expect(result.success).to.be.true;
  });

  it("delete bill", async () => {
    const result = await moduleToTest.delete(bill.id);
    expect(result).to.be.true;
  });
});
