import React, { useState } from 'react';
import { useExtendedUsersList } from '../../../entities/users/hooks/use-extended-users-list';
import { useNavigate } from 'react-router-dom';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { routerPaths } from '../../../app/config/router-paths';
import { Modal } from '../../../shared/ui/modal';
import { Dialog } from '../../../shared/ui/dialog-new';
import { typeUser } from '../../../entities/user-profile/model/state-slice';
import { useSelectorT } from '../../../app/state';
import { useArchiveUsers } from '../../../entities/users/hooks/use-archive-users';
import { UserListTable } from 'features/user-list/ui/user-table';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { editUserPermissions } from 'app/config/permissions-config';
import { typeUserWithStoresName } from '../../../entities/users/model/types';

export const UserList: React.FC = () => {

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const [ confirmToArchiveData, setConfirmToArchiveData ] = useState<null | typeUser | typeUserWithStoresName>(null);

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const isAllowedUserEdit = useIsAllowedPermissions(editUserPermissions);

    const onCloseConfirmToArchive = () => {

        setConfirmToArchiveData(null);

    };

    const onConfirmArchiveUser = (id: string) => {

        if (extendedUsersList?.length) {

            const user = extendedUsersList.find(item => item.id === id);

            if (user) {

                setConfirmToArchiveData(user);

            }

        }

    };

    const {
        extendedUsersList,
        pagination,
        isLoading,
    } = useExtendedUsersList();


    const goToEditUserPage = (id: string | number) => navigate([ routerPaths.users, id.toString(), 'edit' ].join('/'));

    const goToDetailsUserPage = (id: string | number, name: string) => navigate([ routerPaths.users, id.toString(), name ].join('/'));

    const { onArchive } = useArchiveUsers({
        onSuccess: () => {

            onCloseConfirmToArchive();

        },
        onError: () => onCloseConfirmToArchive(),
    });


    return (<>
        <UserListTable
            currentUser={ currentUser }
            isAllowedUserEdit={ isAllowedUserEdit }
            goToEditUserPage={ goToEditUserPage }
            onConfirmArchiveUser={ onConfirmArchiveUser }
            userList={extendedUsersList}
            pagination={pagination}
            isLoading={isLoading}
            goToDetailsUserPage={goToDetailsUserPage}
        />


        { confirmToArchiveData && <Modal modalWidth="dialog" opened={ true }>
            <Modal.Body>
                <Dialog
                    cancelButton={ {
                        title: i18n._(t`Cancel`),
                        handler: onCloseConfirmToArchive,
                    } }
                    confirmButton={ {
                        title: i18n._('action-archive'),
                        handler: () => onArchive(confirmToArchiveData?.id),
                    } }
                >
                    <Trans>Are you sure you want to archive<br/>the user</Trans> &quot;{ confirmToArchiveData.fullName }&quot;?
                </Dialog>
            </Modal.Body>
        </Modal> }

    </>);

};
