
export const tagTypesRefundsList = { refundsList: { type: 'RefundsList' as const, id: 'PARTIAL-LIST' } } as const;


export interface typeSearchFilterRefunds {
    ids?: string[]
    merchantId?: string,
    storeIds?: string[],
    terminalIds?: string[],
    refundedAtFrom?: string,
    refundedAtTo?: string,
    receiptNumber?: number
    totalPaymentsAmount?: number
    isTest?: true,
    _or_?: string[]
    _not_?: string
    _and_?: string[]
}

export type typeSearchRefundsSortingNames = 'REFUNDED_AT';
