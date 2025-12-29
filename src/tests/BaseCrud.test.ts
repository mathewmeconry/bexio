import axios, { AxiosRequestConfig } from "axios";
import Chance from "chance";
import { BaseStatic } from "../interfaces/BaseStatic";
import BaseCrud from "../resources/BaseCrud";

const requestSpy = jest.spyOn(axios, "request");
const seedgenerator = new Chance();
const seed = seedgenerator.hash();

console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

requestSpy.mockResolvedValue({});

describe("BaseCrud", () => {
  afterEach(() => {
    requestSpy.mockClear();
  });

  describe("list", () => {
    const endpoint = chance.string();
    const apiToken = chance.string();
    const baseCrud = new BaseCrud(apiToken, `/${endpoint}`);

    it("Should be a GET request", async () => {
      await baseCrud.list();
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.method).toBe("GET");
    });

    it("Should use the given endpoint", async () => {
      await baseCrud.list();
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.url).toBe(`https://api.bexio.com/${endpoint}`);
    });

    it("Should pass the options to request", async () => {
      const limit = chance.integer({ min: 0 });
      await baseCrud.list({ limit });
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.url).toBe(
        `https://api.bexio.com/${endpoint}?limit=${limit}`
      );
    });

    it("Should handle array options correctly", async () => {
      const endpoint = chance.string();
      const apiToken = chance.string();
      const baseCrud = new BaseCrud(apiToken, `/${endpoint}`);
      const fields = ["a", "b"];
      await baseCrud.list({ "fields[]": fields });
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.url).toBe(
        `https://api.bexio.com/${endpoint}?fields%5B%5D=a&fields%5B%5D=b`
      );
    });
  });

  describe("search", () => {
    const endpoint = chance.string();
    const apiToken = chance.string();
    const searchRequest: BaseStatic.SearchParameter<any> = {
      field: chance.string(),
      value: chance.string(),
      criteria: "!=",
    };
    const baseCrud = new BaseCrud(apiToken, `/${endpoint}`);

    it("Should be a POST request", async () => {
      await baseCrud.search([searchRequest]);
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.method).toBe("POST");
    });

    it("Should use the given endpoint", async () => {
      await baseCrud.search([searchRequest]);
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.url).toBe(
        `https://api.bexio.com/${endpoint}/search`
      );
    });

    it("Should contain the request body", async () => {
      await baseCrud.search([searchRequest]);
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.data).toHaveLength(1);
      expect(axiosParams.data[0]).toBe(searchRequest);
    });

    it("Should pass the options to request", async () => {
      const limit = chance.integer({ min: 0 });
      await baseCrud.search([searchRequest], { limit });
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.url).toBe(
        `https://api.bexio.com/${endpoint}/search?limit=${limit}`
      );
    });
  });

  describe("show", () => {
    const endpoint = chance.string();
    const apiToken = chance.string();
    const baseCrud = new BaseCrud(apiToken, `/${endpoint}`);

    it("Should be a GET request", async () => {
      await baseCrud.show(chance.integer({ min: 0 }));
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.method).toBe("GET");
    });

    it("Should use the given endpoint", async () => {
      const id = chance.integer({ min: 0 });
      await baseCrud.show(id);
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.url).toBe(
        `https://api.bexio.com/${endpoint}/${id}`
      );
    });

    it("Should pass the options to request", async () => {
      const id = chance.integer({ min: 0 });
      const limit = chance.integer({ min: 0 });
      await baseCrud.show(id, { limit });
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.url).toBe(
        `https://api.bexio.com/${endpoint}/${id}?limit=${limit}`
      );
    });
  });

  describe("create", () => {
    const endpoint = chance.string();
    const apiToken = chance.string();
    const createRequest = {
      firstname: chance.name(),
    };
    const baseCrud = new BaseCrud(apiToken, `/${endpoint}`);

    it("Should be a POST request", async () => {
      await baseCrud.create(createRequest);
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.method).toBe("POST");
    });

    it("Should use the given endpoint", async () => {
      await baseCrud.create(createRequest);
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.url).toBe(`https://api.bexio.com/${endpoint}`);
    });

    it("Should contain the request body", async () => {
      await baseCrud.create(createRequest);
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.data).toBe(createRequest);
    });
  });

  describe("overwrite", () => {
    const endpoint = chance.string();
    const apiToken = chance.string();
    const overwriteRequest = {
      firstname: chance.name(),
    };
    const baseCrud = new BaseCrud(apiToken, `/${endpoint}`);

    it("Should be a PUT request", async () => {
      await baseCrud.overwrite(chance.integer(), overwriteRequest);
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.method).toBe("PUT");
    });

    it("Should use the given endpoint", async () => {
      const id = chance.integer();
      await baseCrud.overwrite(id, overwriteRequest);
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.url).toBe(
        `https://api.bexio.com/${endpoint}/${id}`
      );
    });

    it("Should contain the request body", async () => {
      await baseCrud.overwrite(chance.integer(), overwriteRequest);
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.data).toBe(overwriteRequest);
    });
  });

  describe("edit", () => {
    const endpoint = chance.string();
    const apiToken = chance.string();
    const editRequest = {
      firstname: chance.name(),
    };
    const baseCrud = new BaseCrud(apiToken, `/${endpoint}`);

    it("Should be a POST request", async () => {
      await baseCrud.edit(chance.integer(), editRequest);
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.method).toBe("POST");
    });

    it("Should use the given endpoint", async () => {
      const id = chance.integer();
      await baseCrud.edit(id, editRequest);
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.url).toBe(
        `https://api.bexio.com/${endpoint}/${id}`
      );
    });

    it("Should contain the request body", async () => {
      await baseCrud.edit(chance.integer(), editRequest);
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.data).toBe(editRequest);
    });
  });

  describe("delete", () => {
    const endpoint = chance.string();
    const apiToken = chance.string();
    const baseCrud = new BaseCrud(apiToken, `/${endpoint}`);

    it("Should be a DELETE request", async () => {
      requestSpy.mockResolvedValueOnce({ data: { success: true } });
      await baseCrud.delete(chance.integer());
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.method).toBe("DELETE");
    });

    it("Should use the given endpoint", async () => {
      requestSpy.mockResolvedValueOnce({ data: { success: true } });
      const id = chance.integer();
      await baseCrud.delete(id);
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.url).toBe(
        `https://api.bexio.com/${endpoint}/${id}`
      );
    });

    it("Should return the success value", async () => {
      const success = chance.bool();
      requestSpy.mockResolvedValueOnce({ data: { success } });
      const resp = await baseCrud.delete(chance.integer());
      expect(resp).toBe(success);
    });
  });

  describe("request", () => {
    const endpoint = chance.string();
    const apiToken = chance.string();
    const baseCrud = new BaseCrud(apiToken, `/${endpoint}`);
    it("Should create the request options", async () => {
      const method = chance.pickone([
        "DELETE",
        "get",
        "GET",
        "delete",
        "head",
        "HEAD",
        "options",
        "OPTIONS",
        "post",
        "POST",
        "put",
        "PUT",
        "patch",
        "PATCH",
        "purge",
        "PURGE",
        "link",
        "LINK",
        "unlink",
        "UNLINK",
      ]);
      const path = chance.string();

      // @ts-ignore
      await baseCrud.request(method, `/${path}`);
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      if (!axiosParams.headers) {
        throw new Error("Failed to get headers");
      }
      expect(axiosParams.method).toBe(method);
      expect(axiosParams.url).toBe(`https://api.bexio.com/${path}`);
      expect(axiosParams.headers.Authorization).toBe(`Bearer ${apiToken}`);
      expect(axiosParams.headers["Content-Type"]).toBe("application/json");
      expect(axiosParams.headers.Accept).toBe("application/json");
    });

    it("Should add a data param if present", async () => {
      const body = { test: chance.string() };
      // @ts-ignore
      await baseCrud.request(chance.string(), chance.string(), undefined, body);
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.data).toBe(body);
    });

    it("Should add options as GET params", async () => {
      const limit = chance.integer({ min: 0 });
      const path = chance.string();
      // @ts-ignore
      await baseCrud.request(chance.string(), `/${path}`, { limit });
      const axiosParams = requestSpy.mock.calls[0][0] as AxiosRequestConfig;
      expect(axiosParams.url).toBe(
        `https://api.bexio.com/${path}?limit=${limit}`
      );
    });

    it("Should normalize an error", async () => {
      const responseCode = chance.integer({ min: 100 });
      const responseMessage = chance.string();
      requestSpy
        .mockRejectedValueOnce({
          response: { status: responseCode, data: responseMessage },
        })
        .mockRejectedValueOnce({
          response: { status: responseCode, data: responseMessage },
        });

      // @ts-ignore
      await expect(baseCrud.request()).rejects.toMatchObject({
        code: responseCode,
        message: responseMessage,
      });
    });
  });

  describe("optionsToQuery", () => {
    const endpoint = chance.string();
    const apiToken = chance.string();
    const baseCrud = new BaseCrud(apiToken, `/${endpoint}`);

    it("Should return an empty string", () => {
      //@ts-ignore
      expect(baseCrud.optionsToQuery()).toBe("");
    });

    it("Should return an GET parameter string", () => {
      const options = { test: chance.first(), test2: chance.state() };
      //@ts-ignore
      expect(baseCrud.optionsToQuery(options)).toBe(
        `?test=${options.test}&test2=${options.test2}`
      );
    });

    it("Should url encode the parameters", () => {
      const options: { [index: string]: string } = {};
      const optionKey = chance.string();
      options[optionKey] = chance.string();

      //@ts-ignore
      expect(baseCrud.optionsToQuery(options)).toBe(
        `?${encodeURIComponent(optionKey)}=${encodeURIComponent(
          options[optionKey]
        )}`
      );
    });
  });
});
