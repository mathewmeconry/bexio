import BaseCrud from "../resources/BaseCrud";
import Invoices from "../resources/Invoices";
import Chance from "chance";
import Payments from "../resources/Payments";
import { PaymentsStatic } from "../interfaces/PaymentsStatic";

jest.mock("../resources/BaseCrud");
jest.mock("../resources/Payments");

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("Invoices", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Should use init the base correctly", () => {
    const token = chance.string();
    new Invoices(token);
    expect(BaseCrud).toHaveBeenCalledWith(token, "/2.0/kb_invoice");
  });

  describe("showPayment", () => {
    it("Should create a new Payment object", async () => {
      const paymentId = chance.integer({ min: 0 });
      const invoiceId = chance.integer({ min: 0 });
      new Invoices(chance.string()).showPayment(invoiceId, paymentId);

      expect(Payments).toHaveBeenCalledWith(undefined, invoiceId, 'kb_invoice');
      expect(Payments.prototype.show).toHaveBeenCalledWith(paymentId, undefined);
    });

    it("Should pass the options down", async () => {
      const paymentId = chance.integer({ min: 0 });
      const invoiceId = chance.integer({ min: 0 });
      const options = { limit: chance.integer({ min: 0 }) };
      new Invoices(chance.string()).showPayment(invoiceId, paymentId, options);

      expect(Payments.prototype.show).toHaveBeenCalledWith(paymentId, options);
    });
  });

  describe("createPayment", () => {
    it("Should create a new Payment object", async () => {
      const invoiceId = chance.integer({ min: 0 });
      const paymentCreationPayload: PaymentsStatic.PaymentCreate = {
        date: "1970-01-01",
        value: chance.integer(),
      };
      new Invoices(chance.string()).createPayment(invoiceId, paymentCreationPayload);

      expect(Payments).toHaveBeenCalledWith(undefined, invoiceId, 'kb_invoice');
    });

    it("Should call create", async () => {
      const invoiceId = chance.integer({ min: 0 });
      const paymentCreationPayload: PaymentsStatic.PaymentCreate = {
        date: "1970-01-01",
        value: chance.integer(),
      };
      new Invoices(chance.string()).createPayment(invoiceId, paymentCreationPayload);

      expect(Payments.prototype.create).toHaveBeenCalledWith(
        paymentCreationPayload
      );
    });
  });

  describe("deletePayment", () => {
    it("Should create a new Payment object", async () => {
      const paymentId = chance.integer({ min: 0 });
      const invoiceId = chance.integer({ min: 0 });

      new Invoices(chance.string()).deletePayment(invoiceId, paymentId);

      expect(Payments).toHaveBeenCalledWith(undefined, invoiceId, 'kb_invoice');
    });

    it("Should call delete", async () => {
      const paymentId = chance.integer({ min: 0 });
      const invoiceId = chance.integer({ min: 0 });

      new Invoices(chance.string()).deletePayment(invoiceId, paymentId);

      expect(Payments.prototype.delete).toHaveBeenCalledWith(paymentId);
    });
  });
});
