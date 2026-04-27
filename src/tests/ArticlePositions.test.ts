import BaseCrud from "../resources/BaseCrud";
import ArticlePositions from "../resources/ArticlePositions";
import Chance from "chance";

jest.mock("../resources/BaseCrud");

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("ArticlePositions", () => {
  it("Should use init the base correctly", () => {
    const token = chance.string();
    const documentId = chance.integer();
    new ArticlePositions(token, "kb_order", documentId);
    expect(BaseCrud).toHaveBeenCalledWith(
      token,
      `/2.0/kb_order/${documentId}/kb_position_article`
    );
  });
});
