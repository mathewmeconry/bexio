import Bexio, { Scopes } from "..";
import { expect } from "chai";
import ContactSectors from "../resources/ContactSectors";
import { ContactSectorsStatic } from "../interfaces/ContactSectorsStatic";
import dotenv from "dotenv";

dotenv.config();

describe("ContactSectors", function() {
  // increasing timeout to 60s
  this.timeout(60000);

  let api: Bexio;
  let moduleToTest: ContactSectors;
  let contactSector: ContactSectorsStatic.ContactSector = {
    id: 1,
    name: "Test Don't delete"
  };
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

  it("init ContactSectors object", () => {
    moduleToTest = new ContactSectors(api["bexioAuth"]);
  });

  it.skip("create new contact sector (not implemented by Bexio yet)", async () => {
    contactSector = await moduleToTest.create({
      id: 1,
      name: `sector-${Date.now()}`
    });
    expect(contactSector.name).include("sector-");
  });

  it("should return a not implemented error on creation", async () => {
    try {
      await moduleToTest.create({ id: 1, name: `sector-${Date.now()}` });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it("list contact sectors", async () => {
    const list = await moduleToTest.list({});
    expect(list.map(el => el.id)).includes(contactSector.id);
  });

  it("search contact sector", async () => {
    const searchResult = await moduleToTest.search({}, [
      {
        field: ContactSectorsStatic.ContactSectorSearchParameters.name,
        value: contactSector.name,
        criteria: "="
      }
    ]);
    expect(searchResult.length).to.be.eq(1);
    expect(searchResult[0].id).to.be.eq(contactSector.id);
  });

  it("show contact sector", async () => {
    const show = await moduleToTest.show({}, contactSector.id);
    expect(show.id).to.be.eq(contactSector.id);
    expect(show.name).to.be.eq(contactSector.name);
  });

  it.skip("overwrite contact sector (not implemented by Bexio yet)", async () => {
    const overwritten = await moduleToTest.overwrite(contactSector.id, {
      name: `overwritten-${Date.now()}`,
      id: 1
    });
    expect(overwritten.name).include("overwritten");
  });

  it("should return a not implemented error on overwrite", async () => {
    try {
      const overwritten = await moduleToTest.overwrite(contactSector.id, {
        name: `overwritten-${Date.now()}`,
        id: 1
      });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it.skip("edit contact sector (not implemented by Bexio yet)", async () => {
    const edited = await moduleToTest.edit(contactSector.id, {
      name: `edited-${Date.now()}`
    });
    expect(edited.name).include("edited-");
  });

  it("should return a not implemented error on edit", async () => {
    try {
      const edited = await moduleToTest.edit(contactSector.id, {
        name: `edited-${Date.now()}`
      });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it.skip("delete contact sector (not implemented by Bexio yet)", async () => {
    const result = await moduleToTest.delete(contactSector.id);
    expect(result).to.be.true;
  });

  it("should return a not implemented error on deletion", async () => {
    try {
      const result = await moduleToTest.delete(contactSector.id);
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });
});
