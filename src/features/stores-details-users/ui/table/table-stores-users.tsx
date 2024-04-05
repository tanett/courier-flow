import React from 'react';
import { Box, Flex, useMantineTheme } from '@mantine/core';
import { ArrowRightStartOnRectangleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { EmptyElement } from 'shared/ui/empty-element';
import { typeAction } from 'shared/ui/table/ui/table-actions/types';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { typeStoresUsersTable } from 'features/stores-details-users/ui/table/types';


export const TableDetailsUsers: React.FC<typeStoresUsersTable> = ({
    userList,
    isLoading,
    onOpenDialogRemoveUser,
    goToEditUserPage,
    isAllowEditUser,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    return (
        <>
            { (isLoading || !userList)
                ? <TableSkeleton/>
                : userList.length === 0
                    ? <EmptyElement
                        title1={ i18n._(t`The list of users is empty.`) }
                        title2={ i18n._(t`Click the "Add" button to add existing users to the store.`) }/>
                    : userList && <>
                        <Table variant="inTab">
                            <Table.Header>
                                <Table.Th withoutLeftDivider>
                                    <Trans>Full name</Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans>Phone number</Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans>Role</Trans>
                                </Table.Th>
                                <Table.Th align={'center'}>
                                    <Flex maw={150}><Trans>Actions</Trans></Flex>
                                </Table.Th>
                            </Table.Header>

                            <Table.Body>
                                { userList.map((item) => {

                                    const actions: typeAction[] = [

                                        {
                                            label: i18n._(t`Edit`),
                                            handler: () => goToEditUserPage(item.id),
                                            icon: <PencilSquareIcon color={ theme.colors.primary[ 5 ] } width={ 22 }/>,
                                        },

                                        {
                                            icon: <ArrowRightStartOnRectangleIcon width={ 22 }/>,
                                            handler: () => onOpenDialogRemoveUser(item.id),
                                            label: i18n._(t`Remove from store`),
                                        }
                                    ];

                                    return (
                                        <Table.Tr key={ item.id } >
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{ item.fullName }</Box></Table.Td>
                                            <Table.Td><Box miw={150} maw={250}>{ item.phone ? formatIncompletePhoneNumber(item.phone) : '-' }</Box></Table.Td>
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{ item.role.name ?? '-' }</Box></Table.Td>
                                            { isAllowEditUser && <Flex justify={'center'}><Table.TdActions align={'center'} actions={ actions }/></Flex> }
                                        </Table.Tr>
                                    );

                                }) }
                            </Table.Body>
                        </Table>

                    </>
            }
        </>
    );

};
