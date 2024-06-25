import {  } from '../model/state-slice/types';

export const tagTypesTerminalConfigurationsList = { terminalConfigurationsList: { type: 'TerminalConfigurationsList' as const, id: 'PARTIAL-LIST' } } as const;


export type typeSearchFilterTerminalConfigurations = {
    ids?: string[]
    archived?: boolean
    searchText?: string
    terminalIds?: string[]
    storeIds?: string[]
    serialNumbers?: string[]
    _or_?:  Omit<typeSearchFilterTerminalConfigurations, '_or_' | '_not_' | '_and_'>[]
    _not_?: string
    _and_?: Omit<typeSearchFilterTerminalConfigurations, '_or_' | '_not_' | '_and_'>[]
}

export type typeSearchTerminalConfigurationsSortingNames = 'NAME';

