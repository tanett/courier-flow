import { typeGetCurrentUserResponse } from 'entities/user-profile/api/types';
import { typeUser } from 'entities/user-profile/model/state-slice';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeUserWithStoresName } from 'entities/users/model/types';

export type typeUserListTable = {
    isAllowedUserEdit: boolean,
    currentUser: typeGetCurrentUserResponse | undefined,
    goToEditUserPage: (id: string) => void
    goToDetailsUserPage: (id: string, name: string) => void
    onConfirmArchiveUser: (id: string) => void
    userList: typeUserWithStoresName[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
}
