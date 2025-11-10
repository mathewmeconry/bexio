import BaseCrud from "../resources/BaseCrud";
import Projects from "../resources/Projects";
import Chance from "chance";

jest.mock("../resources/BaseCrud");

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("Projects", () => {
  it("Should use init the base correctly", () => {
    const token = chance.string();
    new Projects(token);
    expect(BaseCrud).toHaveBeenCalledWith(token, `/pr_project`);
  });
});
