import { typeProductCreate, typeProductEdit, typeProductToArchive } from '../model/state-slice/types';


export type typeCreateProductRequest = typeProductCreate

export type typeEditProductRequest = typeProductEdit

export type typeSearchFilterProduct = {
    ids?: string[]
    archived?: boolean
    searchText?: string
    nameContains?: string
    names?: string[]
    barcodes?: string[]
    categoriesIds?: string[]
    marked?: boolean
    piece?: boolean
    _or_?: string[]
    _not_?: string
    _and_?: string[]
}

export type typeSearchProductSortingNames = 'NAME';

export type typeProductToArchiveRequest = typeProductToArchive

