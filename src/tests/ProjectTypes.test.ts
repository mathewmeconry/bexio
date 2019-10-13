import Bexio, { Scopes } from "..";
import { expect } from "chai";
import ProjectTypes from "../resources/ProjectTypes";
import { ProjectTypesStatic } from "../interfaces/ProjectTypesStatic";
import dotenv from "dotenv";

dotenv.config();

describe("ProjectTypes", function() {
  // increasing timeout to 60s
  this.timeout(60000);

  let api: Bexio;
  let moduleToTest: ProjectTypes;
  let projectType: ProjectTypesStatic.ProjectType = { id: 1, name: "Internes Projekt" };
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
      [Scopes.PROJECT_SHOW, Scopes.PROJECT_EDIT]
    );
    await api.fakeLogin(BEXIO_USERNAME, BEXIO_PASSWORD);
  });

  it("init ProjectTypes object", () => {
    moduleToTest = new ProjectTypes(api["bexioAuth"]);
  });

  it.skip("create new project type (not implemented by Bexio yet)", async () => {
    projectType = await moduleToTest.create({ name: `type-${Date.now()}` });
    expect(projectType.name).include("type-");
  });

  it("should return a not implemented error on creation", async () => {
    try {
      projectType = await moduleToTest.create({ name: `type-${Date.now()}` });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it("list project types", async () => {
    const list = await moduleToTest.list({});
    expect(list.map(el => el.id)).includes(projectType.id);
  });

  // search is currently broken on bexio side
  it.skip("search project type", async () => {
    const searchResult = await moduleToTest.search({}, [
      {
        field: ProjectTypesStatic.ProjectTypeSearchParameters.project_type,
        value: projectType.name,
        criteria: "="
      }
    ]);
    expect(searchResult.length).to.be.eq(1);
    expect(searchResult[0].id).to.be.eq(projectType.id);
  });

  it("show project type", async () => {
    const show = await moduleToTest.show({}, projectType.id);
    expect(show.id).to.be.eq(projectType.id);
    expect(show.name).to.be.eq(projectType.name);
  });

  it.skip("overwrite project type (not implemented by Bexio yet)", async () => {
    const overwritten = await moduleToTest.overwrite(projectType.id, {
      name: `overwritten-${Date.now()}`,
      id: 1
    });
    expect(overwritten.name).include("overwritten");
  });

  it("should return a not implemented error on overwrite", async () => {
    try {
      const overwritten = await moduleToTest.overwrite(projectType.id, {
        name: `overwritten-${Date.now()}`,
        id: 1
      });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it.skip("edit project type (not implemented by Bexio yet)", async () => {
    const edited = await moduleToTest.edit(projectType.id, {
      name: `edited-${Date.now()}`
    });
    expect(edited.name).include("edited-");
  });

  it("should return a not implemented error on edit", async () => {
    try {
      const edited = await moduleToTest.edit(projectType.id, {
        name: `edited-${Date.now()}`
      });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it.skip("delete project type (not implemented by Bexio yet)", async () => {
    const result = await moduleToTest.delete(projectType.id);
    expect(result).to.be.true;
  });

  it("should return a not implemented error on delete", async () => {
    try {
      const result = await moduleToTest.delete(projectType.id);
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });
});
