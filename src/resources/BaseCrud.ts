import { BaseStatic } from "./../interfaces/BaseStatic";
import { Scopes } from "..";
import OAuth2 from "../libs/OAuth2";
import request from "request-promise-native";

export default class BaseCrud<
  Small,
  Full,
  Search,
  SearchType,
  Create,
  Overwrite
> {
  protected bexioAuth: OAuth2;
  protected apiEndpoint: string;
  protected showScopes: Scopes[];
  protected editScopes: Scopes[];

  constructor(
    bexioAuth: OAuth2,
    apiEndpoint: string,
    showScopes: Scopes[] | Scopes,
    editScopes: Scopes[] | Scopes
  ) {
    this.bexioAuth = bexioAuth;
    this.apiEndpoint = apiEndpoint;
    this.showScopes = showScopes instanceof Array ? showScopes : [showScopes];
    this.editScopes = editScopes instanceof Array ? editScopes : [editScopes];
  }

  /**
   * Lists the ressource
   *
   * @param {BaseStatic.BaseOptions} options
   * @returns {Promise<Array<T>>}
   * @memberof BaseCrud
   */
  public async list(options: BaseStatic.BaseOptions): Promise<Array<Small>> {
    this.checkScopes(this.showScopes);
    return this.request<Array<Small>>("GET", this.apiEndpoint, options);
  }

  /**
   * search for resources
   *
   * @param {BaseStatic.BaseOptions} options
   * @param {Array<BaseStatic.SearchParameter<SearchType>>} searchOptions
   * @returns {Promise<Array<Search>>}
   * @memberof BaseCrud
   */
  public async search(
    options: BaseStatic.BaseOptions,
    searchOptions: Array<BaseStatic.SearchParameter<SearchType>>
  ): Promise<Array<Search>> {
    this.checkScopes(this.showScopes);
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
   * @param {BaseStatic.BaseOptions} options
   * @param {number} id
   * @returns {Promise<Full>}
   * @memberof BaseCrud
   */
  public async show(
    options: BaseStatic.BaseOptions,
    id: number
  ): Promise<Full> {
    this.checkScopes(this.showScopes);
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
    this.checkScopes(this.editScopes);
    return this.request<Full>("POST", this.apiEndpoint, {}, ressource);
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
    this.checkScopes(this.editScopes);
    return this.request<Full>(
      "PUT",
      this.apiEndpoint + "/" + id,
      {},
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
    this.checkScopes(this.editScopes);
    return this.request<Full>(
      "POST",
      this.apiEndpoint + "/" + id,
      {},
      ressource
    );
  }

  /**
   * delete an ressource
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof BaseCrud
   */
  public async delete(id: number): Promise<boolean> {
    this.checkScopes(this.editScopes);
    return (
      await this.request<{ success: boolean }>(
        "DELETE",
        this.apiEndpoint + "/" + id,
        {}
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
   * @param {BaseStatic.BaseOptions} options
   * @param {*} [data]
   * @returns {Promise<T>}
   * @memberof Bexio
   */
  protected async request<T>(
    method: string,
    path: string,
    options: BaseStatic.BaseOptions,
    data?: any
  ): Promise<T> {
    let requestOptions = {
      method: method,
      url:
        this.bexioAuth.getApiUrl() + path + "?" + this.optionsToQuery(options),
      json: true,
      headers: {
        Authorization: await this.bexioAuth.getBearerHeader()
      }
    };

    if (data) {
      //@ts-ignore
      requestOptions.body = data;
    }
    return await request(requestOptions);
  }

  /**
   * Generates the querystring out of the options
   *
   * @protected
   * @param {BaseStatic.BaseOptions} options
   * @returns {string}
   * @memberof Bexio
   */
  protected optionsToQuery(options: BaseStatic.BaseOptions): string {
    let str = [];

    for (let i in options) {
      if (options.hasOwnProperty(i)) {
        str.push(encodeURIComponent(i) + "=" + encodeURIComponent(options[i]));
      }
    }

    return str.join("&");
  }

  /**
   * checks if the scope is authenticated. Throws error if not
   *
   * @protected
   * @param {Scopes[]} scopes
   * @memberof BaseCrud
   */
  protected checkScopes(scopes: Scopes[]): void {
    for (const scope of scopes) {
      if (!this.bexioAuth.checkScope(scope)) {
        throw new Error("Scope " + scope + " not authenticated");
      }
    }
  }
}
