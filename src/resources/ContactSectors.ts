import { ContactSectorsStatic } from "./../interfaces/ContactSectorsStatic";
import BaseCrud from "./BaseCrud";
import OAuth2 from "../libs/OAuth2";
import Scopes from "../constants/Scopes";

export default class ContactSectors extends BaseCrud<
  ContactSectorsStatic.ContactSector,
  ContactSectorsStatic.ContactSector,
  ContactSectorsStatic.ContactSector,
  ContactSectorsStatic.ContactSectorSearchParameters,
  {}
> {
  constructor(bexioAuth: OAuth2) {
    super(
      bexioAuth,
      "/contact_branch",
      Scopes.CONTACT_SHOW,
      Scopes.CONTACT_EDIT
    );
  }

  public create(ressource: {}): Promise<ContactSectorsStatic.ContactSector> {
    throw new Error("Not available on the API");
  }
}
