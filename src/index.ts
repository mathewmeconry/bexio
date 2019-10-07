import Scopes from "./constants/Scopes";
import OAuth2, { AuthorizationResponse } from "./libs/OAuth2";
import Contacts from "./resources/Contacts";
import ContactTypes from "./resources/ContactTypes";
import ContactSectors from "./resources/ContactSectors";
import ContactGroups from "./resources/ContactGroups";
import ContactRelations from "./resources/ContactRelations";
import Expenses from "./resources/Expenses";
import Bills from "./resources/Bills";
import Orders from "./resources/Orders";
import Projects from "./resources/Projects";
import ProjectStatuses from "./resources/ProjectStatuses";
import ProjectTypes from "./resources/ProjectTypes";
import request from "request-promise-native";
import { CookieJar } from "request";
import Timetrackings from "./resources/Timetrackings";
import TimetrackingStatuses from "./resources/TimetrackingStatuses";

export * from "./interfaces/BillsStatic";
export * from "./interfaces/CalendarStatic";
export * from "./interfaces/ContactGroupsStatic";
export * from "./interfaces/ContactRelationsStatic";
export * from "./interfaces/ContactSectorsStatic";
export * from "./interfaces/ContactTypesStatic";
export * from "./interfaces/ContactsStatic";
export * from "./interfaces/ExpensesStatic";
export * from "./interfaces/NotesStatic";
export * from "./interfaces/OrdersStatic";
export * from "./interfaces/ProjectsStatic";
export * from "./interfaces/ProjectStatusesStatic";
export * from "./interfaces/ProjectTypesStatic";
export * from "./interfaces/SalesOrderManagementStatic";
export * from "./interfaces/TimetrackingsStatic";
export * from "./interfaces/TimetrackingStatusesStatic";
export { Scopes };

export default class Bexio {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private scopes: Array<Scopes>;

  private bexioAuth: OAuth2;

  // Resources
  // Contacts
  public contacts: Contacts;
  public contactTypes: ContactTypes;
  public contactSectors: ContactSectors;
  public contactGroups: ContactGroups;
  public contactRelations: ContactRelations;

  // Sales Order Management
  public orders: Orders;
  public expenses: Expenses;
  public bills: Bills;

  // Projects
  public projects: Projects;
  public projectStatuses: ProjectStatuses;
  public projectTypes: ProjectTypes;

  // Timesheets
  public timetrackings: Timetrackings;
  public timetrackingStatuses: TimetrackingStatuses;

  constructor(
    clientId: string,
    clientSecret: string,
    redirectUri: string,
    scopes: Array<Scopes>
  ) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.scopes = scopes;

    // add general scope to the request list
    this.scopes.push(Scopes.GENERAL);

    this.bexioAuth = new OAuth2(
      this.clientId,
      this.clientSecret,
      this.redirectUri,
      this.scopes
    );

    // Init resources
    this.contacts = new Contacts(this.bexioAuth);
    this.contactTypes = new ContactTypes(this.bexioAuth);
    this.contactSectors = new ContactSectors(this.bexioAuth);
    this.contactGroups = new ContactGroups(this.bexioAuth);
    this.contactRelations = new ContactRelations(this.bexioAuth);
    this.orders = new Orders(this.bexioAuth);
    this.projects = new Projects(this.bexioAuth);
    this.projectStatuses = new ProjectStatuses(this.bexioAuth);
    this.projectTypes = new ProjectTypes(this.bexioAuth);
    this.expenses = new Expenses(this.bexioAuth);
    this.bills = new Bills(this.bexioAuth);
    this.timetrackings = new Timetrackings(this.bexioAuth);
    this.timetrackingStatuses = new TimetrackingStatuses(this.bexioAuth);
  }

  /**
   * Returns the authorization uri for starting the oauth2 flow
   *
   * @returns {string}
   * @memberof Bexio
   */
  public getAuthUrl(): string {
    return this.bexioAuth.getAuthorizationUrl();
  }

  /**
     * Generates the Accesstoken out of the auth response
     *
     * @param {AuthorizationResponse} query
     * @returns {Promise<{
        access_token: string,
        expires_in: number,
        refresh_token: string,
        org: string,
        user_id: number,
        valid_until: Date
    }>}
     * @memberof Bexio
     */
  public async generateAccessToken(
    query: AuthorizationResponse
  ): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
    org: string;
    user_id: number;
    valid_until: Date;
  }> {
    return this.bexioAuth.generateAccessToken(query);
  }

  /**
   * returns if the authentication is already done
   *
   * @returns {boolean}
   * @memberof Bexio
   */
  public isInitialized(): boolean {
    return this.bexioAuth.isInitialized();
  }

  /**
     * performs the fakelogin without preinitializing the api
     *
     * @static
     * @param {string} clientId
     * @param {string} clientSecret
     * @param {Array<Scopes>} scopes
     * @param {string} username
     * @param {string} password
     * @returns {Promise<{
        access_token: string,
        expires_in: number,
        refresh_token: string,
        org: string,
        user_id: number,
        valid_until: Date
    }>}
     * @memberof Bexio
     */
  public static async fakeLogin(
    clientId: string,
    clientSecret: string,
    scopes: Array<Scopes>,
    username: string,
    password: string
  ): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
    org: string;
    user_id: number;
    valid_until: Date;
  }> {
    let api = new this(
      clientId,
      clientSecret,
      "https://office.bexio.com/fakecallback",
      scopes
    );
    return api.fakeLogin(username, password);
  }

  /**
     * Bypasses the login userinteraction with the api
     * 
     * The login procedure has following steps:
     * 1. redirect to the login form via the authurl to grab all the cookies
     * 2. login into the system and got to the SAML authorization
     * 3. perform the SAML stuff and proceed to the "accept" section to accept the requested scopes
     * 4. accept the stuff
     * 5. ...
     * 6. profit!
     * 
     * @param {string} username
     * @param {string} password
     * @returns {{
        access_token: string,
        expires_in: number,
        refresh_token: string,
        org: string,
        user_id: number,
        valid_until: Date
    }}
     * @memberof Bexio
     */
  public async fakeLogin(
    username: string,
    password: string
  ): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
    org: string;
    user_id: number;
    valid_until: Date;
  }> {
    // very important cookie jar
    let cookieJar: CookieJar = request.jar();
    // untyped because of 'used before assigned' typescript error (But in real it is a request.FullResponse)
    let res: request.FullResponse;

    // step 1: Grab the cookies and go the login form
    const authUrl = this.getAuthUrl();
    try {
      res = await request({
        uri: authUrl,
        followRedirect: true,
        simple: false,
        resolveWithFullResponse: true,
        jar: cookieJar
      });
    } catch (err) {
      throw new Error(
        "Failed at step 1: grab the cookies and go the login form"
      );
    }

    // step 2: grab the csrf token and perform the login
    // can also be set by yourself with the same value in the cookie and the formdata
    let csrfToken = cookieJar
      .getCookieString("https://idp.bexio.com")
      .split("XSRF-TOKEN=")[1]
      .split(";")[0];
    try {
      res = await request({
        uri: res.request.href,
        method: "POST",
        jar: cookieJar,
        simple: false,
        resolveWithFullResponse: true,
        followAllRedirects: true,
        form: {
          username: username,
          password: password,
          _csrf: csrfToken
        }
      });
    } catch (err) {
      throw new Error("Failed at step 2: do the login");
    }

    // step 3: perform the SAML stuff
    let base64Regex = /name="SAMLResponse" value="(\S+)"/gm;
    let samlResponse = (base64Regex.exec(res.body as string) || [])[1];
    if (!samlResponse) throw new Error("Failed at step 2: do the login");

    try {
      res = await request({
        uri: "https://office.bexio.com/index.php/samlauth/consume",
        method: "POST",
        jar: cookieJar,
        simple: false,
        resolveWithFullResponse: true,
        followAllRedirects: true,
        form: {
          SAMLResponse: samlResponse
        }
      });
    } catch (err) {
      throw new Error("Failed at step 3: perform the necessary SAML stuff");
    }

    // step 4: accept the scopes
    let csrfRegex = /value="(\S+)".+id="confirm_scopes__csrf_token"/gm;
    csrfToken = (csrfRegex.exec(res.body) || [])[1];
    if (!csrfToken)
      throw new Error("Failed at step 3: perform the necessary SAML stuff");

    try {
      res = await request({
        uri: `https://office.bexio.com/index.php/oauth/authorize?client_id=${
          this.clientId
        }&redirect_uri=${encodeURIComponent(
          this.redirectUri
        )}&scope=${this.scopes.join("+")}&state=${new URL(
          authUrl
        ).searchParams.get("state")}&is_mobile=0&is_ios=0&response_type=code`,
        method: "POST",
        jar: cookieJar,
        simple: false,
        resolveWithFullResponse: true,
        followAllRedirects: false,
        form: {
          "confirm_scopes[_csrf_token]": csrfToken,
          authorize: 1
        }
      });
    } catch (err) {
      throw new Error("Failed at step 4: accept the requested scopes");
    }

    if (!res.headers.location || res.statusCode !== 302)
      throw Error("Something failed....");
    let responseURL = new URL(res.headers.location);
    return this.generateAccessToken({
      code: responseURL.searchParams.get("code") || "",
      state: responseURL.searchParams.get("state") || ""
    });
  }
}
