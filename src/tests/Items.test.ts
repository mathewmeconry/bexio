import BaseCrud from "../resources/BaseCrud";
import { mocked } from "ts-jest/utils";
import Chance from "chance";
import Items from "../resources/Items";

jest.mock("../resources/BaseCrud");
const mockedBase = mocked(BaseCrud, true);

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("Items", () => {
  it("Should use init the base correctly", () => {
    const token = chance.string();
    new Items(token);
    expect(mockedBase).toHaveBeenCalledWith(token, "/article");
  });
});
