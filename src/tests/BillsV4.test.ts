import BaseCrud from "../resources/BaseCrud";
import BillsV4 from "../resources/BillsV4";
import Chance from "chance";
import { BillsV4Static } from "../interfaces/BillsV4Static";

jest.mock("../resources/BaseCrud");

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("BillsV4", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Should use init the base correctly", () => {
    const token = chance.string();
    new BillsV4(token);
    expect(BaseCrud).toHaveBeenCalledWith(token, "/4.0/purchase/bills");
  });

  describe("list", () => {
    it("Should call request with GET", async () => {
      const billsV4 = new BillsV4(chance.string());
      // @ts-ignore
      BaseCrud.prototype.request.mockResolvedValue({ data: [] });
      await billsV4.list();
      // @ts-ignore
      expect(BaseCrud.prototype.request).toHaveBeenCalledWith(
        "GET",
        "/4.0/purchase/bills",
        undefined
      );
    });

    it("Should pass options to request", async () => {
      const billsV4 = new BillsV4(chance.string());
      const options: BillsV4Static.ListOptions = { limit: chance.integer({ min: 0 }) };
      // @ts-ignore
      BaseCrud.prototype.request.mockResolvedValue({ data: [] });
      await billsV4.list(options);
      // @ts-ignore
      expect(BaseCrud.prototype.request).toHaveBeenCalledWith(
        "GET",
        "/4.0/purchase/bills",
        options
      );
    });
  });

  describe("search", () => {
    it("Should throw not implemented error", async () => {
      const billsV4 = new BillsV4(chance.string());
      await expect(billsV4.search([])).rejects.toThrow("not implemented by Bexio yet");
    });
  });

  describe("updateStatus", () => {
    it("Should call request with PUT and correct path", async () => {
      const billsV4 = new BillsV4(chance.string());
      const id = chance.guid();
      const status = BillsV4Static.BillStatusUpdate.BOOKED;
      await billsV4.updateStatus(id, status);
      // @ts-ignore
      expect(BaseCrud.prototype.request).toHaveBeenCalledWith(
        "PUT",
        `undefined/${id}/bookings/${status}`
      );
    });
  });

  describe("executeAction", () => {
    it("Should call request with POST and correct path and data", async () => {
      const billsV4 = new BillsV4(chance.string());
      const id = chance.guid();
      const action = BillsV4Static.BillAction.DUPLICATE;
      await billsV4.executeAction(id, action);
      // @ts-ignore
      expect(BaseCrud.prototype.request).toHaveBeenCalledWith(
        "POST",
        `undefined/${id}/actions`,
        undefined,
        { action }
      );
    });
  });

  describe("validateDocumentNumber", () => {
    it("Should call request with GET and correct path and query", async () => {
      const billsV4 = new BillsV4(chance.string());
      const documentNo = chance.string();
      await billsV4.validateDocumentNumber(documentNo);
      // @ts-ignore
      expect(BaseCrud.prototype.request).toHaveBeenCalledWith(
        "GET",
        "/4.0/purchase/documentnumbers/bills",
        { document_no: documentNo }
      );
    });
  });
});
