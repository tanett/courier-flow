export interface typeEncashment {
    id: string
    createdAt: string
    createdBy: string
    encashedAt: string
    merchantId: string
    terminalSerialNumber: string
    terminalId: string
    storeId: string
    storeName: string
    cashDeskId: string
    cashDeskName: string
    createdByName: string
    currency: string
    balanceBefore: number
    amount: number
    balanceAfter: number
}


export interface typeSearchFilterEncashment {
    ids?: string[]
    searchText?: string
    storeIds?: string[]
    cashDeskIds?: string[]
    encashedAtFrom?: string
    encashedAtTo?: string
    _and_?: string[]
    _or_?: string[]
    _not_?: string
}

export type typeSearchEncashmentSortingNames = 'CREATED_AT' | 'ENCASHED_AT'
