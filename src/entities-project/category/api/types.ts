import { typeCategoryCreate, typeCategoryEdit, typeCategoryToArchive } from '../model/types';

export const tagTypesCategoriesExtendedList = { categoriesExtendedList: { type: 'CategoriesExtendedList' as const, id: 'PARTIAL-LIST' } } as const;


export type typeCreateCategoryRequest = typeCategoryCreate

export type typeEditCategoryRequest = typeCategoryEdit

export type typeSearchFilterCategory = {
    ids?: string[]
    searchText?: string
    nameContains?: string
    names?: string[]
    _or_?:  Omit<typeSearchFilterCategory, '_or_' | '_not_' | '_and_'>[]
    _not_?: string
    _and_?: Omit<typeSearchFilterCategory, '_or_' | '_not_' | '_and_'>[]
}

export type typeSearchCategorySortingNames = 'NAME';

export type typeCategoryDeleteRequest = typeCategoryToArchive
