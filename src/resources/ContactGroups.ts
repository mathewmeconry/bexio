import { ContactGroupsStatic } from "./../interfaces/ContactGroupsStatic";
import BaseCrud from "./BaseCrud";

export default class ContactGroups extends BaseCrud<
  ContactGroupsStatic.ContactGroup,
  ContactGroupsStatic.ContactGroup,
  ContactGroupsStatic.ContactGroup,
  ContactGroupsStatic.ContactGroupSearchParameters,
  ContactGroupsStatic.ContactGroupCreate,
  ContactGroupsStatic.ContactGroup
> {
  constructor(apiToken: string) {
    super(apiToken, "/2.0/contact_group");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof ContactGroups
   */
  public async delete(id: number): Promise<boolean> {
    throw new Error("not implemented by Bexio yet");
  }
}
