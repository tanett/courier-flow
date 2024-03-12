import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ArchiveBoxXMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { FilterPanel } from '../../../shared/ui/filter-panel';
import { UserListFilter } from '../../user-list-filter';
import { Table } from '../../../shared/ui/table/ui/table-new/table';
import { TableSkeleton } from '../../../shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from '../../../shared/ui/pagination/table-pagination';
import { useMantineTheme } from '@mantine/core';
import { typeAction } from '../../../shared/ui/table/ui/table-actions/types';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import { typeUserList } from 'features/user-list/types/types';

export const UserListTable: React.FC<typeUserList> = ({
    isAllowedUserEdit,
    currentUser,
    goToEditUserPage,
    onConfirmArchiveUser,
    userList,
    pagination, isLoading,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

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
                        <Table.Th>
                            <Trans>Stores</Trans>
                        </Table.Th>
                        {isAllowedUserEdit && <Table.Th>
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
                                    <Table.Td>{item.phone ? formatIncompletePhoneNumber(item.phone) : '-'}</Table.Td>
                                    <Table.Td>{item.email}</Table.Td>
                                    <Table.Td>{item.role.name}</Table.Td>
                                    <Table.Td>{item.storeIds}</Table.Td>
                                    {isAllowedUserEdit && <Table.TdActions actions={actions}/>}
                                </Table.Tr>
                            );

                        })}
                        {userList.length === 0 && <Table.EmptyRow columnCount={isAllowedUserEdit ? 7 : 6}>
                            <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                        </Table.EmptyRow>}
                    </Table.Body>
                </Table>

                <Pagination pagination={pagination} />
            </>
        }

    </>);

};
