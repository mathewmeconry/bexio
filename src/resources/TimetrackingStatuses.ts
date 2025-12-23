import BaseCrud from "./BaseCrud";
import { TimetrackingStatusesStatic } from "../interfaces/TimetrackingStatusesStatic";

export default class TimetrackingStatuses extends BaseCrud<
  TimetrackingStatusesStatic.TimetrackingStatus,
  TimetrackingStatusesStatic.TimetrackingStatus,
  TimetrackingStatusesStatic.TimetrackingStatus,
  TimetrackingStatusesStatic.TimetrackingStatusesSearchparameters,
  {},
  {}
> {
  constructor(apiToken: string) {
    super(apiToken, "/2.0/timesheet_status");
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
