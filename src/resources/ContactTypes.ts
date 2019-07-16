import { ContactTypesStatic } from "./../interfaces/ContactTypesStatic";
import BaseCrud from "./BaseCrud";
import OAuth2 from "../libs/OAuth2";
import Scopes from "../constants/Scopes";

export default class ContactTypes extends BaseCrud<
  ContactTypesStatic.ContactType,
  ContactTypesStatic.ContactType,
  ContactTypesStatic.ContactType,
  ContactTypesStatic.ContactTypeSearchParameters,
  {},
  ContactTypesStatic.ContactType
> {
  constructor(bexioAuth: OAuth2) {
    super(bexioAuth, "/contact_type", Scopes.CONTACT_SHOW, Scopes.CONTACT_EDIT);
  }


  /**
   * Not implemented by Bexio yet
   *
   * @param {{}} ressource
   * @returns {Promise<ContactTypesStatic.ContactSector>}
   * @memberof ContactTypes
   */
  public async create(ressource: {}): Promise<ContactTypesStatic.ContactType> {
    throw new Error('not implemented by Bexio yet')
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<ContactTypesStatic.ContactSector>}
   * @memberof ContactTypes
   */
  public async edit(id: number, ressource: {}): Promise<ContactTypesStatic.ContactType> {
    throw new Error('not implemented by Bexio yet')
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @param {{}} ressource
   * @returns {Promise<ContactTypesStatic.ContactSector>}
   * @memberof ContactTypes
   */
  public async overwrite(id: number, ressource: {}): Promise<ContactTypesStatic.ContactType> {
    throw new Error('not implemented by Bexio yet')
  }

  /**
   * Not implemented by Bexio yet
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof ContactTypes
   */
  public async delete(id: number): Promise<boolean> {
    throw new Error('not implemented by Bexio yet')
  }
}
