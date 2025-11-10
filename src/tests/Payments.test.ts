import BaseCrud from "../resources/BaseCrud";
import Payments from "../resources/Payments";
import Chance from "chance";

jest.mock("../resources/BaseCrud");

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("Payments", () => {
  it("Should use init the base correctly", () => {
    const token = chance.string();
    const billId = chance.integer();
    new Payments(token, billId);
    expect(BaseCrud).toHaveBeenCalledWith(
      token,
      `/kb_bill/${billId}/payment`
    );
  });
});
