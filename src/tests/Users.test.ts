import Bexio, { Scopes } from "..";
import { expect } from "chai";
import dotenv from "dotenv";
import { UsersStatic } from "../interfaces/UsersStatic";
import Users from "../resources/Users";

dotenv.config();

describe("Users", function() {
  // increasing timeout to 60s
  this.timeout(60000);

  let api: Bexio;
  let moduleToTest: Users;
  let user: UsersStatic.UserSmall;
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
      [Scopes.GENERAL, Scopes.GENERAL]
    );
    await api.fakeLogin(BEXIO_USERNAME, BEXIO_PASSWORD);
  });

  it("init user", () => {
    moduleToTest = new Users(api["bexioAuth"]);
  });

  it.skip("create new user (not implemented by Bexio yet)", async () => {
    user = await moduleToTest.create({
      name: "test"
    });
  });

  it("should return a not implemented error on creation", async () => {
    user = {
      id: 1,
      firstname: "Mathias",
      lastname: "Scherer",
      is_superadmin: false,
      color: "#ff00ff"
    };
    try {
      await moduleToTest.create({
        name: "test"
      });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it("list users", async () => {
    const list = await moduleToTest.list({});
    expect(list.map(el => el.id)).includes(user.id);
  });

  it("search users", async () => {
    const searchResult = await moduleToTest.search({}, [
      {
        field:
          UsersStatic.UsersSearchparameters.firstname,
        value: user.firstname,
        criteria: "="
      }
    ]);
    expect(searchResult.length).to.be.greaterThan(0);
    expect(searchResult[0].id).to.be.eq(user.id);
  });

  it("show user", async () => {
    const showedUser = await moduleToTest.show({}, user.id);
    expect(showedUser.lastname).to.be.eq(user.lastname);
  });

  it.skip("overwrite a user (not implemented by Bexio yet)", async () => {
    const overwritten = await moduleToTest.overwrite(
      user.id,
      {
        name: "test"
      }
    );
    expect(overwritten.lastname).to.be.eq("test");
  });

  it("should return a not implemented error on overwrite", async () => {
    try {
      await moduleToTest.overwrite(user.id, {
        name: "test"
      });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it.skip("edit user (not implemented by Bexio yet)", async () => {
    const edited = await moduleToTest.edit(user.id, {
      name: "test"
    });
    expect(edited.lastname).to.be.eq("test");
  });

  it("should return a not implemented error on edit", async () => {
    try {
      await moduleToTest.edit(user.id, {
        name: "test"
      });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it.skip("delete user (not implemented by Bexio yet)", async () => {
    const result = await moduleToTest.delete(user.id);
    expect(result).to.be.true;
  });

  it("should return a not implemented error on deletion", async () => {
    try {
      await moduleToTest.delete(user.id);
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });
});
