
import { expect } from "chai";
import dotenv from "dotenv";
import { ProjectStatusesStatic } from "../interfaces/ProjectStatusesStatic";
import ProjectStatuses from "../resources/ProjectStatuses";

dotenv.config();

describe("ProjectStatuses", function() {
  // increasing timeout to 60s
  this.timeout(60000);

  
  let moduleToTest: ProjectStatuses;
  let projectStatusEntry: ProjectStatusesStatic.ProjectStatus;
  const { BEXIO_APITOKEN } = process.env;

  it("init project", () => {
    moduleToTest = new ProjectStatuses(BEXIO_APITOKEN as string);
  });

  it.skip("create new project status (not implemented by Bexio yet)", async () => {
    projectStatusEntry = await moduleToTest.create({
      name: "test"
    });
  });

  it("should return a not implemented error on creation", async () => {
    projectStatusEntry = {
      id: 1,
      name: "Offen"
    };
    try {
      await moduleToTest.create({
        name: "test"
      });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it("list project statuses", async () => {
    const list = await moduleToTest.list({});
    expect(list.map(el => el.id)).includes(projectStatusEntry.id);
  });

  // search is currently broken on bexio side
  it.skip("search project statuses", async () => {
    const searchResult = await moduleToTest.search({}, [
      {
        field: ProjectStatusesStatic.ProjectStatusSearchParameters.text,
        value: projectStatusEntry.name,
        criteria: "="
      }
    ]);
    expect(searchResult.length).to.be.greaterThan(0);
    expect(searchResult[0].id).to.be.eq(projectStatusEntry.id);
  });

  it("show project statuses", async () => {
    const showedEntry = await moduleToTest.show({}, projectStatusEntry.id);
    expect(showedEntry.name).to.be.eq(projectStatusEntry.name);
  });

  it.skip("overwrite a project status (not implemented by Bexio yet)", async () => {
    const overwritten = await moduleToTest.overwrite(
      projectStatusEntry.id,
      {
        name: "test"
      }
    );
    expect(overwritten.name).to.be.eq("test");
  });

  it("should return a not implemented error on overwrite", async () => {
    try {
      await moduleToTest.overwrite(projectStatusEntry.id, {
        name: "test"
      });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it.skip("edit project status (not implemented by Bexio yet)", async () => {
    const edited = await moduleToTest.edit(projectStatusEntry.id, {
      name: "test"
    });
    expect(edited.name).to.be.eq("test");
  });

  it("should return a not implemented error on edit", async () => {
    try {
      await moduleToTest.edit(projectStatusEntry.id, {
        name: "test"
      });
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });

  it.skip("delete project status (not implemented by Bexio yet)", async () => {
    const result = await moduleToTest.delete(projectStatusEntry.id);
    expect(result).to.be.true;
  });

  it("should return a not implemented error on deletion", async () => {
    try {
      await moduleToTest.delete(projectStatusEntry.id);
    } catch (err) {
      expect(err.message).to.be.eq("not implemented by Bexio yet");
    }
  });
});
