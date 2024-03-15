import { typeGetCurrentUserResponse } from 'entities/user-profile/api/types';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeExtendedStore } from 'entities/stores/model/types';

export type typeStoresListTable = {
    isAllowedStoreEdit: boolean,
    currentUser: typeGetCurrentUserResponse | undefined,
    goToEditStorePage: (id: string) => void
    goToDetailsStorePage: (id: string, name: string) => void
    storesList: typeExtendedStore[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
}
