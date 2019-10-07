import Bexio, { Scopes } from "..";
import { expect } from "chai";
import Projects from "../resources/Projects";
import { ProjectsStatic } from "../interfaces/ProjectsStatic";
import dotenv from "dotenv";

dotenv.config();

describe("Projects", function() {
  // increasing timeout to 60s
  this.timeout(60000);

  let api: Bexio;
  let moduleToTest: Projects;
  let project: ProjectsStatic.Project;
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

  it("init Projects object", () => {
    moduleToTest = new Projects(api["bexioAuth"]);
  });

  it("create new project", async () => {
    const name = `test-${Date.now()}`;
    project = await moduleToTest.create({
      contact_id: 1,
      pr_project_type_id: 1,
      pr_state_id: 1,
      user_id: 1,
      name: name
    });
    expect(project.name).to.be.eq(name);
  });

  it("list projects", async () => {
    const list = await moduleToTest.list({});
    expect(list.map(el => el.id)).includes(project.id);
  });

  it("search project", async () => {
    const searchResult = await moduleToTest.search({}, [
      {
        field: ProjectsStatic.ProjectSearchParameters.name,
        value: project.name,
        criteria: "="
      }
    ]);
    expect(searchResult.length).to.be.eq(1);
    expect(searchResult[0].id).to.be.eq(project.id);
    expect(searchResult[0].name).to.be.eq(project.name);
  });

  it("show project", async () => {
    const show = await moduleToTest.show({}, project.id);
    expect(show.id).to.be.eq(project.id);
  });

  it("overwrite project", async () => {
    const overwritten = await moduleToTest.overwrite(project.id, {
      contact_id: 1,
      pr_project_type_id: 1,
      pr_state_id: 1,
      user_id: 1,
      name: `overwritten-${Date.now()}`
    });
    expect(overwritten.name).include("overwritten-");
  });

  it("edit project", async () => {
    const edited = await moduleToTest.edit(project.id, {
      name: `edited-${Date.now()}`
    });
    expect(edited.name).include("edited-");
  });

  it("delete project", async () => {
    const result = await moduleToTest.delete(project.id);
    expect(result).to.be.true;
  });
});
