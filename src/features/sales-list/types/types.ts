import { typeHeadersAction, typeTablePagination } from 'shared/ui/table/types/type';
import { typeSaleShortExtended } from '../../../entities/sales/model/types';
import React from 'react';
import type { UseListStateHandlers } from '@mantine/hooks';

export type typeSalesListTable = {
    goToDetailsSalePage: (id: string, publicId: string) => void
    salesList: typeCheckedShortSalesExtended[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
    headerActions: typeHeadersAction[]
    handlersListState: UseListStateHandlers<typeCheckedShortSalesExtended>
    isAllowedExport: boolean | null,
}



export type typeSalesListTableHeader = {
    onCheckedAllHandler: (event: React.ChangeEvent<HTMLInputElement>) =>void,
    indeterminate: boolean
    allChecked: boolean
    headerActions: typeHeadersAction[]
    isAllowedExport: boolean | null,
}


export type typeCheckedShortSalesExtended = typeSaleShortExtended & {checked: boolean}
