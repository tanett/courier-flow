import { typeHeadersAction, typeTablePagination } from 'shared/ui/table/types/type';
import { typeSaleShort } from '../../../entities/sales/model/types';
import React from 'react';
import type { UseListStateHandlers } from '@mantine/hooks';

export type typeSalesListTable = {
    goToDetailsSalePage: (id: string, name: string) => void
    salesList: typeCheckedShortSales[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
    headerActions: typeHeadersAction[]
    handlersListState: UseListStateHandlers<typeCheckedShortSales>
    isAllowedExport: boolean | null,
}



export type typeSalesListTableHeader = {
    onCheckedAllHandler: (event: React.ChangeEvent<HTMLInputElement>) =>void,
    indeterminate: boolean
    allChecked: boolean
    headerActions: typeHeadersAction[]
    isAllowedExport: boolean | null,
}


export type typeCheckedShortSales = typeSaleShort & {checked: boolean}
