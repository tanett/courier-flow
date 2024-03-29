import { typeGetCurrentUserResponse } from 'entities/user-profile/api/types';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeCategory } from 'entities/category/model/types';

export type typeCategoriesListTable = {
    isAllowedCategoryEdit: boolean | null,
    currentUser: typeGetCurrentUserResponse | undefined,
    goToEditCategoryPage: (id: string) => void
    onConfirmArchiveCategory: (id: string) => void
    categoriesList: typeCategory[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
}
