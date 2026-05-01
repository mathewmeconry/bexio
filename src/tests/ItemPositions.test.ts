import BaseCrud from "../resources/BaseCrud";
import ItemPositions from "../resources/ItemPositions";
import Chance from "chance";

jest.mock("../resources/BaseCrud");

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("ItemPositions", () => {
  it("Should use init the base correctly", () => {
    const token = chance.string();
    const documentId = chance.integer();
    new ItemPositions(token, "kb_order", documentId);
    expect(BaseCrud).toHaveBeenCalledWith(
      token,
      `/2.0/kb_order/${documentId}/kb_position_article`
    );
  });
});
