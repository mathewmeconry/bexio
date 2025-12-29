import BaseCrud from "../resources/BaseCrud";
import OutgoingPayments from "../resources/OutgoingPayments";
import Chance from "chance";
import { OutgoingPaymentsStatic } from "../interfaces/OutgoingPaymentsStatic";

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("OutgoingPayments", () => {
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
    const outgoingPayments = new OutgoingPayments(token);
    // @ts-ignore
    expect(outgoingPayments.apiToken).toBe(token);
    // @ts-ignore
    expect(outgoingPayments.apiEndpoint).toBe(
      "/4.0/purchase/outgoing-payments"
    );
  });

  describe("list", () => {
    it("Should call request with GET", async () => {
      const outgoingPayments = new OutgoingPayments(chance.string());
      const options: OutgoingPaymentsStatic.ListOptions = {
        bill_id: chance.guid(),
      };
      requestSpy.mockResolvedValue({ data: [] });
      await outgoingPayments.list(options);
      expect(requestSpy).toHaveBeenCalledWith(
        "GET",
        "/4.0/purchase/outgoing-payments",
        options
      );
    });
  });

  describe("search", () => {
    it("Should throw not implemented error", async () => {
      const outgoingPayments = new OutgoingPayments(chance.string());
      await expect(outgoingPayments.search()).rejects.toThrow(
        "Method not implemented."
      );
    });
  });

  describe("show", () => {
    it("Should call request with GET and correct path", async () => {
      const outgoingPayments = new OutgoingPayments(chance.string());
      const id = chance.guid();
      await outgoingPayments.show(id);
      expect(requestSpy).toHaveBeenCalledWith(
        "GET",
        `/4.0/purchase/outgoing-payments/${id}`
      );
    });
  });

  describe("create", () => {
    it("Should call request with POST and correct data", async () => {
      const outgoingPayments = new OutgoingPayments(chance.string());
      const data: OutgoingPaymentsStatic.OutgoingPaymentCreate = {
        bill_id: chance.guid(),
        payment_type: OutgoingPaymentsStatic.OutgoingPaymentType.IBAN,
        execution_date: "2025-12-29",
        amount: 100,
        currency_code: "CHF",
        exchange_rate: 1,
        is_salary_payment: false,
      };
      await outgoingPayments.create(data);
      expect(requestSpy).toHaveBeenCalledWith(
        "POST",
        "/4.0/purchase/outgoing-payments",
        undefined,
        data
      );
    });
  });

  describe("update", () => {
    it("Should call request with PUT and correct data", async () => {
      const outgoingPayments = new OutgoingPayments(chance.string());
      const data: OutgoingPaymentsStatic.OutgoingPaymentUpdate = {
        payment_id: chance.guid(),
        execution_date: "2025-12-30",
        amount: 150,
        is_salary_payment: false,
      };
      await outgoingPayments.update(data);
      expect(requestSpy).toHaveBeenCalledWith(
        "PUT",
        "/4.0/purchase/outgoing-payments",
        undefined,
        data
      );
    });
  });

  describe("delete", () => {
    it("Should call request with DELETE and correct path", async () => {
      const outgoingPayments = new OutgoingPayments(chance.string());
      const id = chance.guid();
      requestSpy.mockResolvedValue({});
      await outgoingPayments.delete(id);
      expect(requestSpy).toHaveBeenCalledWith(
        "DELETE",
        `/4.0/purchase/outgoing-payments/${id}`
      );
    });
  });

  describe("cancel", () => {
    it("Should call request with POST and correct path", async () => {
      const outgoingPayments = new OutgoingPayments(chance.string());
      const id = chance.guid();
      await outgoingPayments.cancel(id);
      expect(requestSpy).toHaveBeenCalledWith(
        "POST",
        `/4.0/purchase/outgoing-payments/${id}/cancel`
      );
    });
  });

  describe("overwrite", () => {
    it("Should throw not implemented error", async () => {
      const outgoingPayments = new OutgoingPayments(chance.string());
      await expect(outgoingPayments.overwrite("asdf", {})).rejects.toThrow(
        "Method not implemented. Use update() instead."
      );
    });
  });

  describe("edit", () => {
    it("Should throw not implemented error", async () => {
      const outgoingPayments = new OutgoingPayments(chance.string());
      await expect(outgoingPayments.edit("asdf", {})).rejects.toThrow(
        "Method not implemented. Use update() instead."
      );
    });
  });
});
