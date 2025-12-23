import BaseCrud from "../resources/BaseCrud";
import Currencies from "../resources/Currencies";
import Chance from "chance";

jest.mock("../resources/BaseCrud");

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("Currencies", () => {
  it("Should use init the base correctly", () => {
    const token = chance.string();
    new Currencies(token);
    expect(BaseCrud).toHaveBeenCalledWith(token, "/3.0/currencies");
  });
});
