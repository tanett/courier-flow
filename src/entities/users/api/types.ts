import { typeUsersCreate, typeUsersEdit, typeUserToArchive } from 'entities/users/model/types';
import { accessScope } from '../../../app/config/api-constants';

export type typeCreateUserRequest = typeUsersCreate

export type typeEditUserRequest = typeUsersEdit

export interface typeSearchFilterUsers {
    fullNameContains?: string
    logins?: string[]
    hasMerchant?: boolean
    hasStore?:boolean
    ids?: string[]
    archived?: boolean
    searchText?: string
    usernames?: string[]
    phones?: string[]
    emails?: string[]
    roleIds?: string[]
    accessScopes?: accessScope[]
    merchantIds?: string[]
    roleCodes?: string[]
    linkedToMerchant?: boolean
    storeIds?: string[]
    _or_?: string[]
    _not_?: string
    _and_?: string[]
}

export type typeSearchUserSortingNames = 'FULL_NAME';

export type typeUserToArchiveRequest = typeUserToArchive

export const tagTypesExtendedUsersList = { extendedUsersList: { type: 'extendedUsersList', id: 'PARTIAL-LIST' } } as const;
