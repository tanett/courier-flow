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


export type typeCreateSale = {
    publicId: string
    soldAt: string
    soldBy: string
    soldByName: string
    merchantName: string
    storeName: string
    storeAddress: string
    terminalContractCode?: string
    terminalLabel?: string
    latitude?: number
    longitude?: number
    cashAppVersion: string
    paymentAppVersion: string
    fiscalSign: string
    fiscalModuleId: string
    receiptNumber: number
    paymentType: PaymentType   //  USUAL, ADVANCE, CREDIT
    orderId: string
    advanceId?: string
    servicePayment: number
    totalCost: number
    products: Product[]
    payments: Payment[]
    zreportNumber?: number
    credit?: Credit
}

export type PaymentType =  'USUAL' | 'ADVANCE' | 'CREDIT' ;

export interface Product {
    id: string
    name: string
    categoryId?: string
    categoryName?: string
    unit: string
    barcodes?: string[]
    markedLabels?: string[]
    unitPrice: number
    quantity: number
    discountPercent: number
    discountAmount: number
    vatPercent: number
    vatAmount: number
    totalCost: number
    additionalFields: Record<string, string>
}

export interface Payment {
    amount: number
    currency: string
    baseCurrencyAmount: number
    exchangeRate: number
    createdOnTerminalAt: string
    method: 'CASH' | 'CARD' | 'QR' | 'TRANSFER' | 'E_PAYMENT_SYSTEM'
    rrn?: string
    stan?: string
    transactionId?: string
    cashDeskId?: string
    epaymentSystemId?: string
}

export interface Credit {
    createdOnTerminalAt: string
    createdOnTerminalBy: string
    terminalContractCode: string
    salePublicId: string
    payments: Payment2[]
    amount: number
    cashAppVersion: string
    paymentAppVersion: string
}

export interface Payment2 {
    amount: number
    currency: string
    createdOnTerminalAt: string
    createdOnTerminalBy: string
    terminalContractCode: string
    cashDeskId: string
    method: string
    rrn: string
    stan: string
    transactionId: string
    cashAppVersion: string
    paymentAppVersion: string
}

