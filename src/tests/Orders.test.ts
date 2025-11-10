import BaseCrud from "../resources/BaseCrud";
import Orders from "../resources/Orders";
import Chance from "chance";

jest.mock("../resources/BaseCrud");

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("Orders", () => {
  it("Should use init the base correctly", () => {
    const token = chance.string();
    new Orders(token);
    expect(BaseCrud).toHaveBeenCalledWith(token, "/kb_order");
  });
});
