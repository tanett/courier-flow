import { typeGetCurrentUserResponse } from 'entities/user-profile/api/types';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeCategory, typeCategoryExtended } from 'entities/category/model/types';
import React, { FC } from 'react';
import { UseListStateHandlers } from '@mantine/hooks';
import { TransProps } from '@lingui/react';

export type typeCategoryWithCheckBox = typeCategoryExtended & { checked: boolean }

export type typeHeadersAction = {
    id: string,
    label: React.ReactElement<TransProps>,
    handler: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export type typeCategoriesListTable = {
    isAllowedCategoryEdit: boolean | null,
    currentUser: typeGetCurrentUserResponse | undefined,
    goToEditCategoryPage: (id: string) => void
    onClickRowActionsArchiveItem: (category: typeCategoryWithCheckBox) => void
    categoriesList: typeCategoryWithCheckBox[] | undefined
    handlersListState: UseListStateHandlers<typeCategoryExtended & { checked: boolean }>
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
