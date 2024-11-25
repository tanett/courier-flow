import { typeRetailProduct } from 'entities-project/retail-products/model/types';
import { typeUser } from 'entities-project/user-profile/model/state-slice';
import { deviceType } from 'entities-project/devices/model/types';

export interface typeBundleState {
    bundle: typeBundle | undefined,
}

export type typeBundle = {
    deviceData: typeDeviceData
    storeData: StoreData
    merchantData: IMerchantData
    availableModules: IAvailableModule[]
    currentTime: string
}

export type typeDeviceData = {
        id: string
        model: string
        serialNumber: string
        vendor: string
        type: deviceType
}

export interface StoreData {
    id: string
    name: string
    address: string
    phoneNumber: string
    email: string
    retailProducts: RetailProductInBundle[]
    users: typeUser[]
}

export interface RetailProductInBundle {
    id: string
    name: string
    categoryId?: string
    categoryName?: string
    unit: string
    marked: boolean
    vat: number
    barcodes?: string[]
    additionalFields?: {type: string, value: string}[]
    price: number
}


export interface IMerchantData {
    id: string
    name: string
    address: string
    phone: string
    email: string
    currencies: typeCurrencyInBundle[]
}
export type typeCurrencyInBundle = {
    currency: string,
    exchangeRate: 0
}
export interface IAvailableModule {
    value: string
    name: string
    scopes: string[]
}
