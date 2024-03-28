import { typeGetCurrentUserResponse } from '../../../entities/user-profile/api/types';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeProduct } from '../../../entities/products/model/state-slice/types';

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
