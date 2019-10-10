import BaseCrud from "./BaseCrud";
import OAuth2 from "../libs/OAuth2";
import { Scopes } from "..";
import { UsersStatic } from "../interfaces/UsersStatic";

export default class Users extends BaseCrud<
  UsersStatic.UserSmall,
  UsersStatic.UserFull,
  UsersStatic.UserSmall,
  UsersStatic.UsersSearchparameters,
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
   * @returns {Promise<UsersStatic.UserSmall>}
   * @memberof Users
   */
  public async overwrite(
    id: number,
    ressource: {}
  ): Promise<UsersStatic.UserSmall> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<UsersStatic.UserSmall>}
   * @memberof Users
   */
  public async edit(
    id: number,
    ressource: {}
  ): Promise<UsersStatic.UserSmall> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {{}} ressource
   * @returns {Promise<UsersStatic.UserSmall>}
   * @memberof Users
   */
  public async create(ressource: {}): Promise<
    UsersStatic.UserSmall
  > {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof Users
   */
  public async delete(id: number): Promise<boolean> {
    throw new Error("not implemented by Bexio yet");
  }
}
