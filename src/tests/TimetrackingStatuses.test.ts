
import { expect } from "chai";
import dotenv from "dotenv";
import { TimetrackingStatusesStatic } from "../interfaces/TimetrackingStatusesStatic";
import TimetrackingStatuses from "../resources/TimetrackingStatuses";

dotenv.config();

describe("TimetrackingStatuses", function() {
  // increasing timeout to 60s
  this.timeout(60000);

  
  let moduleToTest: TimetrackingStatuses;
  let timetrackingStatusEntry: TimetrackingStatusesStatic.TimetrackingStatus;
  const { BEXIO_APITOKEN } = process.env;

  it("init timetracking", () => {
    moduleToTest = new TimetrackingStatuses(BEXIO_APITOKEN as string);
  });

  it.skip("create new timetracking status (not implemented by Bexio yet)", async () => {
    timetrackingStatusEntry = await moduleToTest.create({
      name: "test"
    });
  });

  it("should return a not implemented error on creation", async () => {
    timetrackingStatusEntry = {
      id: 1,
      name: "Offen"
    };
    try {
      await moduleToTest.create({
        name: "test"
      });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it("list timetracking statuses", async () => {
    const list = await moduleToTest.list({});
    expect(list.map(el => el.id)).includes(timetrackingStatusEntry.id);
  });

  // search is currently broken on bexio side
  it.skip("search timetracking statuses", async () => {
    const searchResult = await moduleToTest.search({}, [
      {
        field:
          TimetrackingStatusesStatic.TimetrackingStatusesSearchparameters.name,
        value: timetrackingStatusEntry.name,
        criteria: "="
      }
    ]);
    expect(searchResult.length).to.be.greaterThan(0);
    expect(searchResult[0].id).to.be.eq(timetrackingStatusEntry.id);
  });

  it("show timetracking statuses", async () => {
    const showedEntry = await moduleToTest.show({}, timetrackingStatusEntry.id);
    expect(showedEntry.name).to.be.eq(timetrackingStatusEntry.name);
  });

  it.skip("overwrite a timetracking status (not implemented by Bexio yet)", async () => {
    const overwritten = await moduleToTest.overwrite(
      timetrackingStatusEntry.id,
      {
        name: "test"
      }
    );
    expect(overwritten.name).to.be.eq("test");
  });

  it("should return a not implemented error on overwrite", async () => {
    try {
      await moduleToTest.overwrite(timetrackingStatusEntry.id, {
        name: "test"
      });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it.skip("edit timetracking status (not implemented by Bexio yet)", async () => {
    const edited = await moduleToTest.edit(timetrackingStatusEntry.id, {
      name: "test"
    });
    expect(edited.name).to.be.eq("test");
  });

  it("should return a not implemented error on edit", async () => {
    try {
      await moduleToTest.edit(timetrackingStatusEntry.id, {
        name: "test"
      });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it.skip("delete timetracking status (not implemented by Bexio yet)", async () => {
    const result = await moduleToTest.delete(timetrackingStatusEntry.id);
    expect(result).to.be.true;
  });

  it("should return a not implemented error on deletion", async () => {
    try {
      await moduleToTest.delete(timetrackingStatusEntry.id);
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });
});
