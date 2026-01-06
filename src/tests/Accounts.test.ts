import BaseCrud from "../resources/BaseCrud";
import Accounts from "../resources/Accounts";
import Chance from "chance";
import { AccountsStatic } from "../interfaces/AccountsStatic";
import { BaseStatic } from "../interfaces/BaseStatic";

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("Accounts", () => {
  let requestSpy: jest.SpyInstance;

  beforeEach(() => {
    requestSpy = jest
      .spyOn(BaseCrud.prototype as any, "request")
      .mockResolvedValue([]);
  });

  afterEach(() => {
    requestSpy.mockRestore();
  });

  it("Should use init the base correctly", () => {
    const token = chance.string();
    const accounts = new Accounts(token);
    // @ts-ignore
    expect(accounts.apiToken).toBe(token);
    // @ts-ignore
    expect(accounts.apiEndpoint).toBe("/2.0/accounts");
  });

  describe("list", () => {
    it("Should call request with GET", async () => {
      const accounts = new Accounts(chance.string());
      await accounts.list();
      expect(requestSpy).toHaveBeenCalledWith(
        "GET",
        "/2.0/accounts",
        undefined
      );
    });

    it("Should pass options to request", async () => {
      const accounts = new Accounts(chance.string());
      const options: BaseStatic.BaseOptions = { limit: chance.integer() };
      await accounts.list(options);
      expect(requestSpy).toHaveBeenCalledWith(
        "GET",
        "/2.0/accounts",
        options
      );
    });
  });

  describe("search", () => {
    it("Should call request with POST and /search", async () => {
      const accounts = new Accounts(chance.string());
      const searchOptions: Array<BaseStatic.SearchParameter<AccountsStatic.SearchParameters>> = [
        { field: "name", value: "Test", criteria: "=" }
      ];
      await accounts.search(searchOptions);
      expect(requestSpy).toHaveBeenCalledWith(
        "POST",
        "/2.0/accounts/search",
        undefined,
        searchOptions
      );
    });
  });

  describe("unimplemented methods", () => {
    it("should throw for show", async () => {
      const accounts = new Accounts(chance.string());
      await expect(accounts.show(1)).rejects.toThrow("not implemented by Bexio yet");
    });

    it("should throw for create", async () => {
      const accounts = new Accounts(chance.string());
      await expect(accounts.create({} as any)).rejects.toThrow("not implemented by Bexio yet");
    });

    it("should throw for overwrite", async () => {
      const accounts = new Accounts(chance.string());
      await expect(accounts.overwrite(1, {} as any)).rejects.toThrow("not implemented by Bexio yet");
    });

    it("should throw for edit", async () => {
      const accounts = new Accounts(chance.string());
      await expect(accounts.edit(1, {})).rejects.toThrow("not implemented by Bexio yet");
    });

    it("should throw for delete", async () => {
      const accounts = new Accounts(chance.string());
      await expect(accounts.delete(1)).rejects.toThrow("not implemented by Bexio yet");
    });
  });
});
