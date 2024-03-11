import React, { useState } from 'react';
import { useUserList } from '../hooks/use-user-list';
import { useNavigate } from 'react-router-dom';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ArchiveBoxXMarkIcon, MinusSmallIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { routerPaths } from '../../../app/config/router-paths';
import { FilterPanel } from '../../../shared/ui/filter-panel';
import { UserListFilter } from '../../user-list-filter';
import { Table } from '../../../shared/ui/table/ui/table-new/table';
import { TableSkeleton } from '../../../shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from '../../../shared/ui/pagination/table-pagination';
import { Modal } from '../../../shared/ui/modal';
import { useMantineTheme } from '@mantine/core';
import { Dialog } from '../../../shared/ui/dialog-new';
import { typeUser } from '../../../entities/user-profile/model/state-slice';
import { typeAction } from '../../../shared/ui/table/ui/table-actions/types';
import { useSelectorT } from '../../../app/state';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { editUserPermissions } from '../../../app/config/permissions-config';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import { useArchiveUsers } from '../../../entities/users/hooks/use-archive-users';

export const UserList: React.FC = () => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const navigate = useNavigate();

    const isAllowEditUser = useIsAllowedPermissions(editUserPermissions);

    const [ confirmToArchiveData, setConfirmToArchiveData ] = useState<null | typeUser>(null);

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

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

    const { userList, pagination, isLoading, setRefetch } = useUserList();


    const goToEditUserPage = (id: string | number) => navigate([ routerPaths.users, id.toString(), 'edit' ].join('/'));

    const { onArchive } = useArchiveUsers({
        onSuccess: () => {

            onCloseConfirmToArchive();
            setRefetch(true);

        }, onError: () => onCloseConfirmToArchive(),
    });


    return (<>
        <FilterPanel
            withFind={{ placeholder: i18n._(t`Type part of your username, email or phone number`) }}
            filterComponent={<UserListFilter/>}
        />

        {isLoading
            ? <TableSkeleton/>
            : userList && <>
                <Table>
                    <Table.Header>
                        <Table.Th withoutLeftDivider>
                            <Trans>Name</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Phone number</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Email</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Role</Trans>
                        </Table.Th>
                        {isAllowEditUser && <Table.Th>
                            <Trans>Actions</Trans>
                        </Table.Th>}
                    </Table.Header>

                    <Table.Body>
                        {userList.length > 0 && userList.map(item => {

                            const actions: typeAction[] = [
                                { label: i18n._(t`Edit`), handler: () => goToEditUserPage(item.id), icon: <PencilSquareIcon color={theme.colors.primary[ 5 ]} width={22}/> }
                            ];
                            if (currentUser?.actor.id !== item.id) {

                                actions.push({ label: i18n._(t`Archive`), handler: () => onConfirmArchiveUser(item.id), icon: <ArchiveBoxXMarkIcon color={theme.colors.primary[ 5 ]} width={22}/> });

                            }

                            return (
                                <Table.Tr key={item.id}>
                                    <Table.Td>{item.fullName}</Table.Td>
                                    <Table.Td>{item.phone ? formatIncompletePhoneNumber(item.phone) : <MinusSmallIcon width={14}/>}</Table.Td>
                                    <Table.Td>{item.email}</Table.Td>
                                    <Table.Td>{item.role.name}</Table.Td>
                                    {isAllowEditUser && <Table.TdActions actions={actions}/>}
                                </Table.Tr>
                            );

                        })}
                        {userList.length === 0 && <Table.EmptyRow columnCount={isAllowEditUser ? 7 : 6}>
                            <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                        </Table.EmptyRow>}
                    </Table.Body>
                </Table>

                <Pagination pagination={pagination} />
            </>
        }

        {confirmToArchiveData && <Modal modalWidth="dialog" opened={true}>
            <Modal.Body>
                <Dialog
                    cancelButton={{ title: i18n._(t`Cancel`), handler: onCloseConfirmToArchive }}
                    confirmButton={{ title: i18n._(t`Confirm`), handler: () => onArchive(confirmToArchiveData?.id) }}
                >
                    <Trans>Are you sure you want to archive<br/>the user</Trans> &quot;{confirmToArchiveData.fullName}&quot;?
                </Dialog>
            </Modal.Body>
        </Modal>}

    </>);

};
