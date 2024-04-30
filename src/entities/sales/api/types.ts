
export const tagTypesShortSalesList = { shortSalesList: { type: 'ShortSalesList' as const, id: 'PARTIAL-LIST' } } as const;


export interface typeSearchFilterSales {
    ids?: string[]
    merchantId?: string,
    storeIds?: string[],
    terminalIds?: string[],
    soldAtFrom?: string,
    soldAtTo?: string,
    publicId?: string,
    isTest?: true,
    _or_?: string[]
    _not_?: string
    _and_?: string[]
}

export type typeSearchSalesSortingNames = 'SOLD_AT';
