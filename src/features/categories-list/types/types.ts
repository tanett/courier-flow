import { typeGetCurrentUserResponse } from 'entities/user-profile/api/types';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeCategory } from 'entities/category/model/types';
import React from 'react';
import { typeProductAdditionalFieldInfo } from 'entities/products/model/state-slice';
import { UseListStateHandlers } from '@mantine/hooks';

export type typeCategoryWithCheckBox = typeCategory & { checked: boolean }

export type typeHeadersAction = {
    id: string,
    label: string,
    handler: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export type typeCategoriesListTable = {
    isAllowedCategoryEdit: boolean | null,
    currentUser: typeGetCurrentUserResponse | undefined,
    goToEditCategoryPage: (id: string) => void
    onClickRowActionsArchiveItem: (category: typeCategoryWithCheckBox) => void
    categoriesList: typeCategoryWithCheckBox[] | undefined
    handlersListState: UseListStateHandlers<typeCategory & { checked: boolean }>
    pagination: typeTablePagination | undefined,
    isLoading: boolean
    headerActions: typeHeadersAction[]
}

export type typeCategoriesListTableHeader = {
    onCheckedAllHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    indeterminate: boolean
    allChecked: boolean
    headerActions:typeHeadersAction[]
    isAllowedEdit: boolean | null,
}
