import { accessScope } from 'app/config/api-constants';

export const tagTypesRolesExtendedList = { rolesExtendedList: { type: 'RolesExtendedList' as const, id: 'PARTIAL-LIST' } } as const;


export type typeSearchRolesFilter = {
        ids?: string[],
        archived?: boolean,
        searchText?: string,
        clientRole?: boolean,
        immutableRole?: boolean,
        codes?: string[],
        accessScopes?: accessScope[],
        merchantIds?: string[],
        _or_?:  Omit<typeSearchRolesFilter, '_or_' | '_not_' >[]
        _not_?: string

    }

export type typeSearchRolesSortingNames = 'NAME'
