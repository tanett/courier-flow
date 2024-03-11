import { typeStoreCreate, typeStoreEdit, typeStoreType } from 'entities/stores/model/types';
import { accessScope } from '../../../app/config/api-constants';

export type typeCreateStoreRequest = typeStoreCreate

export type typeEditStoreRequest = typeStoreEdit

export interface typeSearchFilterStore {
    ids?: string[]
    archived?: boolean
    searchText?: string,
    nameContains?: string,
    names?: string[],
    merchantIds?: string[],
    types?: typeStoreType[],
    _or_?: string[]
    _not_?: string
    _and_?: string[]
}

export type typeSearchStoreSortingNames = 'NAME';
