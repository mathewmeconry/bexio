import BaseCrud from "./BaseCrud";
import { TimetrackingsStatic } from "../interfaces/TimetrackingsStatic";

export default class Timetrackings extends BaseCrud<
  TimetrackingsStatic.TimetrackingsSmall,
  TimetrackingsStatic.TimetrackingsFull,
  TimetrackingsStatic.TimetrackingsSmall,
  TimetrackingsStatic.TimetrackingsSearchParameters,
  TimetrackingsStatic.TimetrackingsCreate,
  {}
> {
  constructor(apiToken: string) {
    super(apiToken, "/2.0/timesheet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<TimetrackingsStatic.TimetrackingsFull>}
   * @memberof Timetracking
   */
  public async overwrite(
    id: number,
    ressource: {}
  ): Promise<TimetrackingsStatic.TimetrackingsFull> {
    throw new Error("not implemented by Bexio yet");
  }
}
