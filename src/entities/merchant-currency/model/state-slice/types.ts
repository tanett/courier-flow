export type typeMerchantCurrency = {
    id: string
    createdAt: string
    createdBy: string
    merchantId: string
    currency: string
    rateDefinition: string
    customExchangeRate: number
    systemExchangeRate: number
}

export type typeMerchantCurrencyState = {
    baseCurrency?: string
    currencyList: string[]
}
