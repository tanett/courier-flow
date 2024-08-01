import { typeGetCurrentUserResponse } from 'entities/user-profile/api/types';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeExtendedStore } from 'entities/stores/model/types';

export type typeStoresListTable = {
    isAllowedStoreEdit: boolean | null,
    currentUser: typeGetCurrentUserResponse | undefined,
    goToEditStorePage: (id: string,name: string) => void
    goToDetailsStorePage: (id: string, name: string) => void
    goToDetailsStoreTabUsers: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string, name: string) => void
    storesList: typeExtendedStore[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
}
