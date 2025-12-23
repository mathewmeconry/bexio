import BaseCrud from "../resources/BaseCrud";
import Users from "../resources/Users";
import Chance from "chance";

jest.mock("../resources/BaseCrud");

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("Users", () => {
  it("Should use init the base correctly", () => {
    const token = chance.string();
    new Users(token);
    expect(BaseCrud).toHaveBeenCalledWith(token, `/2.0/user`);
  });
});
