export enum blockReasons {
    MANUAL = 'MANUAL',
    CONTRACT_CODE_IS_ABSENT = 'CONTRACT_CODE_IS_ABSENT',
    TERMINAL_NOT_PAID = 'TERMINAL_NOT_PAID',
    DEPRECATED_CASH_APP_VERSION = 'DEPRECATED_CASH_APP_VERSION',
    DEPRECATED_PAYMENT_APP_VERSION = 'DEPRECATED_PAYMENT_APP_VERSION'
}

export interface typeTerminal {
    id: string;
    createdAt: string;
    createdBy: string;
    archived: boolean;
    archivedAt?: string;
    archivedBy?: string;
    model: string;
    serialNumber: string;
    vendor: string;
    merchantId: string;
    storeId?: string;
    fiscalCardId: string;
    label?: string;
    cashAppVersion?: string;
    paymentAppVersion?: string;
    blocked: boolean;
    blockReasons: blockReasons[];
    contractCode?: string;
}

export type typeTerminalExtended = typeTerminal & {
    merchantName: string;
    storeName: string;
}

export type typeTerminalWithLinkedConfiguration = typeTerminal & {linkedTerminalConfigId: string}
