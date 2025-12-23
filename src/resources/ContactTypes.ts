import { ContactTypesStatic } from "./../interfaces/ContactTypesStatic";
import BaseCrud from "./BaseCrud";

export default class ContactTypes extends BaseCrud<
  ContactTypesStatic.ContactType,
  ContactTypesStatic.ContactType,
  ContactTypesStatic.ContactType,
  ContactTypesStatic.ContactTypeSearchParameters,
  {},
  ContactTypesStatic.ContactType
> {
  constructor(apiToken: string) {
    super(apiToken, "/2.0/contact_type");
  }
  /**
   * Not implemented by Bexio yet
   *
   * @param {{}} ressource
   * @returns {Promise<ContactTypesStatic.ContactSector>}
   * @memberof ContactTypes
   */
  public async create(ressource: {}): Promise<ContactTypesStatic.ContactType> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<ContactTypesStatic.ContactSector>}
   * @memberof ContactTypes
   */
  public async edit(
    id: number,
    ressource: {}
  ): Promise<ContactTypesStatic.ContactType> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<ContactTypesStatic.ContactSector>}
   * @memberof ContactTypes
   */
  public async overwrite(
    id: number,
    ressource: {}
  ): Promise<ContactTypesStatic.ContactType> {
    throw new Error("not implemented by Bexio yet");
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof ContactTypes
   */
  public async delete(id: number): Promise<boolean> {
    throw new Error("not implemented by Bexio yet");
  }
}
