
import { expect } from "chai";
import dotenv from "dotenv";
import Payments from "../resources/Payments";
import { PaymentsStatic } from "../interfaces/PaymentsStatic";

dotenv.config();

describe("Payments", function() {
  // increasing timeout to 60s
  this.timeout(60000);

  
  let moduleToTest: Payments;
  let payment: PaymentsStatic.Payment;
  const billId = 200;
  const { BEXIO_APITOKEN } = process.env;

  it("init payment object", () => {
    moduleToTest = new Payments(BEXIO_APITOKEN as string, billId);
  });

  it("create new payment", async () => {
    payment = await moduleToTest.create({
      date: "01-01-1970",
      value: 50
    });
  });

  it("list payouts", async () => {
    const list = await moduleToTest.list({});
    expect(list.map(el => el.id)).includes(payment.id);
  });

  it.skip("search payment", async () => {});

  it("should return a not implemented error on search", async () => {
    try {
      const searchResult = await moduleToTest.search({}, []);
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it("show payment", async () => {
    const showedPayment = await moduleToTest.show({}, payment.id);
    expect(showedPayment.id).to.be.eq(payment.id);
  });

  it.skip("overwrite payment", () => {});

  it("should return a not implemented error on overwrite", async () => {
    try {
      const overwritten = await moduleToTest.overwrite(payment.id, {});
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it.skip("edit payment", () => {});

  it("should return a not implemented error on edit", async () => {
    try {
      const overwritten = await moduleToTest.edit(payment.id, {});
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it("delete payment", async () => {
    const result = await moduleToTest.delete(payment.id);
    expect(result).to.be.true;
  });
});
