export namespace NotesStatic {
  export interface Note {
    id?: number;
    user_id?: number;
    event_start?: string;
    subject?: string;
    info?: string;
    contact_id?: number;
    project_id?: number;
    entry_id?: number;
    module_id?: number;
    communication_kind_id?: number;
    pr_project_id?: number;
  }

  export enum SearchParameters {
    event_start = 'event_start',
    contact_id = 'contact_id',
    user_id = 'user_id',
    subject = 'subject',
    module_id = 'module_id',
    entry_id = 'entry_id'
  }
}
