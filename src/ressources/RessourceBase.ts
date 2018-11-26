import OAuth2 from "../libs/OAuth2";
import request from 'request-promise-native'
import Scopes from "../constants/Scopes";

export interface BaseOptions {
    limit?: number,
    offset?: number,
    order_by?: string,
    [index: string]: any
}


export default abstract class RessourceBase {
    private bexioAuth: OAuth2
    private scopes: Array<Scopes>

    constructor(bexioAuth: OAuth2, scopes: Array<Scopes>) {
        this.bexioAuth = bexioAuth
        this.scopes = scopes
    }

    /**
     * Base request to the api
     *
     * @protected
     * @template T
     * @param {string} method
     * @param {string} path
     * @param {BaseOptions} options
     * @param {*} [data]
     * @returns {Promise<T>}
     * @memberof Bexio
     */
    protected async request<T>(method: string, path: string, options: BaseOptions, data?: any): Promise<T> {
        let requestOptions = {
            method: method,
            url: this.bexioAuth.getApiUrl() + path + '?' + this.optionsToQuery(options),
            json: true,
            headers: {
                'Authorization': await this.bexioAuth.getBearerHeader()
            }
        }

        if (data) {
            //@ts-ignore
            requestOptions.body = data
        }
        return await request(requestOptions)
    }

    /**
     * Generates the querystring out of the options
     *
     * @protected
     * @param {BaseOptions} options
     * @returns {string}
     * @memberof Bexio
     */
    protected optionsToQuery(options: BaseOptions): string {
        let str = []

        for (let i in options) {
            if (options.hasOwnProperty(i)) {
                str.push(encodeURIComponent(i) + '=' + encodeURIComponent(options[i]))
            }
        }

        return str.join('&')
    }

    /**
     * Validates if the needed scope is availabe in this access token
     *
     * @protected
     * @param {Scopes} neededScope
     * @memberof Bexio
     */
    protected validateScope(neededScope: Scopes): void {
        if (this.scopes.indexOf(neededScope) < 0) {
            throw new Error(neededScope + ' not in available scopes')
        }
    }
}