import BaseCrud from "../resources/BaseCrud";
import Timetrackings from "../resources/Timetrackings";
import Chance from "chance";

jest.mock("../resources/BaseCrud");

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("Timetrackings", () => {
  it("Should use init the base correctly", () => {
    const token = chance.string();
    new Timetrackings(token);
    expect(BaseCrud).toHaveBeenCalledWith(token, `/2.0/timesheet`);
  });
});
