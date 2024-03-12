import React, { useState } from 'react';
import { useUserList } from '../hooks/use-user-list';
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

export const UserList: React.FC = () => {

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const [ confirmToArchiveData, setConfirmToArchiveData ] = useState<null | typeUser>(null);

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const isAllowedUserEdit = useIsAllowedPermissions(editUserPermissions);

    const onCloseConfirmToArchive = () => {

        setConfirmToArchiveData(null);

    };

    const onConfirmArchiveUser = (id: string) => {

        if (userList?.length) {

            const user = userList.find(item => item.id === id);

            if (user) {

                setConfirmToArchiveData(user);

            }

        }

    };

    const {
        userList,
        pagination,
        isLoading,
        setRefetch,
    } = useUserList();


    const goToEditUserPage = (id: string | number) => navigate([ routerPaths.users, id.toString(), 'edit' ].join('/'));

    const { onArchive } = useArchiveUsers({
        onSuccess: () => {

            onCloseConfirmToArchive();
            setRefetch(true);

        },
        onError: () => onCloseConfirmToArchive(),
    });


    return (<>
        <UserListTable
            currentUser={ currentUser }
            isAllowedUserEdit={ isAllowedUserEdit }
            goToEditUserPage={ goToEditUserPage }
            onConfirmArchiveUser={ onConfirmArchiveUser }
            userList={userList}
            pagination={pagination}
            isLoading={isLoading}
        />


        { confirmToArchiveData && <Modal modalWidth="dialog" opened={ true }>
            <Modal.Body>
                <Dialog
                    cancelButton={ {
                        title: i18n._(t`Cancel`),
                        handler: onCloseConfirmToArchive,
                    } }
                    confirmButton={ {
                        title: i18n._(t`Confirm`),
                        handler: () => onArchive(confirmToArchiveData?.id),
                    } }
                >
                    <Trans>Are you sure you want to archive<br/>the user</Trans> &quot;{ confirmToArchiveData.fullName }&quot;?
                </Dialog>
            </Modal.Body>
        </Modal> }

    </>);

};
