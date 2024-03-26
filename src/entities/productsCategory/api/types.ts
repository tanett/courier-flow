import { typeProductCategoryCreate, typeProductCategoryEdit, typeProductCategoryToArchive } from '../../../entities/productsCategory/model/types';


export type typeCreateProductCategoryRequest = typeProductCategoryCreate

export type typeEditProductCategoryRequest = typeProductCategoryEdit

export type typeSearchFilterProductCategory = {
    ids?: string[]
    searchText?: string
    nameContains?: string
    names?: string[]
    _or_?: string[]
    _not_?: string
    _and_?: string[]
}

export type typeSearchProductCategorySortingNames = 'NAME';

export type typeProductCategoryToArchiveRequest = typeProductCategoryToArchive

