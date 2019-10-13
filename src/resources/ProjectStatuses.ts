import BaseCrud from "./BaseCrud";
import OAuth2 from "../libs/OAuth2";
import { Scopes } from "..";
import { ProjectStatusesStatic } from "../interfaces/ProjectStatusesStatic";

export default class ProjectStatuses extends BaseCrud<
  ProjectStatusesStatic.ProjectStatus,
  ProjectStatusesStatic.ProjectStatus,
  ProjectStatusesStatic.ProjectStatus,
  ProjectStatusesStatic.ProjectStatusSearchParameters,
  {},
  {}
> {
  constructor(bexioAuth: OAuth2) {
    super(
      bexioAuth,
      "/pr_project_state",
      Scopes.PROJECT_SHOW,
      Scopes.PROJECT_EDIT
    );
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<ProjectStatusesStatic.ProjectStatus>}
   * @memberof ProjectStatuses
   */
  public async overwrite(
    id: number,
    ressource: {}
  ): Promise<ProjectStatusesStatic.ProjectStatus> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<ProjectStatusesStatic.ProjectStatus>}
   * @memberof ProjectStatuses
   */
  public async edit(
    id: number,
    ressource: {}
  ): Promise<ProjectStatusesStatic.ProjectStatus> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {{}} ressource
   * @returns {Promise<ProjectStatusesStatic.ProjectStatus>}
   * @memberof ProjectStatuses
   */
  public async create(ressource: {}): Promise<
    ProjectStatusesStatic.ProjectStatus
  > {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof ProjectStatuses
   */
  public async delete(id: number): Promise<boolean> {
    throw new Error("not implemented by Bexio yet");
  }
}
