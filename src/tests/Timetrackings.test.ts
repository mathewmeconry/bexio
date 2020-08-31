import BaseCrud from "../resources/BaseCrud";
import { mocked } from "ts-jest/utils";
import Timetrackings from "../resources/Timetrackings";
import Chance from "chance";

jest.mock("../resources/BaseCrud");
const mockedBase = mocked(BaseCrud, true);

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("Timetrackings", () => {
  it("Should use init the base correctly", () => {
    const token = chance.string();
    new Timetrackings(token);
    expect(mockedBase).toHaveBeenCalledWith(token, `/timesheet`);
  });
});
