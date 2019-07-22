import Bexio, { Scopes } from "..";
import { expect } from "chai";
import Contacts from "../resources/Contacts";
import { ContactsStatic } from "../interfaces/ContactsStatic";
import dotenv from "dotenv";

dotenv.config();

describe("Contacts", function() {
  // increasing timeout to 60s
  this.timeout(60000);

  let api: Bexio;
  let moduleToTest: Contacts;
  let contact: ContactsStatic.ContactFull;
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

  it("init Contacts object", () => {
    moduleToTest = new Contacts(api["bexioAuth"]);
  });

  it("create new contact", async () => {
    const name = `test-${Date.now()}`;
    contact = await moduleToTest.create({
      contact_group_ids: [],
      contact_type_id: 2,
      country_id: 1,
      name_1: name,
      owner_id: 1,
      user_id: 1
    });
    expect(contact.name_1).to.be.eq(name);
  });

  it("list contacts", async () => {
    const list = await moduleToTest.list({});
    expect(list.map(el => el.id)).includes(contact.id);
  });

  it("search contact", async () => {
    const searchResult = await moduleToTest.search({}, [
      {
        field: ContactsStatic.ContactSearchParameters.id,
        value: contact.id,
        criteria: "="
      }
    ]);
    expect(searchResult.length).to.be.eq(1);
    expect(searchResult[0].id).to.be.eq(contact.id);
    expect(searchResult[0].name_1).to.be.eq(contact.name_1);
  });

  it("show contact", async () => {
    const show = await moduleToTest.show({}, contact.id);
    expect(show.id).to.be.eq(contact.id);
  });

  it("overwrite contact", async () => {
    const overwritten = await moduleToTest.overwrite(contact.id, {
      nr: contact.nr,
      contact_group_ids: [],
      contact_type_id: 1,
      country_id: 1,
      name_1: `overwritten-${Date.now()}`,
      owner_id: 1,
      user_id: 1
    });
    expect(overwritten.name_1).include("overwritten-");
  });

  it("edit contact", async () => {
    const edited = await moduleToTest.edit(contact.id, {
      name_1: `edited-${Date.now()}`
    });
    expect(edited.name_1).include("edited-");
  });

  it("delete contact", async () => {
    const result = await moduleToTest.delete(contact.id);
    expect(result).to.be.true;
  });
});
