
export enum deviceType {
    POS_TERMINAL = 'POS_TERMINAL',
    MOBILE_PHONE = 'MOBILE_PHONE',
    COMPUTER='COMPUTER',
    TABLET='TABLET',
}

export interface typeDevice {
    id: string
    createdAt: string
    createdBy: string
    archived: boolean
    archivedAt?: string
    archivedBy?: string
    model: string
    serialNumber: string
    vendor: string
    merchantId: string
    storeId?: string
    type: deviceType
    isTest: boolean
}

export type typeDeviceExtended = typeDevice & {
    merchantName: string;
    storeName: string;
}
