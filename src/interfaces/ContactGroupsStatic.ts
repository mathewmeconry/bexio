export namespace ContactGroupsStatic {
  export interface ContactGroup {
    id: number;
    name: string;
  }

  export interface ContactGroupCreate {
    name: string;
  }

  export enum ContactGroupSearchParameters { name = 'name' }
}
