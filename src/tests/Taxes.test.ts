import Taxes from '../resources/Taxes';
import BaseCrud from '../resources/BaseCrud';
import { TaxesStatic } from '../interfaces/TaxesStatic';

describe('Taxes', () => {
  let taxes: Taxes;
  let requestSpy: jest.SpyInstance;

  beforeEach(() => {
    taxes = new Taxes('test-token');
    requestSpy = jest.spyOn(BaseCrud.prototype as any, 'request').mockResolvedValue({});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should list taxes', async () => {
    const mockTaxes: TaxesStatic.Tax[] = [
      {
        id: 1,
        uuid: 'uuid-1',
        name: 'Tax 1',
        code: 'T1',
        digit: '302',
        type: 'sales_tax',
        account_id: 98,
        tax_settlement_type: 'none',
        value: 7.7,
        net_tax_value: null,
        start_year: 2017,
        end_year: 2018,
        is_active: true,
        display_name: 'Tax 1 Display',
        start_month: 1,
        end_month: 12,
      },
    ];
    requestSpy.mockResolvedValue(mockTaxes);

    const result = await taxes.list();

    expect(result).toEqual(mockTaxes);
    expect(requestSpy).toHaveBeenCalledWith('GET', '/3.0/taxes', undefined);
  });

  it('should list taxes with parameters', async () => {
    const params: TaxesStatic.TaxOptions = {
      scope: 'active',
      types: 'sales_tax',
      date: '2018-03-17',
      limit: 20,
      offset: 0
    };
    await taxes.list(params);

    expect(requestSpy).toHaveBeenCalledWith('GET', '/3.0/taxes', params);
  });

  it('should show a tax', async () => {
    const mockTax: TaxesStatic.Tax = {
      id: 1,
      uuid: 'uuid-1',
      name: 'Tax 1',
      code: 'T1',
      digit: '302',
      type: 'sales_tax',
      account_id: 98,
      tax_settlement_type: 'none',
      value: 7.7,
      net_tax_value: null,
      start_year: 2017,
      end_year: 2018,
      is_active: true,
      display_name: 'Tax 1 Display',
      start_month: 1,
      end_month: 12,
    };
    requestSpy.mockResolvedValue(mockTax);

    const result = await taxes.show(1);

    expect(result).toEqual(mockTax);
    expect(requestSpy).toHaveBeenCalledWith('GET', '/3.0/taxes/1', undefined);
  });

  it('should delete a tax', async () => {
    requestSpy.mockResolvedValue({ success: true });

    const result = await taxes.delete(1);

    expect(result).toBe(true);
    expect(requestSpy).toHaveBeenCalledWith('DELETE', '/3.0/taxes/1');
  });

  it('should throw error for unimplemented search', async () => {
    await expect(taxes.search()).rejects.toThrow('Method not implemented.');
  });

  it('should throw error for unimplemented create', async () => {
    await expect(taxes.create()).rejects.toThrow('Method not implemented.');
  });

  it('should throw error for unimplemented overwrite', async () => {
    await expect(taxes.overwrite()).rejects.toThrow('Method not implemented.');
  });

  it('should throw error for unimplemented edit', async () => {
    await expect(taxes.edit()).rejects.toThrow('Method not implemented.');
  });
});
