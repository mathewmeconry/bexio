import Bexio, { Scopes } from "..";
import { expect } from "chai";
import ContactRelations from "../resources/ContactRelations";
import { ContactRelationsStatic } from "../interfaces/ContactRelationsStatic";
import dotenv from "dotenv";

dotenv.config();

describe("ContactRelations", function() {
  // increasing timeout to 60s
  this.timeout(60000);

  let api: Bexio;
  let moduleToTest: ContactRelations;
  let contactRelation: ContactRelationsStatic.ContactRelation;
  const {
    BEXIO_CLIENTID,
    BEXIO_CLIENTSECRET,
    HOSTNAME,
    BEXIO_USERNAME,
    BEXIO_PASSWORD
  } = process.env;

  before(async () => {
    if (
      !BEXIO_CLIENTID ||
      !BEXIO_CLIENTSECRET ||
      !HOSTNAME ||
      !BEXIO_USERNAME ||
      !BEXIO_PASSWORD
    )
      throw new Error("not all necessary variables defined");

    api = new Bexio(
      BEXIO_CLIENTID,
      BEXIO_CLIENTSECRET,
      `http://${HOSTNAME}/callback`,
      [Scopes.CONTACT_SHOW, Scopes.CONTACT_EDIT]
    );
    await api.fakeLogin(BEXIO_USERNAME, BEXIO_PASSWORD);
  });

  it("init ContactRelations object", () => {
    moduleToTest = new ContactRelations(api["bexioAuth"]);
  });

  it("create new contact relation", async () => {
    const description = `test-${Date.now()}`;
    contactRelation = await moduleToTest.create({
      contact_id: 1,
      contact_sub_id: 2,
      description
    });
    expect(contactRelation.description).to.be.eq(description);
  });

  it("list contact relation", async () => {
    const list = await moduleToTest.list({});
    expect(list.map(el => el.id)).includes(contactRelation.id);
  });

  it("search contact relation", async () => {
    const searchResult = await moduleToTest.search({}, [
      {
        field:
          ContactRelationsStatic.ContactRelationSearchParameters.contact_id,
        value: 1,
        criteria: "="
      }
    ]);
    expect(searchResult.length).to.be.eq(1);
    expect(searchResult[0].id).to.be.eq(contactRelation.id);
  });

  it("show contact relation", async () => {
    const show = await moduleToTest.show({}, contactRelation.id);
    expect(show.id).to.be.eq(contactRelation.id);
  });

  it("overwrite contact relation", async () => {
    const overwritten = await moduleToTest.overwrite(contactRelation.id, {
      contact_id: 1,
      contact_sub_id: 2,
      description: `overwritten-${Date.now()}`
    });
    expect(overwritten.description).include("overwritten-");
  });

  it("edit contact relation", async () => {
    const edited = await moduleToTest.edit(contactRelation.id, {
      contact_id: contactRelation.contact_id,
      description: `edited-${Date.now()}`
    });
    expect(edited.description).include("edited-");
  });

  it("delete contact relation", async () => {
    const result = await moduleToTest.delete(contactRelation.id);
    expect(result).to.be.true;
  });
});
