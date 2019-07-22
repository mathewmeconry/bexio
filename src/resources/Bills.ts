import { BillsStatic } from "./../interfaces/BillsStatic";
import BaseCrud from "./BaseCrud";
import OAuth2 from "../libs/OAuth2";
import Scopes from "../constants/Scopes";
import { BaseStatic } from "../interfaces/BaseStatic";

export default class Bills extends BaseCrud<
  BillsStatic.Bill,
  BillsStatic.BillFull,
  BillsStatic.Bill,
  BillsStatic.SearchParameters,
  BillsStatic.BillCreate,
  BillsStatic.BillOverwrite
  > {
  constructor(bexioAuth: OAuth2) {
    super(bexioAuth, "/kb_bill", Scopes.KB_BILL_SHOW, Scopes.KB_BILL_EDIT);
  }

  /**
   * issue a bill
   *
   * @param {number} id
   * @returns {Promise<{ success: boolean }>}
   * @memberof Bills
   */
  public async issue(
    id: number
  ): Promise<{ success: boolean }> {
    this.checkScope(this.showScope);
    return this.request<{ success: boolean }>(
      "POST",
      `${this.apiEndpoint}/${id.toString()}/issue`,
      {}
    );
  }

  /**
   * revert a bill issue
   *
   * @param {number} id
   * @returns {Promise<{ success: boolean }>}
   * @memberof Bills
   */
  public async revertIssue(
    id: number
  ): Promise<{ success: boolean }> {
    this.checkScope(this.showScope);
    return this.request<{ success: boolean }>(
      "POST",
      `${this.apiEndpoint}/${id.toString()}/revert_issue`,
      {}
    );
  }
}
