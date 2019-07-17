export namespace ContactRelationsStatic {
  export interface ContactRelation {
    id: number;
    contact_id: number;
    contact_sub_id: number;
    description: string;
    updated_at: string;
  }

  export interface ContactRelationOverwrite {
    contact_id: number;
    contact_sub_id: number;
    description: string;
  }

  export interface ContactRelationCreate {
    contact_id: number;
    contact_sub_id: number;
    description: string;
  }

  export enum ContactRelationSearchParameters {
    contact_id = "contact_id",
    contact_sub_id = "contact_sub_id",
    updated_at = "updated_at"
  }
}
