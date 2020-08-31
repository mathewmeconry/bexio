import BaseCrud from "../resources/BaseCrud";
import { mocked } from "ts-jest/utils";
import ContactSectors from "../resources/ContactSectors";
import Chance from "chance";

jest.mock("../resources/BaseCrud");
const mockedBase = mocked(BaseCrud, true);

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("ContactSectors", () => {
  it("Should use init the base correctly", () => {
    const token = chance.string();
    new ContactSectors(token);
    expect(mockedBase).toHaveBeenCalledWith(token, "/contact_branch");
  });
});
