import { typeGetCurrentUserResponse } from 'entities/user-profile/api/types';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeProductCategory } from 'entities/productsCategory/model/types';

export type typeCategoriesListTable = {
    isAllowedCategoryEdit: boolean,
    currentUser: typeGetCurrentUserResponse | undefined,
    goToEditCategoryPage: (id: string) => void
    onConfirmArchiveCategory: (id: string) => void
    categoriesList: typeProductCategory[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
}
