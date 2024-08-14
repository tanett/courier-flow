export type cashDeskTypes = 'SALE' | 'REFUND' | 'CREDIT' | 'MANUAL_REFILL' | 'MANUAL_WRITE_OFF' | 'ENCASHMENT'

export interface typeCashDeskOperation {
    id: string
    createdAt: string
    createdBy: string
    paidAt: string
    merchantId: string
    storeId: string
    cashDeskId: string
    type: cashDeskTypes
    comment: string
    saleId: string
    refundId: string
    encashmentId: string
    creditId: string
    userId: string
    currency: string
    balanceBefore: number
    amount: number
    balanceAfter: number
    employeeName: string
}


export interface typeSearchFilterCashDeskOperations {
    ids?: string[]
    storeIds?: string[]
    cashDeskIds?: string[]
    types?: string[]
    paidAtFrom?: string
    paidAtTo?: string
    _and_?: string[]
    _or_?: string[]
    _not_?: string
}

export type typeSearchCashDeskOperationsSortingNames = 'CREATED_AT' | 'PAID_AT'
