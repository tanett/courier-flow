import { typeGetCurrentUserResponse } from '../../../entities-project/user-profile/api/types';
import { typeHeadersAction, typeTablePagination } from 'shared/ui/table/types/type';
import React from 'react';
import { type UseListStateHandlers } from '@mantine/hooks';
import { typeOrderShort, typeOrderShortExtended } from 'entities-project/orders/model/state-slice/types';


export type typeOrdersShortWithCheckBox = typeOrderShortExtended & {checked: boolean}


export type typeOrdersListTable = {
    isAllowedEditByPermission: boolean | null,
    currentUser: typeGetCurrentUserResponse | undefined,
    goToEditPage: (id: string) => void
    goToDetailsPage: (id: string, name: string) => void
    ordersList: typeOrderShortExtended[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
    setPopupContent: React.Dispatch<React.SetStateAction<React.ReactNode | null>>
}

export type typeOrdersListTableHeader = {
    isAllowedEdit: boolean | null,
}
