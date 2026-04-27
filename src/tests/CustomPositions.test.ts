import BaseCrud from "../resources/BaseCrud";
import CustomPositions from "../resources/CustomPositions";
import Chance from "chance";

jest.mock("../resources/BaseCrud");

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("CustomPositions", () => {
  it("Should use init the base correctly", () => {
    const token = chance.string();
    const documentId = chance.integer();
    new CustomPositions(token, "kb_invoice", documentId);
    expect(BaseCrud).toHaveBeenCalledWith(
      token,
      `/2.0/kb_invoice/${documentId}/kb_position_custom`
    );
  });
});
