
export const tagTypesShortSalesList = { shortSalesList: { type: 'ShortSalesList' as const, id: 'PARTIAL-LIST' } } as const;


export interface typeSearchFilterSales {
    ids?: string[]
    merchantId?: string,
    storeIds?: string[],
    terminalIds?: string[],
    soldAtFrom?: string,
    soldAtTo?: string,
    soldByIds?: string[],
    publicId?: string,
    receiptNumber?: number,
    totalCost?: number,
    isTest?: true,
    _or_?:  Omit<typeSearchFilterSales, '_or_' | '_not_' | '_and_'>[]
    _not_?: string
    _and_?: Omit<typeSearchFilterSales, '_or_' | '_not_' | '_and_'>[]
}

export type typeSearchSalesSortingNames = 'SOLD_AT';
