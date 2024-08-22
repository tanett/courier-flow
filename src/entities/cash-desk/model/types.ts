export interface typeCashDesk {
    id: string;
    createdAt: string;
    createdBy: string;
    archived: boolean;
    archivedAt: string;
    archivedBy: string;
    name: string;
    merchantId: string;
    storeId: string;
    storeName: string;
    cashDeskBalances: typeCashDeskBalance[];
}

export interface typeCashDeskBalance {
    id: string;
    createdAt: string;
    createdBy: string;
    currency: string;
    amount: number;
}

export type typeSearchFilterCashDesk = {
    ids?: string[];
    archived: boolean;
    searchText?: string;
    storeIds?: string[];
    _or_?: Omit<typeSearchFilterCashDesk, '_or_' | '_not_' | '_and_'>[]
    _not_?: string
    _and_?: Omit<typeSearchFilterCashDesk, '_or_' | '_not_' | '_and_'>[]
}

export interface typeCashDeskCreate {
    name: string;
    merchantId: string;
    storeId: string;
    cashDeskBalances?: {
        currency: string
        amount: number
    }[];
}

export interface typeCashDeskEdit {
    name: string;
    id: string;
}

export type typeSearchCashDeskSortingNames = 'NAME'
