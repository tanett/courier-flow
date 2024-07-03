import { typePaymentAdvance } from '../../advances/model/state-slice';

export type typeCredit= {
    id: string
    createdAt: string
    createdBy: string
    createdOnTerminalAt: string
    createdOnTerminalBy: string
    merchantId: string
    storeId: string
    terminalId: string
    terminalSerialNumber: string
    terminalContractCode: string
    saleId: string
    salePublicId: string
    payments: typePaymentCredit[]
    amount: number
    paidAmount: number
    notPaidAmount: number
    status: 'PAID' | 'NOT_PAID'
    cashAppVersion: string
    paymentAppVersion: string
}

export type typePaymentCredit = typePaymentAdvance

export type typeCreditExtended = typeCredit & {storeName: string}
