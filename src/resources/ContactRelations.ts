import { ContactRelationsStatic } from "./../interfaces/ContactRelationsStatic";
import BaseCrud from "./BaseCrud";
import OAuth2 from "../libs/OAuth2";
import Scopes from "../constants/Scopes";

export default class ContactRelations extends BaseCrud<
  ContactRelationsStatic.ContactRelation,
  ContactRelationsStatic.ContactRelation,
  ContactRelationsStatic.ContactRelation,
  ContactRelationsStatic.ContactRelationSearchParameters,
  ContactRelationsStatic.ContactRelationCreate,
  ContactRelationsStatic.ContactRelationOverwrite
> {
  constructor(bexioAuth: OAuth2) {
    super(
      bexioAuth,
      "/contact_relation",
      Scopes.CONTACT_SHOW,
      Scopes.CONTACT_EDIT
    );
  }
}
