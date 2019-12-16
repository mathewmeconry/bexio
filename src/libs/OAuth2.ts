import Scopes from "../constants/Scopes";
import request from "request-promise-native";

export interface AuthorizationResponse {
  code: string;
  state: string;
}

export default class OAuth2 {
  private client_id: string;
  private client_secret: string;
  private redirect_uri: string;
  private scope: Array<Scopes>;

  private authorization_uri: string =
    "https://office.bexio.com/oauth/authorize";
  private access_token_uri: string =
    "https://office.bexio.com/oauth/access_token";
  private refresh_token_uri: string =
    "https://office.bexio.com/oauth/refresh_token";
  private api_url: string = "https://office.bexio.com/api2.php/";

  private last_state?: string;
  private access_token?: string;
  private expires_in?: number;
  private valid_until?: Date;
  private refresh_token?: string;
  private org?: string;
  private user_id?: number;

  constructor(
    client_id: string,
    client_secret: string,
    redirect_uri: string,
    scope: Array<Scopes>
  ) {
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.redirect_uri = redirect_uri;
    this.scope = scope;
  }

  /**
   * Generates the authorization url to redirect the client to
   *
   * @returns {string}
   * @memberof OAuth2
   */
  public getAuthorizationUrl(): string {
    let url = new URL(this.authorization_uri);
    url.searchParams.append("client_id", this.client_id);
    url.searchParams.append("redirect_uri", this.redirect_uri);
    url.searchParams.append("scope", this.scope.join(" "));
    url.searchParams.append("state", this.getNewState());
    return url.toString();
  }

  /**
   * Gets the initial access_token of the service
   *
   * @param {AuthorizationResponse} response
   * @returns {Promise<{
   *       access_token: string,
   *       expires_in: number,
   *       refresh_token: string,
   *       org: string,
   *       user_id: number,
   *       valid_until: Date
   *   }>}
   * @memberof OAuth2
   */
  public async generateAccessToken(
    response: AuthorizationResponse
  ): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
    org: string;
    user_id: number;
    valid_until: Date;
  }> {
    if (!this.verifyState(response.state)) {
      throw new Error("Invalid state");
    }

    let res = await request({
      method: "POST",
      url: this.access_token_uri,
      formData: {
        client_id: this.client_id,
        client_secret: this.client_secret,
        redirect_uri: this.redirect_uri,
        code: response.code
      },
      json: true
    });

    this.access_token = res.access_token;
    this.expires_in = res.expires_in;
    this.refresh_token = res.refresh_token;
    this.org = res.org;
    this.user_id = res.user_id;
    this.valid_until = new Date();
    this.valid_until.setSeconds(
      this.valid_until.getSeconds() + (this.expires_in || 0)
    );

    return Object.assign(res, {
      valid_until: this.valid_until
    });
  }

  /**
   * Generates the base API url
   *
   * @returns {string}
   * @memberof OAuth2
   */
  public getApiUrl(): string {
    return this.api_url + "/" + this.org;
  }

  /**
   * Returns the bearer header entry to sign the request
   *
   * @returns {Promise<string>}
   * @memberof OAuth2
   */
  public async getBearerHeader(): Promise<string> {
    if (!this.isAccessTokenStillValid()) {
      await this.refreshToken();
    }
    return "Bearer " + this.access_token;
  }

  /**
   * Returns if it is initlized
   *
   * @returns {boolean}
   * @memberof OAuth2
   */
  public isInitialized(): boolean {
    return this.isAccessTokenStillValid() || this.isRefreshTokenStillValid();
  }

  /**
   * Checks if the provided scope is also requested at the api
   *
   * @param {Scopes} scope
   * @returns {boolean}
   * @memberof OAuth2
   */
  public checkScope(scope: Scopes): boolean {
    return this.scope.indexOf(scope) > -1;
  }

  /**
   * checks if the access token is expired or not
   *
   * @private
   * @returns {boolean}
   * @memberof OAuth2
   */
  private isAccessTokenStillValid(): boolean {
    return new Date() < (this.valid_until || 0);
  }

  /**
   * checks if the refresh token is expired or not
   *
   * @private
   * @returns {boolean}
   * @memberof OAuth2
   */
  private isRefreshTokenStillValid(): boolean {
    let refresh_valid_until = new Date(this.valid_until || 0);
    refresh_valid_until.setHours(refresh_valid_until.getHours() + 7 * 24);
    return new Date() < refresh_valid_until;
  }

  /**
   * refreshs the access token with the refresh token
   *
   * @private
   * @returns {Promise<void>}
   * @memberof OAuth2
   */
  private async refreshToken(): Promise<void> {
    if (!this.isRefreshTokenStillValid()) {
      throw new Error("Refresh failed: Refresh token not valid anymore");
    }

    let response = await request({
      method: "POST",
      json: true,
      url: this.refresh_token_uri,
      formData: {
        client_id: this.client_id,
        client_secret: this.client_secret,
        refresh_token: this.refresh_token
      }
    });

    this.access_token = response.access_token;
    this.expires_in = response.expires_in;
    this.refresh_token = response.refresh_token;
    this.org = response.org;
    this.user_id = response.user_id;
    this.valid_until = new Date();
    this.valid_until.setSeconds(
      this.valid_until.getSeconds() + (this.expires_in || 0)
    );
  }

  /**
   * Generates a new state and stores it for later verification
   *
   * @private
   * @returns {string}
   * @memberof OAuth2
   */
  private getNewState(): string {
    this.last_state = Math.random().toString();
    return this.last_state;
  }

  /**
   * Verifies if the response state is the same as the last sent one
   *
   * @private
   * @param {string} state
   * @returns {boolean}
   * @memberof OAuth2
   */
  private verifyState(state: string): boolean {
    return this.last_state === state;
  }
}
