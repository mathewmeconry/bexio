import BaseCrud from "./BaseCrud";
import {  TimetrackingsStatic } from "../interfaces/TimetrackingsStatic";
import OAuth2 from "../libs/OAuth2";
import { Scopes } from "..";

export default class Timetrackings extends BaseCrud<
  TimetrackingsStatic.TimetrackingsSmall,
  TimetrackingsStatic.TimetrackingsFull,
  TimetrackingsStatic.TimetrackingsSmall,
  TimetrackingsStatic.TimetrackingsSearchParameters,
  TimetrackingsStatic.TimetrackingsCreate,
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
   * @returns {Promise<TimetrackingsStatic.TimetrackingsFull>}
   * @memberof Timetracking
   */
  public async overwrite(id: number,ressource: {}): Promise<TimetrackingsStatic.TimetrackingsFull> {
    throw new Error("not implemented by Bexio yet");
  }
}
