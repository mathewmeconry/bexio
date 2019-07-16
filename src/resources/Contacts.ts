import { ContactsStatic } from "./../interfaces/ContactsStatic";
import BaseCrud from "./BaseCrud";
import OAuth2 from "../libs/OAuth2";
import Scopes from "../constants/Scopes";

export default class Contacts extends BaseCrud<
  ContactsStatic.ContactSmall,
  ContactsStatic.ContactFull,
  ContactsStatic.ContactSmall,
  ContactsStatic.ContactSearchParameters,
  ContactsStatic.ContactCreate,
  ContactsStatic.ContactOverwrite
> {
  constructor(bexioAuth: OAuth2) {
    super(bexioAuth, "/contact", Scopes.CONTACT_SHOW, Scopes.CONTACT_EDIT);
  }
}
