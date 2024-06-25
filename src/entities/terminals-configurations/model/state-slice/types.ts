
export enum AVAILABLE_MODULES {
    FISCAL = 'availableModule.fiscal',
    CREDIT_PREPAYMENT = 'availableModule.creditPrepayment',
    PAYMENT_BY_CARD =  'availableModule.paymentByCard',
    ONLINE_PAYMENT = 'availableModule.onlinePayment',
   }


export type typeAvailableModulesTerminalConfigurations = {
    name: string
    code: AVAILABLE_MODULES
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



