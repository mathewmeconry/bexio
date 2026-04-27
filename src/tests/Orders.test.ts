import BaseCrud from "../resources/BaseCrud";
import Orders from "../resources/Orders";
import Chance from "chance";
import CustomPositions from "../resources/CustomPositions";
import ArticlePositions from "../resources/ArticlePositions";
import TextPositions from "../resources/TextPositions";
import { PositionsStatic } from "../interfaces/PositionsStatic";

jest.mock("../resources/BaseCrud");
jest.mock("../resources/CustomPositions");
jest.mock("../resources/ArticlePositions");
jest.mock("../resources/TextPositions");

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("Orders", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Should use init the base correctly", () => {
    const token = chance.string();
    new Orders(token);
    expect(BaseCrud).toHaveBeenCalledWith(token, "/2.0/kb_order");
  });

  describe("createCustomPosition", () => {
    it("Should create a new CustomPosition object", async () => {
      const orderId = chance.integer({ min: 0 });
      const position: PositionsStatic.CustomPositionCreate = {
        amount: chance.string(),
        text: chance.string(),
      };
      new Orders(chance.string()).createCustomPosition(orderId, position);

      expect(CustomPositions).toHaveBeenCalledWith(
        undefined,
        "kb_order",
        orderId
      );
    });

    it("Should call create", async () => {
      const orderId = chance.integer({ min: 0 });
      const position: PositionsStatic.CustomPositionCreate = {
        amount: chance.string(),
        text: chance.string(),
      };
      new Orders(chance.string()).createCustomPosition(orderId, position);

      expect(CustomPositions.prototype.create).toHaveBeenCalledWith(position);
    });
  });

  describe("createArticlePosition", () => {
    it("Should create a new ArticlePosition object", async () => {
      const orderId = chance.integer({ min: 0 });
      const position: PositionsStatic.ArticlePositionCreate = {
        article_id: chance.integer(),
        amount: chance.string(),
      };
      new Orders(chance.string()).createArticlePosition(orderId, position);

      expect(ArticlePositions).toHaveBeenCalledWith(
        undefined,
        "kb_order",
        orderId
      );
    });

    it("Should call create", async () => {
      const orderId = chance.integer({ min: 0 });
      const position: PositionsStatic.ArticlePositionCreate = {
        article_id: chance.integer(),
        amount: chance.string(),
      };
      new Orders(chance.string()).createArticlePosition(orderId, position);

      expect(ArticlePositions.prototype.create).toHaveBeenCalledWith(position);
    });
  });

  describe("createTextPosition", () => {
    it("Should create a new TextPosition object", async () => {
      const orderId = chance.integer({ min: 0 });
      const position: PositionsStatic.TextPositionCreate = {
        text: chance.string(),
      };
      new Orders(chance.string()).createTextPosition(orderId, position);

      expect(TextPositions).toHaveBeenCalledWith(
        undefined,
        "kb_order",
        orderId
      );
    });

    it("Should call create", async () => {
      const orderId = chance.integer({ min: 0 });
      const position: PositionsStatic.TextPositionCreate = {
        text: chance.string(),
      };
      new Orders(chance.string()).createTextPosition(orderId, position);

      expect(TextPositions.prototype.create).toHaveBeenCalledWith(position);
    });
  });
});
