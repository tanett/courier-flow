
export const tagTypesCreditsList = { creditsList: { type: 'CreditsList' as const, id: 'PARTIAL-LIST' } } as const;


export interface typeSearchFilterCredits {
    ids?: string[]
    merchantId?: string,
    storeIds?: string[],
    terminalIds?: string[],
    createdOnTerminalByIds?: string[],
    createdOnTerminalAtFrom?: string,
    createdOnTerminalAtTo?: string,
    saleId?: string,
    salePublicId?: string,
    amount?: number,
    status?: typePaymentStatus
    _or_?:  Omit<typeSearchFilterCredits, '_or_' | '_not_' | '_and_'>[]
    _not_?: string
    _and_?: Omit<typeSearchFilterCredits, '_or_' | '_not_' | '_and_'>[]
}

export type typeSearchCreditsSortingNames = CREDITS_SORTING_NAME

export enum CREDITS_SORTING_NAME {
    CREATED_ON_TERMINAL_AT='CREATED_ON_TERMINAL_AT',
    AMOUNT='AMOUNT',
    NOT_PAID_AMOUNT = 'NOT_PAID_AMOUNT'

}

export type typePaymentStatus = 'PAID' | 'NOT_PAID'
