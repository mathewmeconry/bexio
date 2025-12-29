import BaseCrud from "../resources/BaseCrud";
import BillsV4 from "../resources/BillsV4";
import Chance from "chance";
import { BillsV4Static } from "../interfaces/BillsV4Static";
import { BaseStatic } from "../interfaces/BaseStatic";

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("BillsV4", () => {
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
    const billsV4 = new BillsV4(token);
    // @ts-ignore
    expect(billsV4.apiToken).toBe(token);
    // @ts-ignore
    expect(billsV4.apiEndpoint).toBe("/4.0/purchase/bills");
  });

  describe("list", () => {
    it("Should call request with GET", async () => {
      const billsV4 = new BillsV4(chance.string());
      requestSpy.mockResolvedValue({ data: [] });
      await billsV4.list();
      expect(requestSpy).toHaveBeenCalledWith(
        "GET",
        "/4.0/purchase/bills",
        undefined
      );
    });

    it("Should pass options to request", async () => {
      const billsV4 = new BillsV4(chance.string());
      const options: BaseStatic.BaseOptions = { limit: chance.integer() };
      requestSpy.mockResolvedValue({ data: [] });
      await billsV4.list(options);
      expect(requestSpy).toHaveBeenCalledWith(
        "GET",
        "/4.0/purchase/bills",
        options
      );
    });

    it("should list bills with options", async () => {
      const billsV4 = new BillsV4(chance.string());
      const bills = [
        { id: chance.guid(), document_no: "B-1", lastname_company: "Test" },
      ];
      requestSpy.mockResolvedValue({ data: bills });

      const options: BillsV4Static.ListOptions = {
        limit: 10,
        page: 1,
        "fields[]": ["document_no", "title"],
      };
      const result = await billsV4.list(options);

      expect(requestSpy).toHaveBeenCalledWith(
        "GET",
        "/4.0/purchase/bills",
        options
      );
      expect(result).toEqual(bills);
    });
  });

  describe("updateStatus", () => {
    it("Should call request with PUT and correct path", async () => {
      const billsV4 = new BillsV4(chance.string());
      const id = chance.guid();
      const status = BillsV4Static.BillStatusUpdate.BOOKED;
      await billsV4.updateStatus(id, status);
      expect(requestSpy).toHaveBeenCalledWith(
        "PUT",
        `/4.0/purchase/bills/${id}/bookings/${status}`
      );
    });
  });

  describe("executeAction", () => {
    it("Should call request with POST and correct path and data", async () => {
      const billsV4 = new BillsV4(chance.string());
      const id = chance.guid();
      const action = BillsV4Static.BillAction.DUPLICATE;
      await billsV4.executeAction(id, action);
      expect(requestSpy).toHaveBeenCalledWith(
        "POST",
        `/4.0/purchase/bills/${id}/actions`,
        undefined,
        { action }
      );
    });
  });

  describe("validateDocumentNumber", () => {
    it("Should call request with GET and correct path and data", async () => {
      const billsV4 = new BillsV4(chance.string());
      const documentNo = chance.string();
      requestSpy.mockResolvedValue({ valid: true });
      await billsV4.validateDocumentNumber(documentNo);
      expect(requestSpy).toHaveBeenCalledWith(
        "GET",
        "/4.0/purchase/documentnumbers/bills",
        { document_no: documentNo }
      );
    });
  });

  describe("search", () => {
    it("Should throw not implemented error", async () => {
      const billsV4 = new BillsV4(chance.string());
      await expect(billsV4.search([])).rejects.toThrow(
        "not implemented by Bexio yet"
      );
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
        `/4.0/purchase/bills/${id}/bookings/${status}`
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
        `/4.0/purchase/bills/${id}/actions`,
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
