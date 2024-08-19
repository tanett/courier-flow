
export type typeSearchFilterMerchantCurrency = {
    ids?: string[]
    _or_?:  Omit<typeSearchFilterMerchantCurrency, '_or_' | '_not_' | '_and_'>[]
    _not_?: string
    _and_?: Omit<typeSearchFilterMerchantCurrency, '_or_' | '_not_' | '_and_'>[]
}

export type typeSearchMerchantCurrencySortingNames = 'CREATED_AT';
