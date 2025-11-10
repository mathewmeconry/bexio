import BaseCrud from "../resources/BaseCrud";
import BusinessActivities from "../resources/BusinessActivities";
import Chance from "chance";

jest.mock("../resources/BaseCrud");

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("BusinessActivities", () => {
  it("Should use init the base correctly", () => {
    const token = chance.string();
    new BusinessActivities(token);
    expect(BaseCrud).toHaveBeenCalledWith(token, "/client_service");
  });
});
