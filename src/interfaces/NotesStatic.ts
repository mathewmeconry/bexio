export namespace NotesStatic {
    export interface Note {
        id?: number,
        user_id?: number,
        event_start?: string,
        subject?: string,
        info?: string,
        contact_id?: number,
        project_id?: number,
        entry_id?: number,
        module_id?: number,
        communication_kind_id?: number,
        pr_project_id?: number
    }

    export interface SearchParameters {
        event_start?: string,
        contact_id?: string,
        user_id?: string,
        subject?: string,
        module_id?: string,
        entry_id?: string,
        [index: string]: string | undefined
    }
}