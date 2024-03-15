import { typeUser } from 'entities/user-profile/model/state-slice';
import React from 'react';

export type typeStoresUsersTable = {
    userList: typeUser[] | undefined,
    isLoading: boolean,
    setRefetchList: React.Dispatch<React.SetStateAction<boolean>>
    onOpenDialogRemoveUser: (id: string)=>void
    isAllowEditUser: boolean
}
