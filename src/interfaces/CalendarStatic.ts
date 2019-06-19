export namespace CalendarStatic {
  export interface Appointment {
    id: number;
    user_id: number;
    event_start: string;
    event_end: string;
    subject: string;
    place: string;
    info: null;
    contact_id: number;
    sub_contact_id: number;
    project_id: number;
    entry_id: number;
    module_id: number;
    has_reminder: boolean;
    remember_type_id: number;
    remember_time_id: number;
    is_private: boolean;
  }

  export interface SearchParameters {
    event_start?: string;
    event_end?: string;
    contact_id?: string;
    user_id?: string;
    subject?: string;
    place?: string;
    module_id?: string;
    entry_id?: string;
    [index: string]: string | undefined;
  }
}
