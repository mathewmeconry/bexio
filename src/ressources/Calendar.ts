import RessourceBase, { BaseOptions } from "./RessourceBase";
import Scopes from "../constants/Scopes";
import { CalendarStatic } from "../interfaces/CalendarStatic";

export default class Calendar extends RessourceBase {
    /**
     * List all appointments
     *
     * @param {BaseOptions} options
     * @returns {Promise<CalendarStatic.Appointment>}
     * @memberof Appointments
     */
    public async listAppointments(options: BaseOptions): Promise<Array<CalendarStatic.Appointment>> {
        this.validateScope(Scopes.CALENDAR_SHOW)

        return this.request<Array<CalendarStatic.Appointment>>('GET', '/calendar', options)
    }

    /**
     * search for appointments
     *
     * @param {BaseOptions} options
     * @param {CalendarStatic.SearchParameters} searchParams
     * @returns {Promise<Array<CalendarStatic.Appointment>>}
     * @memberof Appointments
     */
    public async searchAppointments(options: BaseOptions, searchParams: CalendarStatic.SearchParameters): Promise<Array<CalendarStatic.Appointment>> {
        this.validateScope(Scopes.CALENDAR_SHOW)

        let data = []
        for (let i in searchParams) {
            if (searchParams.hasOwnProperty(i)) {
                data.push({
                    'field': i,
                    'value': searchParams[i]
                })
            }
        }

        return this.request<Array<CalendarStatic.Appointment>>('POST', '/calendar/search', options, data)
    }

    /**
     * get one specific appointment
     *
     * @param {number} appointmentId
     * @returns {Promise<CalendarStatic.Appointment>}
     * @memberof Appointments
     */
    public async showAppointment(appointmentId: number): Promise<CalendarStatic.Appointment> {
        this.validateScope(Scopes.CALENDAR_SHOW)

        return this.request<CalendarStatic.Appointment>('GET', '/calendar/' + appointmentId.toString(), {})
    }

    /**
     * Creates a new appointment
     *
     * @param {CalendarStatic.Appointment} appointment
     * @returns {Promise<CalendarStatic.Appointment>}
     * @memberof Appointments
     */
    public async createAppointment(appointment: CalendarStatic.Appointment): Promise<CalendarStatic.Appointment> {
        this.validateScope(Scopes.CALENDAR_EDIT)

        return this.request<CalendarStatic.Appointment>('POST', '/calendar', {}, appointment)
    }

    /**
     * overwrite a specific appointment
     *
     * @param {number} appointmentId
     * @param {CalendarStatic.Appointment} appointment
     * @returns {Promise<CalendarStatic.Appointment>}
     * @memberof Appointments
     */
    public async overwriteAppointment(appointmentId: number, appointment: CalendarStatic.Appointment): Promise<CalendarStatic.Appointment> {
        this.validateScope(Scopes.CALENDAR_EDIT)

        return this.request<CalendarStatic.Appointment>('PUT', '/calendar/' + appointmentId.toString(), {}, appointment)
    }

    /**
     * edit a appointment
     *
     * @param {number} appointmentId
     * @param {CalendarStatic.Appointment} appointment
     * @returns {Promise<CalendarStatic.Appointment>}
     * @memberof Appointments
     */
    public async editAppointment(appointmentId: number, appointment: CalendarStatic.Appointment): Promise<CalendarStatic.Appointment> {
        this.validateScope(Scopes.CALENDAR_EDIT)

        return this.request<CalendarStatic.Appointment>('POST', '/calendar/' + appointmentId.toString(), {}, appointment)
    }

    /**
     * delete a appointment
     *
     * @param {number} appointmentId
     * @returns {Promise<boolean>}
     * @memberof Appointments
     */
    public async deleteAppointment(appointmentId: number): Promise<boolean> {
        this.validateScope(Scopes.CALENDAR_EDIT)

        return (await this.request<{ success: boolean }>('DELETE', '/calendar/' + appointmentId.toString(), {})).success
    }
}