import BaseCrud from "../resources/BaseCrud";
import Chance from "chance";
import Items from "../resources/Items";

jest.mock("../resources/BaseCrud");

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("Items", () => {
  it("Should use init the base correctly", () => {
    const token = chance.string();
    new Items(token);
    expect(BaseCrud).toHaveBeenCalledWith(token, "/2.0/article");
  });
});
