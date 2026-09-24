import BaseCrud from "../resources/BaseCrud";
import Positions from "../resources/Positions";
import { PositionsStatic } from "../interfaces/PositionsStatic";
import Chance from "chance";

jest.mock("../resources/BaseCrud");

const seedgenerator = new Chance();
const seed = seedgenerator.hash();
console.log(`using chance seed ${seed}`);
const chance = new Chance(seed);

describe("Positions", () => {
  const endpoints: Record<PositionsStatic.PositionType, string> = {
    KbPositionCustom: "kb_position_custom",
    KbPositionArticle: "kb_position_article",
    KbPositionText: "kb_position_text",
    KbPositionSubtotal: "kb_position_subtotal",
    KbPositionPagebreak: "kb_position_pagebreak",
    KbPositionDiscount: "kb_position_discount",
    KbPositionSubposition: "kb_position_subposition",
  };
  const cases = Object.entries(endpoints) as Array<
    [PositionsStatic.PositionType, string]
  >;

  beforeEach(() => {
    jest.mocked(BaseCrud).mockClear();
  });

  it.each(cases)(
    "Should use init the base correctly for %s",
    (type, endpoint) => {
      const token = chance.string();
      const documentId = chance.integer();
      new Positions(token, "kb_order", documentId, type);
      expect(BaseCrud).toHaveBeenCalledWith(
        token,
        `/2.0/kb_order/${documentId}/${endpoint}`
      );
    }
  );

  it("Should throw for an unknown position type without initializing the base", () => {
    expect(
      () =>
        new Positions(
          chance.string(),
          "kb_invoice",
          chance.integer(),
          // @ts-expect-error unknown types are rejected at runtime for untyped callers
          "KbPositionUnknown"
        )
    ).toThrow('Unknown position type "KbPositionUnknown"');
    expect(BaseCrud).not.toHaveBeenCalled();
  });

  it("Should not implement search and overwrite", async () => {
    const positions = new Positions(
      chance.string(),
      "kb_invoice",
      chance.integer(),
      "KbPositionCustom"
    );
    await expect(positions.search([])).rejects.toThrow(
      "not implemented by Bexio yet"
    );
    await expect(positions.overwrite(chance.integer(), {})).rejects.toThrow(
      "not implemented by Bexio yet"
    );
  });
});
