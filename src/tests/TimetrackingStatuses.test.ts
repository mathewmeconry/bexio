import BaseCrud from "../resources/BaseCrud";
import TimetrackingStatuses from "../resources/TimetrackingStatuses";
import Chance from "chance";

jest.mock("../resources/BaseCrud");

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("TimetrackingStatuses", () => {
  it("Should use init the base correctly", () => {
    const token = chance.string();
    new TimetrackingStatuses(token);
    expect(BaseCrud).toHaveBeenCalledWith(token, `/2.0/timesheet_status`);
  });
});
