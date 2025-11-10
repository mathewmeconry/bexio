import BusinessActivities from "./resources/BusinessActivities";
import Contacts from "./resources/Contacts";
import ContactTypes from "./resources/ContactTypes";
import ContactSectors from "./resources/ContactSectors";
import ContactGroups from "./resources/ContactGroups";
import ContactRelations from "./resources/ContactRelations";
import Expenses from "./resources/Expenses";
import Bills from "./resources/Bills";
import Orders from "./resources/Orders";
import Projects from "./resources/Projects";
import ProjectStatuses from "./resources/ProjectStatuses";
import ProjectTypes from "./resources/ProjectTypes";
import Timetrackings from "./resources/Timetrackings";
import TimetrackingStatuses from "./resources/TimetrackingStatuses";
import Users from "./resources/Users";
import Items from "./resources/Items";
import Invoices from "./resources/Invoices";

export * from "./interfaces/BillsStatic";
export * from "./interfaces/BusinessActivitiesStatic";
export * from "./interfaces/CalendarStatic";
export * from "./interfaces/ContactGroupsStatic";
export * from "./interfaces/ContactRelationsStatic";
export * from "./interfaces/ContactSectorsStatic";
export * from "./interfaces/ContactTypesStatic";
export * from "./interfaces/ContactsStatic";
export * from "./interfaces/ExpensesStatic";
export * from "./interfaces/NotesStatic";
export * from "./interfaces/OrdersStatic";
export * from "./interfaces/ProjectsStatic";
export * from "./interfaces/ProjectStatusesStatic";
export * from "./interfaces/ProjectTypesStatic";
export * from "./interfaces/SalesOrderManagementStatic";
export * from "./interfaces/TimetrackingsStatic";
export * from "./interfaces/TimetrackingStatusesStatic";
export * from "./interfaces/UsersStatic";
export * from "./interfaces/ItemsStatic";
export * from "./interfaces/InvoicesStatic";
export * from "./interfaces/PositionStatic";

export default class Bexio {
  private token: string;

  // Resources
  // Business Activities
  public businessActivities: BusinessActivities;

  // Contacts
  public contacts: Contacts;
  public contactTypes: ContactTypes;
  public contactSectors: ContactSectors;
  public contactGroups: ContactGroups;
  public contactRelations: ContactRelations;

  // Sales Order Management
  public orders: Orders;
  public expenses: Expenses;
  public bills: Bills;

  // Projects
  public projects: Projects;
  public projectStatuses: ProjectStatuses;
  public projectTypes: ProjectTypes;

  // Timesheets
  public timetrackings: Timetrackings;
  public timetrackingStatuses: TimetrackingStatuses;

  // Users
  public users: Users;

  // Items & Products
  public items: Items;

  // Invoices
  public invoices: Invoices;

  constructor(token: string) {
    this.token = token;

    // Init resources
    this.businessActivities = new BusinessActivities(this.token);
    this.contacts = new Contacts(this.token);
    this.contactTypes = new ContactTypes(this.token);
    this.contactSectors = new ContactSectors(this.token);
    this.contactGroups = new ContactGroups(this.token);
    this.contactRelations = new ContactRelations(this.token);
    this.orders = new Orders(this.token);
    this.projects = new Projects(this.token);
    this.projectStatuses = new ProjectStatuses(this.token);
    this.projectTypes = new ProjectTypes(this.token);
    this.expenses = new Expenses(this.token);
    this.bills = new Bills(this.token);
    this.timetrackings = new Timetrackings(this.token);
    this.timetrackingStatuses = new TimetrackingStatuses(this.token);
    this.users = new Users(this.token);
    this.items = new Items(this.token);
    this.invoices = new Invoices(this.token);
  }
}
