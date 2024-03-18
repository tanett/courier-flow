import React, { useState } from 'react';
import { Box, Button, Flex, Loader, Tooltip, useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import { useGetStoresUsersList } from 'features/stores-details-users/hooks/use-get-stores-users-list';
import { TableDetailsUsers } from 'features/stores-details-users/ui/table/table-stores-users';
import { TablePagination } from 'shared/ui/table/ui/table-pagination/table-pagination';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { editUserPermissions } from 'app/config/permissions-config';
import { IconPlus } from '@tabler/icons-react';
import { typeUser } from '../../../entities/user-profile/model/state-slice';
import { Modal } from 'shared/ui/modal';
import { Dialog } from 'shared/ui/dialog-new';
import { usePatchUserMutation } from '../../../entities/users/api/api';
import { notificationActions } from '../../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { typeUsersEdit } from '../../../entities/users/model/types';
import { useAppDispatchT } from 'app/state';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { AddUserToStore } from 'features/add-user-to-store/add-user-to-store';

export const StoresDetailsUsers: React.FC<{ storeId: string }> = ({ storeId }) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const dispatchAppT = useAppDispatchT();

    const isAllowEditUser = useIsAllowedPermissions(editUserPermissions);

    const {
        userList,
        pagination,
        isLoading,
        setRefetch,
    } = useGetStoresUsersList();

    const [ editUser, { isLoading: isLoadingEditUser } ] = usePatchUserMutation();


    const [ dialogToAddUser, setDialogToAddUser ] = useState<boolean>(false);

    const onAddClick = () => {

        setDialogToAddUser(true);

    };
    const onCloseDialogToAddUser = (refetch: boolean) => {

        if (refetch) {

            setRefetch(true);

        }

        setDialogToAddUser(false);

    };


    const [ dialogToRemoveUser, setDialogToRemoveUser ] = useState<null | typeUser>(null);

    const onCloseDialogToRemoveUser = () => {

        setDialogToRemoveUser(null);

    };

    const onOpenDialogRemoveUser = (id: string) => {

        if (userList?.length) {

            const user = userList.find(item => item.id === id);

            if (user) {

                setDialogToRemoveUser(user);

            }

        }

    };

    const onConfirmRemoveUser = async (user: typeUser) => {

        try {

            const dataObject: typeUsersEdit = {
                id: user.id,
                storeIds: {
                    patchType: 'REMOVE',
                    values: [ storeId ],
                },
            };

            await editUser(dataObject).unwrap();

            dispatchAppT(notificationActions.addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                message: i18n._(t`User was removed successfully.`),
            }));

            onCloseDialogToRemoveUser();
            setRefetch(true);


        } catch (err) {

            errorHandler(err as typeResponseError, 'onRemoveUserFromStore', dispatchAppT);

        }

    };

    return (
        <Box sx={ {
            borderTop: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
            borderTopRightRadius: '8px',
            marginTop: '-1px',
            backgroundColor: theme.white,

        } }>

            <Flex justify={ 'space-between' } p={ 16 }
                sx={ {
                    borderLeft: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                    borderRight: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                    borderTopRightRadius: '8px',
                } }
            >
                { (userList && pagination && pagination.totalElements > 0) ? <Box sx={ {
                    borderBottom: `2px solid ${ theme.colors.gray[ 5 ] }`,
                    alignSelf: 'center',
                } }>{ i18n._(t`total`) }: { pagination?.totalElements || 0 }</Box> : <div/> }

                { isAllowEditUser && <Tooltip withArrow arrowSize={ 6 } openDelay={ 1500 } radius="md" label={ i18n._(t`Add an existing employee to store`) }><Button
                    variant={ 'outline' }
                    key={ 'add-user-in-store' }
                    sx={ {
                        fontWeight: 700,
                        fontSize: theme.fontSizes.md,
                        letterSpacing: '0.3px',
                        '&:hover': { backgroundColor: theme.colors.primary[ 0 ] },
                    } }
                    onClick={ onAddClick }
                    leftIcon={ <IconPlus size={ 20 }/> }><Trans>Add</Trans>
                </Button></Tooltip> }
            </Flex>

            <TableDetailsUsers
                userList={ userList }
                isLoading={ isLoading }
                setRefetchList={ setRefetch }
                onOpenDialogRemoveUser={ onOpenDialogRemoveUser }
                isAllowEditUser={ isAllowEditUser }
            />

            { pagination && <Flex py={ 16 }><TablePagination withPerPage={ pagination.totalPages > 1 } { ...pagination } /></Flex> }

            { dialogToRemoveUser && <Modal modalWidth="dialog" opened={ true }>
                <Modal.Body>
                    <Dialog
                        cancelButton={ {
                            title: i18n._(t`Cancel`),
                            handler: onCloseDialogToRemoveUser,
                        } }
                        confirmButton={ {
                            title: i18n._(t`Confirm`),
                            handler: () => onConfirmRemoveUser(dialogToRemoveUser),
                        } }
                    >
                        <Trans>Are you sure you want to remove <br/>the user</Trans>  &quot;{ dialogToRemoveUser.fullName }&quot;  from the store?
                    </Dialog>
                    { isLoadingEditUser && <LoaderOverlay/> }
                </Modal.Body>
            </Modal> }

            { dialogToAddUser && <Modal modalWidth="auto" opened={ true } onCloseByOverlay={ () => onCloseDialogToAddUser(false) }>
                <Modal.Body>
                    <>
                        <Modal.Header title={ i18n._(t`Add an employee`) } onClose={ () => onCloseDialogToAddUser(false) }/>
                        <AddUserToStore storeId={ storeId } onClose={ () => onCloseDialogToAddUser(true) }/>
                    </>
                </Modal.Body>
            </Modal> }
        </Box>);

};
