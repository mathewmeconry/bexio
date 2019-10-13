import { ProjectsStatic } from "../interfaces/ProjectsStatic";
import BaseCrud from "./BaseCrud";
import OAuth2 from "../libs/OAuth2";
import Scopes from "../constants/Scopes";

export default class Projects extends BaseCrud<
  ProjectsStatic.Project,
  ProjectsStatic.Project,
  ProjectsStatic.Project,
  ProjectsStatic.ProjectSearchParameters,
  ProjectsStatic.ProjectCreate,
  ProjectsStatic.ProjectOverwrite
> {
  constructor(bexioAuth: OAuth2) {
    super(bexioAuth, "/pr_project", Scopes.PROJECT_SHOW, Scopes.PROJECT_EDIT);
  }
}
