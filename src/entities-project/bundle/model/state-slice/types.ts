import { typeRetailProduct } from 'entities-project/retail-products/model/types';
import { typeUser } from 'entities-project/user-profile/model/state-slice';

export interface typeBundleState {
    bundle: typeBundle | undefined,
}

export type typeBundle = {
    terminalData: typeTerminalData
    storeData: StoreData
    merchantData: IMerchantData
    availableModules: IAvailableModule[]
    currentTime: string
}

export type typeTerminalData = {
    id: string
    model: string
    serialNumber: string
    contractCode: string
    vendor: string
    fiscalCardId: string
    label: string
    cashAppVersion: string
    paymentAppVersion: string
}

export interface StoreData {
    id: string
    name: string
    address: string
    phoneNumber: string
    email: string
    retailProducts: typeRetailProduct[]
    users: typeUser[]
}


export interface IMerchantData {
    id: string
    name: string
    address: string
    phone: string
    email: string
}

export interface IAvailableModule {
    value: string
    name: string
    scopes: string[]
}
