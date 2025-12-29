import BaseCrud from "../resources/BaseCrud";
import Invoices from "../resources/Invoices";
import Chance from "chance";
import { InvoicesStatic } from "../interfaces/InvoicesStatic";

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("Invoices", () => {
  let requestSpy: jest.SpyInstance;

  beforeEach(() => {
    requestSpy = jest
      .spyOn(BaseCrud.prototype as any, "request")
      .mockResolvedValue({});
  });

  afterEach(() => {
    requestSpy.mockRestore();
  });

  it("Should use init the base correctly", () => {
    const token = chance.string();
    const invoices = new Invoices(token);
    // @ts-ignore
    expect(invoices.apiToken).toBe(token);
    // @ts-ignore
    expect(invoices.apiEndpoint).toBe("/2.0/kb_invoice");
  });

  describe("sent", () => {
    it("Should call request with POST and correct path", async () => {
      const invoices = new Invoices(chance.string());
      const id = chance.integer();
      const sentData: Partial<InvoicesStatic.InvoiceSent> = {
        recipient_email: chance.email(),
        subject: chance.string(),
        message: chance.string(),
        mark_as_open: true,
      };

      await invoices.sent(id, sentData);

      expect(requestSpy).toHaveBeenCalledWith(
        "POST",
        `/2.0/kb_invoice/${id}/send`,
        undefined,
        sentData
      );
    });
  });

  describe("revertIssue", () => {
    it("Should call request with POST and correct path", async () => {
      const invoices = new Invoices(chance.string());
      const id = chance.integer();

      await invoices.revertIssue(id);

      expect(requestSpy).toHaveBeenCalledWith(
        "POST",
        `/2.0/kb_invoice/${id}/revert_issue`
      );
    });
  });

  describe("createPayment", () => {
    it("Should call request with POST and correct path and formatted data", async () => {
      const invoices = new Invoices(chance.string());
      const invoiceId = chance.integer();
      const date = new Date(2023, 11, 15); // December 15, 2023
      const value = "100.50";
      const bankAccountId = chance.integer();
      const paymentServiceId = chance.integer();

      await invoices.createPayment(
        invoiceId,
        date,
        value,
        bankAccountId,
        paymentServiceId
      );

      expect(requestSpy).toHaveBeenCalledWith(
        "POST",
        `/2.0/kb_invoice/${invoiceId}/payment`,
        undefined,
        {
          date: "2023-12-15",
          value: "100.50",
          bank_account_id: bankAccountId,
          payment_service_id: paymentServiceId,
        }
      );
    });

    it("Should call request without optional parameters", async () => {
      const invoices = new Invoices(chance.string());
      const invoiceId = chance.integer();
      const date = new Date(2023, 0, 5); // January 5, 2023
      const value = "50.25";

      await invoices.createPayment(invoiceId, date, value);

      expect(requestSpy).toHaveBeenCalledWith(
        "POST",
        `/2.0/kb_invoice/${invoiceId}/payment`,
        undefined,
        {
          date: "2023-01-05",
          value: "50.25",
          bank_account_id: undefined,
          payment_service_id: undefined,
        }
      );
    });
  });

  describe("getPayment", () => {
    it("Should call request with GET and correct path", async () => {
      const invoices = new Invoices(chance.string());
      const invoiceId = chance.integer();
      const paymentId = chance.integer();

      await invoices.getPayment(invoiceId, paymentId);

      expect(requestSpy).toHaveBeenCalledWith(
        "GET",
        `/2.0/kb_invoice/${invoiceId}/payment/${paymentId}`
      );
    });
  });

  describe("deletePayment", () => {
    it("Should call request with DELETE and correct path", async () => {
      const invoices = new Invoices(chance.string());
      const invoiceId = chance.integer();
      const paymentId = chance.integer();

      await invoices.deletePayment(invoiceId, paymentId);

      expect(requestSpy).toHaveBeenCalledWith(
        "DELETE",
        `/2.0/kb_invoice/${invoiceId}/payment/${paymentId}`
      );
    });
  });
});
