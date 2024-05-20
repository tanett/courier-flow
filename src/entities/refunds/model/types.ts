import { typePayment, typeSoldProduct } from 'entities/sales/model/types';

export type typeRefund = {
    id: string
    createdAt: string
    createdBy: string
    refundedAt: string
    refundedBy: string
    refundedByName: string
    saleId: string
    merchantId: string
    merchantName: string
    storeId: string
    storeName: string
    storeAddress: string
    terminalId: string
    terminalSerialNumber: string
    terminalContractCode: string
    latitude: number
    longitude: number
    cashAppVersion: string
    paymentAppVersion: string
    fiscalSign: string
    fiscalModuleId: string
    receiptNumber: number
    totalPaymentsAmount: number
    isTest: boolean
    products: typeSoldProduct[]
    payments: typePayment[]
    zreportNumber: number
    productsCount: number
    salePublicId?: string
}

