import { ProjectsStatic } from "../interfaces/ProjectsStatic";
import BaseCrud from "./BaseCrud";

export default class Projects extends BaseCrud<
  ProjectsStatic.Project,
  ProjectsStatic.Project,
  ProjectsStatic.Project,
  ProjectsStatic.ProjectSearchParameters,
  ProjectsStatic.ProjectCreate,
  ProjectsStatic.ProjectOverwrite
> {
  constructor(apiToken: string) {
    super(apiToken, "/2.0/pr_project");
  }
}
