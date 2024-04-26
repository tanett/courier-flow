import { blockReasons, typeTerminal } from '../model/types';

export const tagTypesTerminalsExtendedList = { terminalExtendedList: { type: 'TerminalExtendedList' as const, id: 'PARTIAL-LIST' } } as const;


export type typeSearchTerminalsFilter = {
    ids?: string[]
    archived: boolean
    searchText?: string
    storeIds?: string
    models?: string[]
    serialNumbers?: string[]
    vendors?: string[]
    fiscalCardIds?: string[]
    blocked?: boolean
    blockReasons?: blockReasons[]
    _and_?: string[]
    _or_?: string[]
    _not_?: string[]
}

export type typeSearchTerminalsExtendedFilter = typeSearchTerminalsFilter & {
    merchantIds?: string[]
}

export type typeSearchTerminalSortingNames = 'CREATED_AT'

export type typeCreateTerminalRequest = Pick<typeTerminal, 'vendor' | 'model' | 'merchantId' | 'serialNumber' | 'fiscalCardId' | 'label' | 'storeId'>

export type typeEditTerminalRequest = Pick<typeTerminal, 'id'> & Partial<Pick<typeTerminal, 'fiscalCardId' | 'label' | 'storeId' | 'contractCode'>>
