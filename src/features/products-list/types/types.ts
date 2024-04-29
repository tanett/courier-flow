import { typeGetCurrentUserResponse } from '../../../entities/user-profile/api/types';
import { typeHeadersAction, typeTablePagination } from 'shared/ui/table/types/type';
import { typeProductAdditionalFieldInfo, typeProductExtended } from '../../../entities/products/model/state-slice/types';
import React from 'react';
import { type UseListStateHandlers } from '@mantine/hooks';


export type typeProductExtendedWithCheckBox = typeProductExtended & {checked: boolean}


export type typeProductsListTable = {
    isAllowedEdit: boolean | null,
    currentUser: typeGetCurrentUserResponse | undefined,
    goToEditProductPage: (id: string) => void
    goToDetailsProductPage: (id: string, name: string) => void
    onClickRowActionsArchiveItem: (product: typeProductExtendedWithCheckBox) => void
    productsList: typeProductExtendedWithCheckBox[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
    headerActions: typeHeadersAction[]
    handlersListState: UseListStateHandlers<typeProductExtendedWithCheckBox>
}

export type typeProductListTableHeader = {
    onCheckedAllHandler: (event: React.ChangeEvent<HTMLInputElement>) =>void,
    indeterminate: boolean
    allChecked: boolean
    headerActions: typeHeadersAction[]
    additionalFields: typeProductAdditionalFieldInfo[] | undefined
    isAllowedEdit: boolean | null,
}
