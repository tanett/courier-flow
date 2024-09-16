
export type typeSearchFilterOrdersCustomer = {
    archived?: boolean,
    phones?: string[]
    emails?: string[]
    merchantIds: string[]
    ids?: string[]
    searchText?: string

    _or_?:  Omit<typeSearchFilterOrdersCustomer, '_or_' | '_not_' | '_and_'>[]
    _not_?: string
    _and_?: Omit<typeSearchFilterOrdersCustomer, '_or_' | '_not_' | '_and_'>[]
}

export type typeSearchOrdersCustomerSortingNames = 'CREATED_AT' | 'FULL_NAME';
