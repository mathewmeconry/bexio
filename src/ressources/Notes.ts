import { NotesStatic } from "../interfaces/NotesStatic";
import RessourceBase, { BaseOptions } from "./RessourceBase";
import Scopes from "../constants/Scopes";

export default class Notes extends RessourceBase {
    /**
     * List all notes
     *
     * @param {BaseOptions} options
     * @returns {Promise<NotesStatic.Note>}
     * @memberof Notes
     */
    public async listNotes(options: BaseOptions): Promise<Array<NotesStatic.Note>> {
        this.validateScope(Scopes.NOTE_SHOW)

        return this.request<Array<NotesStatic.Note>>('GET', '/note', options)
    }

    /**
     * search for notes
     *
     * @param {BaseOptions} options
     * @param {NotesStatic.SearchParameters} searchParams
     * @returns {Promise<Array<NotesStatic.Note>>}
     * @memberof Notes
     */
    public async searchNotes(options: BaseOptions, searchParams: NotesStatic.SearchParameters): Promise<Array<NotesStatic.Note>> {
        this.validateScope(Scopes.NOTE_SHOW)

        let data = []
        for (let i in searchParams) {
            if (searchParams.hasOwnProperty(i)) {
                data.push({
                    'field': i,
                    'value': searchParams[i]
                })
            }
        }

        return this.request<Array<NotesStatic.Note>>('POST', '/note/search', options, data)
    }

    /**
     * get one specific note
     *
     * @param {number} noteId
     * @returns {Promise<NotesStatic.Note>}
     * @memberof Notes
     */
    public async showNote(noteId: number): Promise<NotesStatic.Note> {
        this.validateScope(Scopes.NOTE_SHOW)

        return this.request<NotesStatic.Note>('GET', '/note/' + noteId.toString(), {})
    }

    /**
     * Creates a new note
     *
     * @param {NotesStatic.Note} note
     * @returns {Promise<NotesStatic.Note>}
     * @memberof Notes
     */
    public async createNote(note: NotesStatic.Note): Promise<NotesStatic.Note> {
        this.validateScope(Scopes.NOTE_EDIT)

        return this.request<NotesStatic.Note>('POST', '/note', {}, note)
    }

    /**
     * overwrite a specific note
     *
     * @param {number} noteId
     * @param {NotesStatic.Note} note
     * @returns {Promise<NotesStatic.Note>}
     * @memberof Notes
     */
    public async overwriteNote(noteId: number, note: NotesStatic.Note): Promise<NotesStatic.Note> {
        this.validateScope(Scopes.NOTE_EDIT)

        return this.request<NotesStatic.Note>('PUT', '/note/' + noteId.toString(), {}, note)
    }

    /**
     * edit a note
     *
     * @param {number} noteId
     * @param {NotesStatic.Note} note
     * @returns {Promise<NotesStatic.Note>}
     * @memberof Notes
     */
    public async editNote(noteId: number, note: NotesStatic.Note): Promise<NotesStatic.Note> {
        this.validateScope(Scopes.NOTE_EDIT)

        return this.request<NotesStatic.Note>('POST', '/note/' + noteId.toString(), {}, note)
    }

    /**
     * delete a note
     *
     * @param {number} noteId
     * @returns {Promise<boolean>}
     * @memberof Notes
     */
    public async deleteNote(noteId: number): Promise<boolean> {
        this.validateScope(Scopes.NOTE_EDIT)

        return (await this.request<{ success: boolean }>('DELETE', '/note/' + noteId.toString(), {})).success
    }
}