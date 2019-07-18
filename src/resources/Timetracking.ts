import BaseCrud from "./BaseCrud";
import { TimetrackingStatic } from "../interfaces/TimetrackingStatic";
import OAuth2 from "../libs/OAuth2";
import { Scopes } from "..";

export default class Timetracking extends BaseCrud<
  TimetrackingStatic.TimetrackingSmall,
  TimetrackingStatic.TimetrackingFull,
  TimetrackingStatic.TimetrackingSmall,
  TimetrackingStatic.TimetrackingSearchParameters,
  TimetrackingStatic.TimetrackingCreate,
  {}
> {
  constructor(bexioAuth: OAuth2) {
    super(
      bexioAuth,
      "/timesheet",
      Scopes.MONITORING_SHOW,
      Scopes.MONITORING_EDIT
    );
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<TimetrackingStatic.TimetrackingFull>}
   * @memberof Timetracking
   */
  public async overwrite(id: number,ressource: {}): Promise<TimetrackingStatic.TimetrackingFull> {
    throw new Error("not implemented by Bexio yet");
  }
}
