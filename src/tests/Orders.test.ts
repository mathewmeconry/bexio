import BaseCrud from "../resources/BaseCrud";
import Orders from "../resources/Orders";
import Chance from "chance";
import DefaultPositions from "../resources/DefaultPositions";
import ItemPositions from "../resources/ItemPositions";
import TextPositions from "../resources/TextPositions";
import { PositionsStatic } from "../interfaces/PositionsStatic";

jest.mock("../resources/BaseCrud");
jest.mock("../resources/DefaultPositions");
jest.mock("../resources/ItemPositions");
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

  describe("createDefaultPosition", () => {
    it("Should create a new DefaultPosition object", async () => {
      const orderId = chance.integer({ min: 0 });
      const position: PositionsStatic.DefaultPositionCreate = {
        amount: chance.string(),
        amount_reserved: chance.string(),
        amount_open: chance.string(),
        amount_completed: chance.string(),
        unit_id: chance.integer(),
        account_id: chance.integer(),
        tax_id: chance.integer(),
        text: chance.string(),
        unit_price: chance.string(),
        discount_in_percent: chance.string(),
        is_optional: chance.bool(),
      };
      new Orders(chance.string()).createDefaultPosition(orderId, position);

      expect(DefaultPositions).toHaveBeenCalledWith(
        undefined,
        "kb_order",
        orderId
      );
    });

    it("Should call create", async () => {
      const orderId = chance.integer({ min: 0 });
      const position: PositionsStatic.DefaultPositionCreate = {
        amount: chance.string(),
        amount_reserved: chance.string(),
        amount_open: chance.string(),
        amount_completed: chance.string(),
        unit_id: chance.integer(),
        account_id: chance.integer(),
        tax_id: chance.integer(),
        text: chance.string(),
        unit_price: chance.string(),
        discount_in_percent: chance.string(),
        is_optional: chance.bool(),
      };
      new Orders(chance.string()).createDefaultPosition(orderId, position);

      expect(DefaultPositions.prototype.create).toHaveBeenCalledWith(position);
    });
  });

  describe("createItemPosition", () => {
    it("Should create a new ItemPosition object", async () => {
      const orderId = chance.integer({ min: 0 });
      const position: PositionsStatic.ItemPositionCreate = {
        article_id: chance.integer(),
        amount: chance.string(),
        amount_reserved: chance.string(),
        amount_open: chance.string(),
        amount_completed: chance.string(),
        unit_id: chance.integer(),
        account_id: chance.integer(),
        tax_id: chance.integer(),
        text: chance.string(),
        unit_price: chance.string(),
        discount_in_percent: chance.string(),
        is_optional: chance.bool(),
      };
      new Orders(chance.string()).createItemPosition(orderId, position);

      expect(ItemPositions).toHaveBeenCalledWith(
        undefined,
        "kb_order",
        orderId
      );
    });

    it("Should call create", async () => {
      const orderId = chance.integer({ min: 0 });
      const position: PositionsStatic.ItemPositionCreate = {
        article_id: chance.integer(),
        amount: chance.string(),
        amount_reserved: chance.string(),
        amount_open: chance.string(),
        amount_completed: chance.string(),
        unit_id: chance.integer(),
        account_id: chance.integer(),
        tax_id: chance.integer(),
        text: chance.string(),
        unit_price: chance.string(),
        discount_in_percent: chance.string(),
        is_optional: chance.bool(),
      };
      new Orders(chance.string()).createItemPosition(orderId, position);

      expect(ItemPositions.prototype.create).toHaveBeenCalledWith(position);
    });
  });

  describe("createTextPosition", () => {
    it("Should create a new TextPosition object", async () => {
      const orderId = chance.integer({ min: 0 });
      const position: PositionsStatic.TextPositionCreate = {
        text: chance.string(),
        show_pos_nr: chance.bool(),
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
        show_pos_nr: chance.bool(),
      };
      new Orders(chance.string()).createTextPosition(orderId, position);

      expect(TextPositions.prototype.create).toHaveBeenCalledWith(position);
    });
  });
});
