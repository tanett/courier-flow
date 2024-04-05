import { typeGetCurrentUserResponse } from '../../../entities/user-profile/api/types';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeProduct, typeProductAdditionalFieldInfo } from '../../../entities/products/model/state-slice/types';
import React from 'react';
import { type UseListStateHandlers } from '@mantine/hooks';
import { TransProps } from '@lingui/react';


export type typeProductWithCheckBox = typeProduct & {checked: boolean}

export type typeHeadersAction = {
    id: string,
    label: React.ReactElement<TransProps>
    handler: (event: React.MouseEvent<HTMLButtonElement>) => void
}


export type typeProductsListTable = {
    isAllowedEdit: boolean | null,
    currentUser: typeGetCurrentUserResponse | undefined,
    goToEditProductPage: (id: string) => void
    goToDetailsProductPage: (id: string, name: string) => void
    onClickRowActionsArchiveItem: (product: typeProductWithCheckBox) => void
    productsList: typeProductWithCheckBox[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
    headerActions: typeHeadersAction[]
    handlersListState: UseListStateHandlers<typeProduct & { checked: boolean }>
}

export type typeProductListTableHeader = {
    onCheckedAllHandler: (event: React.ChangeEvent<HTMLInputElement>) =>void,
    indeterminate: boolean
    allChecked: boolean
    headerActions: typeHeadersAction[]
    additionalFields: typeProductAdditionalFieldInfo[] | undefined
    isAllowedEdit: boolean | null,
}
