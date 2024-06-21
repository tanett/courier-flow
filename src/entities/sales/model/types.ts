import { typePaymentMethod } from 'app/config/payments-methods';

export type typeSale = {
    id: string
    createdAt: string
    createdBy: string
    publicId: string
    soldAt: string
    soldBy: string
    soldByName: string
    merchantId: string
    merchantName: string
    storeId: string
    storeName: string
    storeAddress: string
    terminalId: string
    terminalSerialNumber: string
    terminalContractCode: string
    terminalLabel: string
    advanceId: string
    latitude: number
    longitude: number
    cashAppVersion: string
    paymentAppVersion: string
    fiscalSign: string
    fiscalModuleId: string
    receiptNumber: number
    paymentType: 'USUAL' | 'ADVANCE' | 'CREDIT'
    orderId: string
    servicePayment: number
    totalDiscountAmount: number
    totalVatAmount: number
    totalCost: number
    totalPaymentsAmount: number
    isTest: boolean
    products: typeSoldProduct[]
    payments: typePayment[]
    zreportNumber: number
    productsCount: number
}

export type typeSoldProduct = {
    id: string
    name: string
    categoryId: string
    categoryName: string
    unit: string
    barcodes: string[]
    markedLabels: string[]
    unitPrice: number
    quantity: number
    discountAmount: number
    discountPercent: number
    totalCost: number
    vatPercent: number
    vatAmount: number
    additionalFields: typeAdditionalFields
}

export type typeAdditionalFields = Record<string, string>

export type typePayment = {
    id: string
    amount: number
    currency: string
    baseCurrencyAmount: number
    exchangeRate: number
    createdOnTerminalAt: string
    cashDeskId: string
    method: typePaymentMethod
    rrn: string
    stan: string
    transactionId: string
    epaymentSystemId: string
}

export type typeSaleShort = Omit<typeSale, 'storeAddress'
    | 'advanceId'
    | 'latitude'
    | 'longitude'
    | 'cashAppVersion'
    | 'paymentAppVersion'
    | 'fiscalSign'
    | 'fiscalModuleId'
    | 'isTest'
    | 'products'
    | 'terminalLabel'
>

export type typeSaleShortExtended = typeSaleShort & { refundsCount: number }
