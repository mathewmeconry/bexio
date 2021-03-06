import { ProjectTypesStatic } from "../interfaces/ProjectTypesStatic";
import BaseCrud from "./BaseCrud";

export default class ProjectTypes extends BaseCrud<
  ProjectTypesStatic.ProjectType,
  ProjectTypesStatic.ProjectType,
  ProjectTypesStatic.ProjectType,
  ProjectTypesStatic.ProjectTypeSearchParameters,
  {},
  ProjectTypesStatic.ProjectType
> {
  constructor(apiToken: string) {
    super(apiToken, "/pr_project_type");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {{}} ressource
   * @returns {Promise<ProjectTypesStatic.ProjectType>}
   * @memberof ProjectTypes
   */
  public async create(ressource: {}): Promise<ProjectTypesStatic.ProjectType> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<ProjectTypesStatic.ProjectType>}
   * @memberof ProjectTypes
   */
  public async edit(
    id: number,
    ressource: {}
  ): Promise<ProjectTypesStatic.ProjectType> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<ProjectTypesStatic.ProjectType>}
   * @memberof ProjectTypes
   */
  public async overwrite(
    id: number,
    ressource: {}
  ): Promise<ProjectTypesStatic.ProjectType> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof ProjectTypes
   */
  public async delete(id: number): Promise<boolean> {
    throw new Error("not implemented by Bexio yet");
  }
}
