export interface typeCashDesk {
    id: string
    createdAt: string
    createdBy: string
    archived: boolean
    archivedAt: string
    archivedBy: string
    name: string
    merchantId: string
    storeId: string
    storeName: string
    cashDeskBalances: typeCashDeskBalance[]
}

export interface typeCashDeskBalance {
    id: string
    createdAt: string
    createdBy: string
    currency: string
    amount: number
}

export interface typeSearchFilterCashDesk {
    ids?: string[]
    archived: boolean
    searchText?: string
    storeIds?: string[]
    _and_?: string[]
    _or_?: string[]
    _not_?: string
}

export type typeSearchCashDeskSortingNames = 'NAME'
