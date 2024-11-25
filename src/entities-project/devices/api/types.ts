import { typeDevice } from '../model/types';

export type typeSearchDevicesFilter = {
    ids?: string[]
    archived: boolean
    searchText?: string
    storeIds?: string[]
    merchantIds?: string[]
    models?: string[]
    serialNumbers?: string[]
    vendors?: string[]
    isTest?: boolean
    _and_?: string[]
    _or_?: string[]
    _not_?: string[]
}

export type typeSearchDevicesSortingNames = 'CREATED_AT'

export type typeCreateDeviceRequest = Pick<typeDevice, 'vendor' | 'model' | 'merchantId' | 'serialNumber' | 'storeId' | 'type'>

export type typeEditDeviceRequest = Pick<typeDevice, 'id'> & Partial<Pick<typeDevice, 'storeId'>>

export const tagTypesDevicesList = { devicesList: { type: 'DevicesList' as const, id: 'PARTIAL-LIST' } } as const;
