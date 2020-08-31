import BaseCrud from "../resources/BaseCrud";
import { mocked } from "ts-jest/utils";
import Expenses from "../resources/Expenses";
import Chance from "chance";

jest.mock("../resources/BaseCrud");
const mockedBase = mocked(BaseCrud, true);

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("Expenses", () => {
  it("Should use init the base correctly", () => {
    const token = chance.string();
    new Expenses(token);
    expect(mockedBase).toHaveBeenCalledWith(token, "/kb_expense");
  });
});
