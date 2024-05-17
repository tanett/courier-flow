
export const tagTypesRefundsList = { refundsList: { type: 'RefundsList' as const, id: 'PARTIAL-LIST' } } as const;


export interface typeSearchFilterRefunds {
    ids?: string[]
    merchantId?: string,
    storeIds?: string[],
    terminalIds?: string[],
    refundedAtFrom?: string,
    refundedAtTo?: string,
    isTest?: true,
    _or_?:  Omit<typeSearchFilterRefunds, '_or_' | '_not_' | '_and_'>[]
    _not_?: string
    _and_?: Omit<typeSearchFilterRefunds, '_or_' | '_not_' | '_and_'>[]
}

export type typeSearchRefundsSortingNames = 'REFUNDED_AT';
