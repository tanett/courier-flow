import { typeChangeCategoryForProduct, typeProductCreate, typeProductEdit, typeProductToArchive } from '../model/state-slice/types';
import { LANGUAGES } from 'app/config/languages';

export const tagTypesProductsExtendedList = { productsExtendedList: { type: 'ProductsExtendedList' as const, id: 'PARTIAL-LIST' } } as const;


export type typeCreateProductRequest = typeProductCreate

export type typeEditProductRequest = typeProductEdit

export type typeBatchEditProductRequest = typeProductEdit[]

export type typeChangeCategoryForSelectedProductsRequest = typeChangeCategoryForProduct[]

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
    _or_?:  Omit<typeSearchFilterProduct, '_or_' | '_not_' | '_and_'>[]
    _not_?: string
    _and_?: Omit<typeSearchFilterProduct, '_or_' | '_not_' | '_and_'>[]
}

export type typeSearchFilterProductExtended = typeSearchFilterProduct & {storeIds?: string[]}

export type typeSearchProductSortingNames = 'NAME';

export type typeProductToArchiveRequest = typeProductToArchive
