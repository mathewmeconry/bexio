import { BusinessActivitiesStatic } from "../interfaces/BusinessActivitiesStatic";
import BaseCrud from "./BaseCrud";

export default class ClientServices extends BaseCrud<
  BusinessActivitiesStatic.BusinessActivity,
  BusinessActivitiesStatic.BusinessActivity,
  BusinessActivitiesStatic.BusinessActivity,
  BusinessActivitiesStatic.BusinessActivitySearchParameters,
  BusinessActivitiesStatic.BusinessActivityCreate,
  BusinessActivitiesStatic.BusinessActivityOverwrite
> {
  constructor(apiToken: string) {
    super(apiToken, "/client_service");
  }
}
