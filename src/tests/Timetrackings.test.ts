import Bexio, { Scopes } from "..";
import { expect } from "chai";
import dotenv from "dotenv";
import Timetrackings from "../resources/Timetrackings";
import { TimetrackingsStatic } from "../interfaces/TimetrackingsStatic";

dotenv.config();

describe("Timetracking", function() {
  // increasing timeout to 60s
  this.timeout(60000);

  let api: Bexio;
  let moduleToTest: Timetrackings;
  let timetrackingEntry: TimetrackingsStatic.TimetrackingsFull;
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
      [Scopes.MONITORING_EDIT, Scopes.MONITORING_SHOW]
    );
    await api.fakeLogin(BEXIO_USERNAME, BEXIO_PASSWORD);
  });

  it("init timetracking", () => {
    moduleToTest = new Timetrackings(api["bexioAuth"]);
  });

  it("create new timetracking entry", async () => {
    timetrackingEntry = await moduleToTest.create({
      contact_id: 1,
      user_id: 1,
      allowable_bill: true,
      client_service_id: 1,
      tracking: {
        date: "2019-01-01",
        duration: "02:00",
        type: "duration"
      }
    });
  });

  it("list timetracking entries", async () => {
    const list = await moduleToTest.list({});
    expect(list.map(el => el.id)).includes(timetrackingEntry.id);
  });

  it("search timetracking entry", async () => {
    const searchResult = await moduleToTest.search({}, [
      {
        field: TimetrackingsStatic.TimetrackingsSearchParameters.id,
        value: timetrackingEntry.id,
        criteria: "="
      }
    ]);
    expect(searchResult.length).to.be.eq(1);
    expect(searchResult[0].id).to.be.eq(timetrackingEntry.id);
  });

  it("show timetracking entry", async () => {
    const showedEntry = await moduleToTest.show({}, timetrackingEntry.id);
    expect(showedEntry.id).to.be.eq(timetrackingEntry.id);
  });

  it.skip("overwrite a timetracking entry (not implemented by Bexio yet)", async () => {
    const overwritten = await moduleToTest.overwrite(timetrackingEntry.id, {
      allowable_bill: false
    });
    expect(overwritten.allowable_bill).to.be.false;
  });

  it("should return a not implemented error on creation", async () => {
    try {
      await moduleToTest.overwrite(timetrackingEntry.id, {
        allowable_bill: false
      });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it("edit timetracking entry", async () => {
    const edited = await moduleToTest.edit(timetrackingEntry.id, {
      contact_id: 1,
      tracking: {
        date: "2019-01-02",
        duration: "02:00"
      }
    });
    expect(edited.tracking.date).to.be.eq("2019-01-02");
  });

  it("delete timetracking entry", async () => {
    const result = await moduleToTest.delete(timetrackingEntry.id);
    expect(result).to.be.true;
  });
});
