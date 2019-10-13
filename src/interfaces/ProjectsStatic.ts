export namespace ProjectsStatic {
  export interface Project {
    id: number;
    nr: string;
    name: string;
    start_date?: string;
    end_date?: string;
    comment: string;
    pr_state_id: number;
    pr_project_type_id: number;
    contact_id: number;
    contact_sub_id?: number;
    pr_invoice_type_id?: number;
    pr_invoice_type_amount: number;
    pr_budget_type_id?: number;
    pr_budget_type_amount: number;
  }

  export interface ProjectCreate {
    contact_id: number;
    name: string;
    pr_project_type_id: number;
    pr_state_id: number;
    user_id: number;
    comment?: string;
    contact_sub_id?: number;
    end_date?: string;
    pr_budget_type_amount?: number;
    pr_budget_type_id?: number;
    pr_invoice_type_amount?: number;
    pr_invoice_type_id?: number;
    pr_sub_state_id?: number;
    start_date?: string;
  }

  export interface ProjectOverwrite {
    contact_id: number;
    name: string;
    pr_project_type_id: number;
    pr_state_id: number;
    user_id: number;
    comment?: string;
    contact_sub_id?: number;
    end_date?: string;
    pr_budget_type_amount?: number;
    pr_budget_type_id?: number;
    pr_invoice_type_amount?: number;
    pr_invoice_type_id?: number;
    pr_sub_state_id?: number;
    start_date?: string;
  }

  export enum ProjectSearchParameters {
    name = "name",
    contact_id = "contact_id",
    pr_state_id = "pr_state_id",
  }
}
