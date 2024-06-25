
export const tagTypesShortAdvancesList = { shortAdvancesList: { type: 'ShortAdvancesList' as const, id: 'PARTIAL-LIST' } } as const;


export interface typeSearchFilterAdvances {
    ids?: string[]
    merchantId?: string,
    storeIds?: string[],
    terminalIds?: string[],
    createdOnTerminalByIds?: string[],
    createdOnTerminalAtFrom?: string,
    createdOnTerminalAtTo?: string,
    saleCreated?: boolean,
    publicId?: string,
    totalPaidAmount?: number,
    _or_?:  Omit<typeSearchFilterAdvances, '_or_' | '_not_' | '_and_'>[]
    _not_?: string
    _and_?: Omit<typeSearchFilterAdvances, '_or_' | '_not_' | '_and_'>[]
}

export type typeSearchAdvancesSortingNames = 'CREATED_ON_TERMINAL_AT' | 'AMOUNT'
