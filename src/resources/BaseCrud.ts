import { BaseStatic } from "./../interfaces/BaseStatic";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

export default class BaseCrud<
  Small,
  Full,
  Search,
  SearchType,
  Create,
  Overwrite
> {
  protected apiToken: string;
  protected apiEndpoint: string;
  protected baseApiUrl: string = "https://api.bexio.com";

  constructor(apiToken: string, apiEndpoint: string) {
    this.apiToken = apiToken;
    this.apiEndpoint = apiEndpoint;
  }

  /**
   * Lists the ressource
   *
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {Promise<Array<T>>}
   * @memberof BaseCrud
   */
  public async list(options?: BaseStatic.BaseOptions): Promise<Array<Small>> {
    return this.request<Array<Small>>("GET", this.apiEndpoint, options);
  }

  /**
   * search for resources
   *
   * @param {Array<BaseStatic.SearchParameter<SearchType>>} searchOptions
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {Promise<Array<Search>>}
   * @memberof BaseCrud
   */
  public async search(
    searchOptions: Array<BaseStatic.SearchParameter<SearchType>>,
    options?: BaseStatic.BaseOptions
  ): Promise<Array<Search>> {
    return this.request<Array<Search>>(
      "POST",
      this.apiEndpoint + "/search",
      options,
      searchOptions
    );
  }

  /**
   * show a specific ressource
   *
   * @param {string | number} id
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {Promise<Full>}
   * @memberof BaseCrud
   */
  public async show(
    id: string | number,
    options?: BaseStatic.BaseOptions
  ): Promise<Full> {
    return this.request<Full>("GET", this.apiEndpoint + "/" + id, options);
  }

  /**
   * create a new ressource
   *
   * @param {Full} ressource
   * @returns {Promise<Full>}
   * @memberof BaseCrud
   */
  public async create(ressource: Create): Promise<Full> {
    return this.request<Full>("POST", this.apiEndpoint, undefined, ressource);
  }

  /**
   * overwrite an existing ressource
   *
   * @param {number} id
   * @param {Overwrite} ressource
   * @returns {Promise<Full>}
   * @memberof BaseCrud
   */
  public async overwrite(id: number, ressource: Overwrite): Promise<Full> {
    return this.request<Full>(
      "PUT",
      this.apiEndpoint + "/" + id,
      undefined,
      ressource
    );
  }

  /**
   * edit an existing ressource
   *
   * @param {number} id
   * @param {Partial<Overwrite>} ressource
   * @returns {Promise<Full>}
   * @memberof BaseCrud
   */
  public async edit(id: number, ressource: Partial<Overwrite>): Promise<Full> {
    return this.request<Full>(
      "POST",
      this.apiEndpoint + "/" + id,
      undefined,
      ressource
    );
  }

  /**
   * delete an ressource
   *
   * @param {string | number} id
   * @returns {Promise<boolean>}
   * @memberof BaseCrud
   */
  public async delete(id: string | number): Promise<boolean> {
    return (
      await this.request<{ success: boolean }>(
        "DELETE",
        this.apiEndpoint + "/" + id
      )
    ).success;
  }

  /**
   * Base request to the api
   *
   * @protected
   * @template T
   * @param {string} method
   * @param {string} path
   * @param {BaseStatic.BaseOptions} [options]
   * @param {*} [data]
   * @returns {Promise<T>}
   * @memberof Bexio
   */
  protected async request<T>(
    method:
      | "DELETE"
      | "get"
      | "GET"
      | "delete"
      | "head"
      | "HEAD"
      | "options"
      | "OPTIONS"
      | "post"
      | "POST"
      | "put"
      | "PUT"
      | "patch"
      | "PATCH"
      | "purge"
      | "PURGE"
      | "link"
      | "LINK"
      | "unlink"
      | "UNLINK",
    path: string,
    options?: BaseStatic.BaseOptions,
    data?: any
  ): Promise<T> {
    let requestOptions: AxiosRequestConfig = {
      method: method,
      url: this.baseApiUrl + path + this.optionsToQuery(options),
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    if (data) {
      //@ts-ignore
      requestOptions.data = data;
    }

    try {
      const reponse = await axios.request(requestOptions);
      return reponse.data;
    } catch (e) {
      const error = e as AxiosError;
      return Promise.reject({
        code: error.response?.status,
        message: error.response?.data,
      });
    }
  }

  /**
   * Generates the querystring out of the options
   *
   * @protected
   * @param {BaseStatic.BaseOptions} [options]
   * @returns {string}
   * @memberof Bexio
   */
  protected optionsToQuery(options?: BaseStatic.BaseOptions): string {
    let str = [];
    if (!options) {
      return "";
    }

    for (let i in options) {
      if (options.hasOwnProperty(i)) {
        const value = options[i];
        if (Array.isArray(value)) {
          value.forEach((v) => {
            str.push(encodeURIComponent(i) + "=" + encodeURIComponent(v));
          });
        } else {
          str.push(encodeURIComponent(i) + "=" + encodeURIComponent(value));
        }
      }
    }

    return `?${str.join("&")}`;
  }
}
