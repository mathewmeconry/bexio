export namespace BankAccountsStatic {
  export interface BankAccount {
    id: number;
    name: string;
    owner: string;
    owner_address: string;
    owner_house_number: number | string;
    owner_zip: number | string;
    owner_city: string;
    owner_country_code: string;
    bc_nr: number | string;
    bank_name: string;
    bank_nr: string;
    bank_account_nr: string;
    iban_nr: string;
    currency_id: number;
    account_id: number;
    remarks: string;
    invoice_mode: string;
    qr_invoice_iban: string;
    type: string;
  }

  export interface BankAccountFull extends BankAccount {}
}
