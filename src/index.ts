import Scopes from './constants/Scopes'
import OAuth2, { AuthorizationResponse } from './libs/OAuth2'
import Contacts from "./ressources/Contacts";
import Notes from "./ressources/Notes";
import { ContactsStatic } from './interfaces/ContactsStatic';
import { NotesStatic } from './interfaces/NotesStatic';
import Calendar from './ressources/Calendar';

export { ContactsStatic, NotesStatic, Scopes }

export default class Bexio {
    private clientId: string
    private clientSecret: string
    private redirectUri: string
    private scopes: Array<Scopes>

    private bexioAuth: OAuth2

    // Ressources
    public contacts: Contacts
    public notes: Notes
    public calendar: Calendar

    constructor(clientId: string, clientSecret: string, redirectUri: string, scopes: Array<Scopes>) {
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.redirectUri = redirectUri
        this.scopes = scopes

        // add general scope to the request list
        this.scopes.push(Scopes.GENERAL)

        this.bexioAuth = new OAuth2(this.clientId, this.clientSecret, this.redirectUri, this.scopes)

        // Init ressources
        this.contacts = new Contacts(this.bexioAuth, this.scopes)
        this.notes = new Notes(this.bexioAuth, this.scopes)
        this.calendar = new Calendar(this.bexioAuth, this.scopes)
    }

    /**
     * Returns the authorization uri for starting the oauth2 flow
     *
     * @returns {string}
     * @memberof Bexio
     */
    public getAuthUrl(): string {
        return this.bexioAuth.getAuthorizationUrl();
    }

    /*generate
     *generaterl
     *generate
     * @param {AuthorizationResponse} query
     * @returns {Promise<void>}
     * @memberof Bexio
     */
    public async generateAccessToken(query: AuthorizationResponse): Promise<void> {
        await this.bexioAuth.generateAccessToken(query)
    }
}
