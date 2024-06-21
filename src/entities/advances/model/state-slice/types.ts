import { typePaymentMethod } from 'app/config/payments-methods';

export type typeAdvance = {
    id: string
    createdAt: string
    createdBy: string
    publicId: string
    createdOnTerminalAt: string
    createdOnTerminalBy: string
    merchantId: string
    storeId: string
    terminalId: string
    terminalSerialNumber: string
    terminalContractCode: string
    cashAppVersion: string
    paymentAppVersion: string
    orderId: string
    saleCreated: boolean
    servicePayment: number
    discountAmount: number
    totalVatAmount: number
    totalCost: number
    products: typeAdvanceProduct[]
    productCount: number
    payments: typePaymentAdvance[]
    totalPaidAmount: number
}

export type typeAdvanceProduct = {
    id: string
    name: string
    categoryId: string
    unit: string
    barcodes: string[]
    markedLabels: string[]
    priceInStore: number
    quantity: number
    discountAmount: number
    totalCost: number
    vatPercent: number
    vatAmount: number
    additionalFields: typeAdditionalFields
}

export type typeAdditionalFields = Record<string, string>

export interface typePaymentAdvance {
    id: string
    amount: number
    currency: string
    createdOnTerminalAt: string
    createdOnTerminalBy: string
    terminalId: string
    terminalSerialNumber: string
    terminalContractCode: string
    merchantId: string
    storeId: string
    cashDeskId: string
    method: typePaymentMethod
    rrn: string
    stan: string
    transactionId: string
    cashAppVersion: string
    paymentAppVersion: string
}

export type typeAdvanceShort = Omit<typeAdvance, 'cashAppVersion' | 'paymentAppVersion' | 'products'>

export type typeSoldProductsDetailsState = {
    soldProduct?: typeAdvanceProduct
}
