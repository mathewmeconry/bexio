import { ContactGroupsStatic } from "./../interfaces/ContactGroupsStatic";
import BaseCrud from "./BaseCrud";
import OAuth2 from "../libs/OAuth2";
import Scopes from "../constants/Scopes";

export default class ContactGroups extends BaseCrud<
  ContactGroupsStatic.ContactGroup,
  ContactGroupsStatic.ContactGroup,
  ContactGroupsStatic.ContactGroup,
  ContactGroupsStatic.ContactGroupSearchParameters
> {
  constructor(bexioAuth: OAuth2) {
    super(
      bexioAuth,
      "/contact_group",
      Scopes.CONTACT_SHOW,
      Scopes.CONTACT_EDIT
    );
  }
}
