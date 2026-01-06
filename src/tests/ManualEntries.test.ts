import BaseCrud from "../resources/BaseCrud";
import ManualEntries from "../resources/ManualEntries";
import Chance from "chance";
import { ManualEntriesStatic } from "../interfaces/ManualEntriesStatic";

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("ManualEntries", () => {
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
    const manualEntries = new ManualEntries(token);
    // @ts-ignore
    expect(manualEntries.apiToken).toBe(token);
    // @ts-ignore
    expect(manualEntries.apiEndpoint).toBe("/3.0/accounting/manual_entries");
  });

  describe("list", () => {
    it("Should call request with GET", async () => {
      const manualEntries = new ManualEntries(chance.string());
      requestSpy.mockResolvedValue([]);
      await manualEntries.list();
      expect(requestSpy).toHaveBeenCalledWith(
        "GET",
        "/3.0/accounting/manual_entries",
        undefined
      );
    });

    it("Should pass options to request", async () => {
      const manualEntries = new ManualEntries(chance.string());
      const options: ManualEntriesStatic.ListOptions = { limit: chance.integer() };
      requestSpy.mockResolvedValue([]);
      await manualEntries.list(options);
      expect(requestSpy).toHaveBeenCalledWith(
        "GET",
        "/3.0/accounting/manual_entries",
        options
      );
    });
  });

  describe("create", () => {
    it("Should call request with POST and correct data", async () => {
      const manualEntries = new ManualEntries(chance.string());
      const data: ManualEntriesStatic.ManualEntryCreate = {
        type: "manual_single_entry",
        date: "2023-01-01",
        entries: [],
      };
      await manualEntries.create(data);
      expect(requestSpy).toHaveBeenCalledWith(
        "POST",
        "/3.0/accounting/manual_entries",
        undefined,
        data
      );
    });
  });

  describe("show", () => {
    it("Should throw not implemented error", async () => {
      const manualEntries = new ManualEntries(chance.string());
      const id = chance.integer();
      await expect(manualEntries.show(id)).rejects.toThrow(
        "not implemented by Bexio yet"
      );
    });
  });

  describe("overwrite", () => {
    it("Should call request with PUT and correct path and data", async () => {
      const manualEntries = new ManualEntries(chance.string());
      const id = chance.integer();
      const data: ManualEntriesStatic.ManualEntryUpdate = {
        id,
        type: "manual_single_entry",
        date: "2023-01-01",
        entries: [],
      };
      await manualEntries.overwrite(id, data);
      expect(requestSpy).toHaveBeenCalledWith(
        "PUT",
        `/3.0/accounting/manual_entries/${id}`,
        undefined,
        data
      );
    });
  });

  describe("delete", () => {
    it("Should call request with DELETE and correct path", async () => {
      const manualEntries = new ManualEntries(chance.string());
      const id = chance.integer();
      await manualEntries.delete(id);
      expect(requestSpy).toHaveBeenCalledWith(
        "DELETE",
        `/3.0/accounting/manual_entries/${id}`
      );
    });
  });

  describe("search", () => {
    it("Should throw not implemented error", async () => {
      const manualEntries = new ManualEntries(chance.string());
      await expect(manualEntries.search([])).rejects.toThrow(
        "not implemented by Bexio yet"
      );
    });
  });

  describe("edit", () => {
    it("Should throw not implemented error", async () => {
      const manualEntries = new ManualEntries(chance.string());
      await expect(manualEntries.edit(1, {})).rejects.toThrow(
        "not implemented by Bexio yet"
      );
    });
  });

  describe("getNextReferenceNumber", () => {
    it("Should call request with GET and correct path", async () => {
      const manualEntries = new ManualEntries(chance.string());
      await manualEntries.getNextReferenceNumber();
      expect(requestSpy).toHaveBeenCalledWith(
        "GET",
        "/3.0/accounting/manual_entries/next_ref_nr"
      );
    });
  });
});
