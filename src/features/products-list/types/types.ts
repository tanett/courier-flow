import { typeGetCurrentUserResponse } from '../../../entities/user-profile/api/types';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeProduct, typeProductAdditionalFieldInfo } from '../../../entities/products/model/state-slice/types';
import React from 'react';

export type typeProductWithCheckBox = typeProduct & {checked: boolean}

export type typeProductsListTable = {
    isAllowedEdit: boolean | null,
    currentUser: typeGetCurrentUserResponse | undefined,
    goToEditProductPage: (id: string) => void
    goToDetailsProductPage: (id: string, name: string) => void
    onConfirmArchiveProduct: (id: string) => void
    productsList: typeProduct[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
}

export type typeProductListTableHeader = {
    onCheckedAllHandler: (event: React.ChangeEvent<HTMLInputElement>) =>void,
    indeterminate: boolean
    allChecked: boolean
    headerActions: {id: string,label: string, handler: (event: React.MouseEvent<HTMLButtonElement>)=>void}[]
    additionalFields: typeProductAdditionalFieldInfo[] | undefined
    isAllowedEdit:  boolean | null,
}
