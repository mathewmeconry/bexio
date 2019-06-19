import { ContactTypesStatic } from "./../interfaces/ContactTypesStatic";
import BaseCrud from "./BaseCrud";
import OAuth2 from "../libs/OAuth2";
import Scopes from "../constants/Scopes";

export default class ContactTypes extends BaseCrud<
  ContactTypesStatic.ContactType,
  ContactTypesStatic.ContactType,
  ContactTypesStatic.ContactType,
  ContactTypesStatic.ContactTypeSearchParameters,
  {}
> {
  constructor(bexioAuth: OAuth2) {
    super(bexioAuth, "/contact_type", Scopes.CONTACT_SHOW, Scopes.CONTACT_EDIT);
  }

  public create(ressource: {}): Promise<ContactTypesStatic.ContactType> {
    throw new Error("Not available on the API");
  }
}
