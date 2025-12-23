import { ContactSectorsStatic } from "./../interfaces/ContactSectorsStatic";
import BaseCrud from "./BaseCrud";

export default class ContactSectors extends BaseCrud<
  ContactSectorsStatic.ContactSector,
  ContactSectorsStatic.ContactSector,
  ContactSectorsStatic.ContactSector,
  ContactSectorsStatic.ContactSectorSearchParameters,
  {},
  ContactSectorsStatic.ContactSector
> {
  constructor(apiToken: string) {
    super(apiToken, "/2.0/contact_branch");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {{}} ressource
   * @returns {Promise<ContactSectorsStatic.ContactSector>}
   * @memberof ContactSectors
   */
  public async create(ressource: {}): Promise<
    ContactSectorsStatic.ContactSector
  > {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<ContactSectorsStatic.ContactSector>}
   * @memberof ContactSectors
   */
  public async edit(
    id: number,
    ressource: {}
  ): Promise<ContactSectorsStatic.ContactSector> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<ContactSectorsStatic.ContactSector>}
   * @memberof ContactSectors
   */
  public async overwrite(
    id: number,
    ressource: {}
  ): Promise<ContactSectorsStatic.ContactSector> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof ContactSectors
   */
  public async delete(id: number): Promise<boolean> {
    throw new Error("not implemented by Bexio yet");
  }
}
