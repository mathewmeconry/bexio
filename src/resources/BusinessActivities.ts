import { BusinessActivitiesStatic } from "../interfaces/BusinessActivitiesStatic";
import BaseCrud from "./BaseCrud";
import OAuth2 from "../libs/OAuth2";
import Scopes from "../constants/Scopes";

export default class ClientServices extends BaseCrud<
  BusinessActivitiesStatic.BusinessActivity,
  BusinessActivitiesStatic.BusinessActivity,
  BusinessActivitiesStatic.BusinessActivity,
  BusinessActivitiesStatic.BusinessActivitySearchParameters,
  BusinessActivitiesStatic.BusinessActivityCreate,
  BusinessActivitiesStatic.BusinessActivityOverwrite
> {
  constructor(bexioAuth: OAuth2) {
    super(bexioAuth, "/client_service", Scopes.GENERAL, Scopes.GENERAL);
  }
}
