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

  export enum SearchParameters {
    event_start = 'event_start',
    event_end = 'event_end',
    contact_id = 'contact_id',
    user_id = 'user_id',
    subject = 'subject',
    place = 'place',
    module_id = 'module_id',
    entry_id = 'entry_id'
  }
}
