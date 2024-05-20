import { typeStoreCreate, typeStoreEdit, typeStoreToArchive, typeStoreType } from 'entities/stores/model/types';

export const tagTypesExtendedStoresList = { storesExtendedList: { type: 'StoresExtendedList' as const, id: 'PARTIAL-LIST' } } as const;


export type typeCreateStoreRequest = typeStoreCreate

export type typeEditStoreRequest = typeStoreEdit

export interface typeSearchFilterStore {
    ids?: string[]
    archived?: boolean
    searchText?: string,
    nameContains?: string,
    names?: string[],
    merchantIds?: string[],
    createdAtFrom?: string,
    createdAtTo?: string,
    types?: typeStoreType[],
    _or_?:  Omit<typeSearchFilterStore, '_or_' | '_not_' | '_and_'>[]
    _not_?: string
    _and_?: Omit<typeSearchFilterStore, '_or_' | '_not_' | '_and_'>[]
}

export type typeSearchStoreSortingNames = 'NAME';

export type typeStoreToArchiveRequest = typeStoreToArchive
