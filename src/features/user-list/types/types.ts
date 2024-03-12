import { typeGetCurrentUserResponse } from 'entities/user-profile/api/types';
import { typeUser } from 'entities/user-profile/model/state-slice';
import { typeTablePagination } from 'shared/ui/table/types/type';

export type typeUserList = {
    isAllowedUserEdit: boolean,
    currentUser: typeGetCurrentUserResponse | undefined,
    goToEditUserPage: (id: string) => void
    onConfirmArchiveUser: (id: string) => void
    userList: typeUser[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
}
