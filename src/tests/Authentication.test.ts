import { expect } from "chai";
import OAuth2 from "../libs/OAuth2";
import Bexio from "..";
import Scopes from "../constants/Scopes";
import dotenv from "dotenv";

dotenv.config();

describe("OAuth2", function() {
  // increasing timeout to 60s
  this.timeout(60000);

  let oauth: OAuth2;
  let api: Bexio;
  let loginResponse: {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    org: string;
    user_id: number;
    valid_until: Date;
  };
  const {
    BEXIO_CLIENTID,
    BEXIO_CLIENTSECRET,
    HOSTNAME,
    BEXIO_USERNAME,
    BEXIO_PASSWORD
  } = process.env;

  before(() => {
    if (!BEXIO_CLIENTID || !BEXIO_CLIENTSECRET || !HOSTNAME)
      throw new Error("not all necessary variables defined");
    oauth = new OAuth2(
      BEXIO_CLIENTID,
      BEXIO_CLIENTSECRET,
      `http://${HOSTNAME}/callback`,
      [Scopes.GENERAL]
    );
    api = new Bexio(
      BEXIO_CLIENTID,
      BEXIO_CLIENTSECRET,
      `http://${HOSTNAME}/callback`,
      []
    );
  });

  it("should return valid auth url", () => {
    const authUrl = oauth.getAuthorizationUrl();
    expect(authUrl).includes(
      `https://office.bexio.com/oauth/authorize?client_id=${BEXIO_CLIENTID}&redirect_uri=http%3A%2F%2F${HOSTNAME}%2Fcallback&scope=`
    );
  });

  it("should not be initialized", () => {
    expect(oauth.isInitialized()).to.be.false;
  });

  it("should login as a user", async () => {
    if (!BEXIO_USERNAME || !BEXIO_PASSWORD)
      throw new Error("not all necessary variables defined");
    loginResponse = await api.fakeLogin(BEXIO_USERNAME, BEXIO_PASSWORD);
    expect(loginResponse.access_token).not.to.be.undefined;
    expect(loginResponse.expires_in).not.to.be.undefined;
    expect(loginResponse.org).not.to.be.undefined;
    expect(loginResponse.refresh_token).not.to.be.undefined;
    expect(loginResponse.user_id).not.to.be.undefined;
    expect(loginResponse.valid_until).not.to.be.undefined;

    // add properties to the oauth object for further testing
    oauth["access_token"] = loginResponse.access_token;
    oauth["expires_in"] = loginResponse.expires_in;
    oauth["valid_until"] = loginResponse.valid_until;
    oauth["refresh_token"] = loginResponse.refresh_token;
    oauth["org"] = loginResponse.org;
    oauth["user_id"] = loginResponse.user_id;
  });

  it("should be initialized", () => {
    expect(oauth.isInitialized()).to.be.true;
  });

  it("should generate a valid api url", () => {
    expect(oauth.getApiUrl()).to.be.eq(
      `${oauth["api_url"]}/${loginResponse.org}`
    );
  });

  it("should return a valid Bearer header", async () => {
    expect(await oauth.getBearerHeader()).to.be.eq(
      `Bearer ${loginResponse.access_token}`
    );
  });

  describe("checking scopes", () => {
    it("should return true", () => {
      expect(oauth.checkScope(Scopes.GENERAL)).to.be.true;
    });

    it("should return false", () => {
      expect(oauth.checkScope(Scopes.KB_BILL_EDIT)).to.be.false;
    });
  });

  it("should refresh access token", async () => {
    await oauth["refreshToken"]();
    expect(oauth["access_token"]).not.be.eq(loginResponse.access_token);
    expect(oauth["refresh_token"]).not.be.eq(loginResponse.refresh_token);
    expect(oauth["valid_until"]).not.be.eq(loginResponse.valid_until);
  });
});
