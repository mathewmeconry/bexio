import BaseCrud from "../resources/BaseCrud";
import { mocked } from "ts-jest/utils";
import Bills from "../resources/Bills";
import Chance from "chance";
import Payments from "../resources/Payments";
import { PaymentsStatic } from "../interfaces/PaymentsStatic";

jest.mock("../resources/BaseCrud");
jest.mock("../resources/Payments");
const mockedBase = mocked(BaseCrud, true);
const mockedPayment = mocked(Payments, true);

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("Bills", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Should use init the base correctly", () => {
    const token = chance.string();
    new Bills(token);
    expect(mockedBase).toHaveBeenCalledWith(token, "/kb_bill");
  });

  it("issue request", async () => {
    const id = chance.integer({ min: 0 });
    new Bills(chance.string()).issue(id);
    // @ts-ignore
    expect(mockedBase.prototype.request).toHaveBeenCalledWith(
      "POST",
      `undefined/${id}/issue`
    );
  });

  it("revertIssue request", async () => {
    const id = chance.integer({ min: 0 });
    new Bills(chance.string()).revertIssue(id);
    // @ts-ignore
    expect(mockedBase.prototype.request).toHaveBeenCalledWith(
      "POST",
      `undefined/${id}/revert_issue`
    );
  });

  describe("list", () => {
    it("Should call base list", async () => {
      new Bills(chance.string()).list();
      // @ts-ignore
      expect(mockedBase.prototype.list).toHaveBeenCalledWith();
    });

    it("Should pass options to base list", async () => {
      const options = { limit: chance.integer({ min: 0 }) };
      new Bills(chance.string()).list(options);
      // @ts-ignore
      expect(mockedBase.prototype.list).toHaveBeenCalledWith(options);
    });
  });

  describe("showPayment", () => {
    it("Should create a new Payment object", async () => {
      const paymentId = chance.integer({ min: 0 });
      const billId = chance.integer({ min: 0 });
      new Bills(chance.string()).showPayment(billId, paymentId);

      expect(mockedPayment).toBeCalledWith(undefined, billId);
      expect(mockedPayment.prototype.show).toBeCalledWith(paymentId, undefined);
    });

    it("Should pass the options down", async () => {
      const paymentId = chance.integer({ min: 0 });
      const billId = chance.integer({ min: 0 });
      const options = { limit: chance.integer({ min: 0 }) };
      new Bills(chance.string()).showPayment(billId, paymentId, options);

      expect(mockedPayment.prototype.show).toBeCalledWith(paymentId, options);
    });
  });

  describe("createPayment", () => {
    it("Should create a new Payment object", async () => {
      const billId = chance.integer({ min: 0 });
      const paymentCreationPayload: PaymentsStatic.PaymentCreate = {
        date: "1970-01-01",
        value: chance.integer(),
      };
      new Bills(chance.string()).createPayment(billId, paymentCreationPayload);

      expect(mockedPayment).toBeCalledWith(undefined, billId);
    });

    it("Should call create", async () => {
      const billId = chance.integer({ min: 0 });
      const paymentCreationPayload: PaymentsStatic.PaymentCreate = {
        date: "1970-01-01",
        value: chance.integer(),
      };
      new Bills(chance.string()).createPayment(billId, paymentCreationPayload);

      expect(mockedPayment.prototype.create).toBeCalledWith(
        paymentCreationPayload
      );
    });
  });

  describe("deletePayment", () => {
    it("Should create a new Payment object", async () => {
      const paymentId = chance.integer({ min: 0 });
      const billId = chance.integer({ min: 0 });

      new Bills(chance.string()).deletePayment(billId, paymentId);

      expect(mockedPayment).toBeCalledWith(undefined, billId);
    });

    it("Should call delete", async () => {
      const paymentId = chance.integer({ min: 0 });
      const billId = chance.integer({ min: 0 });

      new Bills(chance.string()).deletePayment(billId, paymentId);

      expect(mockedPayment.prototype.delete).toBeCalledWith(paymentId);
    });
  });
});
