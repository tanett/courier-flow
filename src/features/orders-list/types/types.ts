import { typeGetCurrentUserResponse } from '../../../entities/user-profile/api/types';
import { typeHeadersAction, typeTablePagination } from 'shared/ui/table/types/type';
import React from 'react';
import { type UseListStateHandlers } from '@mantine/hooks';
import { typeOrderShort, typeOrderShortExtended } from 'entities/orders/model/state-slice/types';


export type typeOrdersShortWithCheckBox = typeOrderShortExtended & {checked: boolean}


export type typeOrdersListTable = {
    isAllowedEditByPermission: boolean | null,
    currentUser: typeGetCurrentUserResponse | undefined,
    goToEditPage: (id: string) => void
    goToDetailsPage: (id: string, name: string) => void
    ordersList: typeOrdersShortWithCheckBox[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
    headerActions: typeHeadersAction[]
    handlersListState: UseListStateHandlers<typeOrdersShortWithCheckBox>
    setPopupContent: React.Dispatch<React.SetStateAction<React.ReactNode | null>>
}

export type typeOrdersListTableHeader = {
    onCheckedAllHandler: (event: React.ChangeEvent<HTMLInputElement>) =>void,
    indeterminate: boolean
    allChecked: boolean
    headerActions: typeHeadersAction[]
    isAllowedEdit: boolean | null,
}
