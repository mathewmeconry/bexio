import Bexio, { Scopes } from "..";
import { expect } from "chai";
import ContactGroups from "../resources/ContactGroups";
import { ContactGroupsStatic } from "../interfaces/ContactGroupsStatic";
import dotenv from "dotenv";

dotenv.config();

describe("ContactGroups", function() {
  // increasing timeout to 60s
  this.timeout(60000);

  let api: Bexio;
  let moduleToTest: ContactGroups;
  let contactGroup: ContactGroupsStatic.ContactGroup;
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

  it("init ContactGroups object", () => {
    moduleToTest = new ContactGroups(api["bexioAuth"]);
  });

  it("create new contact group", async () => {
    const name = `test-${Date.now()}`;
    contactGroup = await moduleToTest.create({
      name
    });
    expect(contactGroup.name).to.be.eq(name);
  });

  it("list contact groups", async () => {
    const list = await moduleToTest.list({});
    expect(list.map(el => el.id)).includes(contactGroup.id);
  });

  it("search contact group", async () => {
    const searchResult = await moduleToTest.search({}, [
      {
        field: ContactGroupsStatic.ContactGroupSearchParameters.name,
        value: contactGroup.name,
        criteria: "="
      }
    ]);
    expect(searchResult.length).to.be.eq(1);
    expect(searchResult[0].id).to.be.eq(contactGroup.id);
  });

  it("show contact group", async () => {
    const show = await moduleToTest.show({}, contactGroup.id);
    expect(show.id).to.be.eq(contactGroup.id);
    expect(show.name).to.be.eq(contactGroup.name);
  });

  it("overwrite contact group", async () => {
    const overwritten = await moduleToTest.overwrite(contactGroup.id, {
      name: `overwritten-${Date.now()}`,
      id: contactGroup.id
    });
    expect(overwritten.name).include("overwritten-");
  });

  it("edit contact group", async () => {
    const edited = await moduleToTest.edit(contactGroup.id, {
      name: `edited-${Date.now()}`
    });
    expect(edited.name).include("edited-");
  });

  it.skip("delete contact group (not implemented by Bexio yet)", async () => {
    const result = await moduleToTest.delete(contactGroup.id);
    expect(result).to.be.true;
  });

  it("should return a not implemented error on delete", async () => {
    try {
      await moduleToTest.delete(contactGroup.id);
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });
});
