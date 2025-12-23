import { ContactsStatic } from "./../interfaces/ContactsStatic";
import BaseCrud from "./BaseCrud";

export default class Contacts extends BaseCrud<
  ContactsStatic.ContactSmall,
  ContactsStatic.ContactFull,
  ContactsStatic.ContactSmall,
  ContactsStatic.ContactSearchParameters,
  ContactsStatic.ContactCreate,
  ContactsStatic.ContactOverwrite
> {
  constructor(apiToken: string) {
    super(apiToken, "/2.0/contact");
  }
}
