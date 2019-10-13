import Bexio, { Scopes } from "..";
import { expect } from "chai";
import BusinessActivities from "../resources/BusinessActivities";
import { BusinessActivitiesStatic } from "../interfaces/BusinessActivitiesStatic";
import dotenv from "dotenv";

dotenv.config();

describe("BusinessActivities", function() {
  // increasing timeout to 60s
  this.timeout(60000);

  let api: Bexio;
  let moduleToTest: BusinessActivities;
  let businessActivities: BusinessActivitiesStatic.BusinessActivity;
  const {
    BEXIO_CLIENTID,
    BEXIO_CLIENTSECRET,
    HOSTNAME,
    BEXIO_USERNAME,
    BEXIO_PASSWORD
  } = process.env;

  before(async () => {
    if (
      !BEXIO_CLIENTID ||
      !BEXIO_CLIENTSECRET ||
      !HOSTNAME ||
      !BEXIO_USERNAME ||
      !BEXIO_PASSWORD
    )
      throw new Error("not all necessary variables defined");

    api = new Bexio(
      BEXIO_CLIENTID,
      BEXIO_CLIENTSECRET,
      `http://${HOSTNAME}/callback`,
      [Scopes.GENERAL, Scopes.GENERAL]
    );
    await api.fakeLogin(BEXIO_USERNAME, BEXIO_PASSWORD);
  });

  it("init BusinessActivities object", () => {
    moduleToTest = new BusinessActivities(api["bexioAuth"]);
  });

  it("create new business activity", async () => {
    const name = `test-${Date.now()}`;
    businessActivities = await moduleToTest.create({
      name: name,
      default_is_billable: false,
      default_price_per_hour: "10.50"
    });
    expect(businessActivities.name).to.be.eq(name);
  });

  it("list business activities", async () => {
    const list = await moduleToTest.list({});
    expect(list.map(el => el.id)).includes(businessActivities.id);
  });

  it("search business activity", async () => {
    const searchResult = await moduleToTest.search({}, [
      {
        field: BusinessActivitiesStatic.BusinessActivitySearchParameters.name,
        value: businessActivities.name,
        criteria: "="
      }
    ]);
    expect(searchResult.length).to.be.eq(1);
    expect(searchResult[0].id).to.be.eq(businessActivities.id);
    expect(searchResult[0].name).to.be.eq(businessActivities.name);
  });

  it("show business activity", async () => {
    const show = await moduleToTest.show({}, businessActivities.id);
    expect(show.id).to.be.eq(businessActivities.id);
  });

  it("overwrite business activity", async () => {
    const overwritten = await moduleToTest.overwrite(businessActivities.id, {
      name: `overwritten-${Date.now()}`
    });
    expect(overwritten.name).include("overwritten-");
  });

  it("edit business activity", async () => {
    const edited = await moduleToTest.edit(businessActivities.id, {
      name: `edited-${Date.now()}`
    });
    expect(edited.name).include("edited-");
  });

  it("delete business activity", async () => {
    const result = await moduleToTest.delete(businessActivities.id);
    expect(result).to.be.true;
  });
});
