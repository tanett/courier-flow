export interface typeZReport {
    id: string;
    createdAt: string;
    createdBy: string;
    number: number;
    openedAt: string;
    closedAt: string;
    merchantId: string;
    merchantIdentifierType: string;
    merchantIdentifierValue: string;
    receiptMerchantName: string;
    receiptAddress: string;
    storeId: string;
    storeName: string;
    terminalId: string;
    terminalSerialNumber: string;
    cashAppVersion: string;
    paymentAppVersion: string;
    userId: string;
    userFullName: string;
    salesCount: number;
    refundsCount: number;
    firstReceiptNumber: number;
    lastReceiptNumber: number;
    fiscalModuleId: string;
    totalCashIncome: number;
    totalCashlessIncome: number;
    totalVatIncome: number;
    totalCashRefunds: number;
    totalCashlessRefunds: number;
    totalRefundedVatAmount: number;
}

export interface typeSearchFilterZResponse {
    ids?: string[]
    merchantId?: string
    storeIds?: string[]
    terminalIds?: string[]
    refundedByIds?: string[]
    refundedAtFrom?: string
    refundedAtTo?: string
    receiptNumber?: number
    totalPaymentsAmount?: number
    isTest?: boolean
    _and_?: string[]
    _or_?: string[]
    _not_?: string
}

export type typeSearchZResponseSortingNames = 'OPENED_AT' | 'CLOSED_AT';
