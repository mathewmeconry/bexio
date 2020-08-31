import { ContactRelationsStatic } from "./../interfaces/ContactRelationsStatic";
import BaseCrud from "./BaseCrud";

export default class ContactRelations extends BaseCrud<
  ContactRelationsStatic.ContactRelation,
  ContactRelationsStatic.ContactRelation,
  ContactRelationsStatic.ContactRelation,
  ContactRelationsStatic.ContactRelationSearchParameters,
  ContactRelationsStatic.ContactRelationCreate,
  ContactRelationsStatic.ContactRelationOverwrite
> {
  constructor(apiToken: string) {
    super(apiToken, "/kb_bill");
  }
}
