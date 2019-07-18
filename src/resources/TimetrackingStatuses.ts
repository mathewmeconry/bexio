import BaseCrud from "./BaseCrud";
import OAuth2 from "../libs/OAuth2";
import { Scopes } from "..";
import { TimetrackingStatusesStatic } from "../interfaces/TimetrackingStatusesStatic";

export default class TimetrackingStatuses extends BaseCrud<
  TimetrackingStatusesStatic.TimetrackingStatus,
  TimetrackingStatusesStatic.TimetrackingStatus,
  TimetrackingStatusesStatic.TimetrackingStatus,
  TimetrackingStatusesStatic.TimetrackingStatusesSearchparameters,
  {},
  {}
> {
  constructor(bexioAuth: OAuth2) {
    super(
      bexioAuth,
      "/timesheet_status",
      Scopes.MONITORING_SHOW,
      Scopes.MONITORING_EDIT
    );
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<TimetrackingStatusesStatic.TimetrackingStatus>}
   * @memberof TimetrackingStatuses
   */
  public async overwrite(
    id: number,
    ressource: {}
  ): Promise<TimetrackingStatusesStatic.TimetrackingStatus> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<TimetrackingStatusesStatic.TimetrackingStatus>}
   * @memberof TimetrackingStatuses
   */
  public async edit(
    id: number,
    ressource: {}
  ): Promise<TimetrackingStatusesStatic.TimetrackingStatus> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {{}} ressource
   * @returns {Promise<TimetrackingStatusesStatic.TimetrackingStatus>}
   * @memberof TimetrackingStatuses
   */
  public async create(ressource: {}): Promise<
    TimetrackingStatusesStatic.TimetrackingStatus
  > {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof TimetrackingStatuses
   */
  public async delete(id: number): Promise<boolean> {
    throw new Error("not implemented by Bexio yet");
  }
}
