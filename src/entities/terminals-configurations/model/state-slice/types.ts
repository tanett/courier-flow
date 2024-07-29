
export enum AVAILABLE_MODULES {
    ORDERS='ORDERS',
    CASH='CASH',
    ADVANCES='ADVANCES',
    CREDITS='CREDITS',
    E_PAYMENTS='E_PAYMENTS',
    QR_PAYMENTS='QR_PAYMENTS',
    ERP_MODE='ERP_MODE',
    MULTICURRENCY='MULTICURRENCY',
    EXTERNAL_MERCHANT_API='EXTERNAL_MERCHANT_API'
   }


export type typeAvailableModulesTerminalConfigurations = {
    name: string
    value: AVAILABLE_MODULES
    scopes: string[]
}


export interface typeTerminalConfigurationsState {
    availableModules?: typeAvailableModulesTerminalConfigurations[];
}

export type typeTerminalConfigurations = {
    id: string
    createdAt: string
    createdBy: string
    name: string
    merchantId: string
    storeIds: string[]
    terminalIds: string[]
    availableModules: typeAvailableModulesTerminalConfigurations[]
    productCategoryIds: string[]
}

export type typeCreateTerminalConfigurations = {
    name: string
    merchantId: string
    storeIds?: string[]
    terminalIds?: string[]
    productCategoryIds?: string[]
    availableModules?: string[]
}


export type typeEditTerminalConfigurations = {
    id: string
    name?: string
    storeIds?: PatchFieldEntity
    terminalIds?: PatchFieldEntity
    productCategoryIds?: PatchFieldEntity
    availableModules?: PatchFieldEntity
}

export interface PatchFieldEntity {
    values: string[]
    patchType: 'REPLACE' | 'ADD' | 'REMOVE'
}



