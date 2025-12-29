import BaseCrud from "../resources/BaseCrud";
import BankAccounts from "../resources/BankAccounts";
import Chance from "chance";
import { BaseStatic } from "../interfaces/BaseStatic";

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("BankAccounts", () => {
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
    const bankAccounts = new BankAccounts(token);
    // @ts-ignore
    expect(bankAccounts.apiToken).toBe(token);
    // @ts-ignore
    expect(bankAccounts.apiEndpoint).toBe("/3.0/banking/accounts");
  });

  describe("list", () => {
    it("Should call request with GET", async () => {
      const bankAccounts = new BankAccounts(chance.string());
      requestSpy.mockResolvedValue([]);
      await bankAccounts.list();
      expect(requestSpy).toHaveBeenCalledWith(
        "GET",
        "/3.0/banking/accounts",
        undefined
      );
    });

    it("Should pass options to request", async () => {
      const bankAccounts = new BankAccounts(chance.string());
      const options: BaseStatic.BaseOptions = { limit: chance.integer() };
      requestSpy.mockResolvedValue([]);
      await bankAccounts.list(options);
      expect(requestSpy).toHaveBeenCalledWith(
        "GET",
        "/3.0/banking/accounts",
        options
      );
    });
  });

  describe("show", () => {
    it("Should call request with GET and correct path", async () => {
      const bankAccounts = new BankAccounts(chance.string());
      const id = chance.integer();
      await bankAccounts.show(id);
      expect(requestSpy).toHaveBeenCalledWith(
        "GET",
        `/3.0/banking/accounts/${id}`,
        undefined
      );
    });
  });

  describe("Unsupported methods", () => {
    it("search should throw error", async () => {
      const bankAccounts = new BankAccounts(chance.string());
      await expect(bankAccounts.search([])).rejects.toThrow(
        "not implemented by Bexio yet"
      );
    });

    it("create should throw error", async () => {
      const bankAccounts = new BankAccounts(chance.string());
      await expect(bankAccounts.create({})).rejects.toThrow(
        "not implemented by Bexio yet"
      );
    });

    it("overwrite should throw error", async () => {
      const bankAccounts = new BankAccounts(chance.string());
      await expect(bankAccounts.overwrite(1, {})).rejects.toThrow(
        "not implemented by Bexio yet"
      );
    });

    it("edit should throw error", async () => {
      const bankAccounts = new BankAccounts(chance.string());
      await expect(bankAccounts.edit(1, {})).rejects.toThrow(
        "not implemented by Bexio yet"
      );
    });

    it("delete should throw error", async () => {
      const bankAccounts = new BankAccounts(chance.string());
      await expect(bankAccounts.delete(1)).rejects.toThrow(
        "not implemented by Bexio yet"
      );
    });
  });
});
