export namespace TimetrackingsStatic {
  export interface TimetrackingsSmall {
    id: number;
    user_id: number;
    status_id?: number;
    client_service_id: number;
    text: string;
    allowable_bill: true;
    charge?: boolean;
    contact_id?: number;
    sub_contact_id?: number;
    pr_project_id?: number;
    pr_package_id?: number;
    pr_milestone_id?: number;
    travel_time?: number;
    travel_charge?: boolean;
    travel_distance?: number;
    estimated_time?: number;
    date: string;
    duration: string;
    running: boolean;
  }

  export enum TimetrackingsSearchParameters {
    id = "id",
    client_service_id = "client_service_id",
    contact_id = "contact_id",
    user_id = "user_id",
    pr_project_id = "pr_project_id",
    status_id = "status_id"
  }

  export interface TimetrackingsFull extends TimetrackingsSmall {
    tracking: TimetrackingsTrackingRecord;
  }

  export interface TimetrackingsTrackingRecord {
    type: "duration" | "range";
    date: string;
    duration: string;
  }

  export interface TimetrackingsCreate {
    user_id: number;
    client_service_id: number;
    allowable_bill: boolean;
    tracking: TimetrackingsTrackingRecord;
    charge?: boolean;
    contact_id?: number;
    estimated_time?: string;
    pr_project_id?: number;
    pr_package_id?: number;
    pr_milestone_id?: number;
    status_id?: number;
    sub_contact_id?: number;
    text?: string;
  }

  export interface TimetrackingsEdit {
    allowable_bill?: boolean;
    charge?: number;
    client_service_id?: number;
    contact_id?: number;
    estimated_time?: string;
    pr_milestone_id?: number;
    pr_package_id?: number;
    pr_project_id?: number;
    status_id?: number;
    sub_contact_id?: number;
    text?: string;
    tracking?: TimetrackingsTrackingRecord
    user_id?: number;
  }
}
