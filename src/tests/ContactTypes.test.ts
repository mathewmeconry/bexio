import Bexio, { Scopes } from "..";
import { expect } from "chai";
import ContactTypes from "../resources/ContactTypes";
import { ContactTypesStatic } from "../interfaces/ContactTypesStatic";
import dotenv from "dotenv";

dotenv.config();

describe("ContactTypes", function() {
  // increasing timeout to 60s
  this.timeout(60000);

  let api: Bexio;
  let moduleToTest: ContactTypes;
  let contactType: ContactTypesStatic.ContactType = { id: 1, name: "Firma" };
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

  it("init ContactTypes object", () => {
    moduleToTest = new ContactTypes(api["bexioAuth"]);
  });

  it.skip("create new contact type (not implemented by Bexio yet)", async () => {
    contactType = await moduleToTest.create({ name: `type-${Date.now()}` });
    expect(contactType.name).include("type-");
  });

  it("should return a not implemented error on creation", async () => {
    try {
      contactType = await moduleToTest.create({ name: `type-${Date.now()}` });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it("list contact types", async () => {
    const list = await moduleToTest.list({});
    expect(list.map(el => el.id)).includes(contactType.id);
  });

  it("search contact type", async () => {
    const searchResult = await moduleToTest.search({}, [
      {
        field: ContactTypesStatic.ContactTypeSearchParameters.name,
        value: contactType.name,
        criteria: "="
      }
    ]);
    expect(searchResult.length).to.be.eq(1);
    expect(searchResult[0].id).to.be.eq(contactType.id);
  });

  it("show contact type", async () => {
    const show = await moduleToTest.show({}, contactType.id);
    expect(show.id).to.be.eq(contactType.id);
    expect(show.name).to.be.eq(contactType.name);
  });

  it.skip("overwrite contact type (not implemented by Bexio yet)", async () => {
    const overwritten = await moduleToTest.overwrite(contactType.id, {
      name: `overwritten-${Date.now()}`,
      id: 1
    });
    expect(overwritten.name).include("overwritten");
  });

  it("should return a not implemented error on overwrite", async () => {
    try {
      const overwritten = await moduleToTest.overwrite(contactType.id, {
        name: `overwritten-${Date.now()}`,
        id: 1
      });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it.skip("edit contact type (not implemented by Bexio yet)", async () => {
    const edited = await moduleToTest.edit(contactType.id, {
      name: `edited-${Date.now()}`
    });
    expect(edited.name).include("edited-");
  });

  it("should return a not implemented error on edit", async () => {
    try {
      const edited = await moduleToTest.edit(contactType.id, {
        name: `edited-${Date.now()}`
      });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it.skip("delete contact type (not implemented by Bexio yet)", async () => {
    const result = await moduleToTest.delete(contactType.id);
    expect(result).to.be.true;
  });

  it("should return a not implemented error on delete", async () => {
    try {
      const result = await moduleToTest.delete(contactType.id);
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });
});
