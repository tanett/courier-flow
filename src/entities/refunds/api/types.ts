export interface typeSearchFilterRefunds {
    ids?: string[]
    merchantId?: string,
    storeIds?: string[],
    terminalIds?: string[],
    refundedAtFrom?: string,
    refundedAtTo?: string,
    isTest?: true,
    _or_?: string[]
    _not_?: string
    _and_?: string[]
}

export type typeSearchRefundsSortingNames = 'REFUNDED_AT';
