import React, { useState } from 'react';
import { useLingui } from '@lingui/react';
import { FilterPanel } from 'shared/ui/filter-panel';
import { t, Trans } from '@lingui/macro';
import { useRolesList } from 'features/roles-list/hooks/useRolesList';
import { Flex, Text } from '@mantine/core';
import { typeRolesExtended } from '../../../entities/role/model/types';
import { useStyles } from './styles';
import { TableSkeleton } from '../../../shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Table } from '../../../shared/ui/table/ui/table-new/table';
import { Pagination } from '../../../shared/ui/pagination/table-pagination';
import { Modal } from 'shared/ui/modal';


export const RolesList: React.FC = () => {

    const { classes } = useStyles();
    const { i18n } = useLingui();

    const { rolesList, pagination, isLoading } = useRolesList();

    // const [ openRoleDescription, setOpenRoleDescription ] = useState<boolean>(false);
    const [ selectedRole, setSelectedRole ] = useState<typeRolesExtended | null>(null);

    const onRoleClick = (id: string | number) => {

        const role = rolesList?.find(item => item.id === id);
        if (role && role?.description && role?.description !== '') {

            setSelectedRole(role);

        }

    };

    const onCloseDescription = () => {

        setSelectedRole(null);

    };

    return (<>
        <FilterPanel
            withFind={{ placeholder: i18n._(t`Type part of role's name`) }}
        />

        {isLoading
            ? <TableSkeleton/>
            : rolesList && <>
                <Table>
                    <Table.Header>
                        <Table.Th withoutLeftDivider>
                            <Trans>Role's name</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Description</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Text className={classes.noWrap}>
                                <Trans>Users's count</Trans>
                            </Text>
                        </Table.Th>
                    </Table.Header>

                    <Table.Body>
                        {rolesList.length > 0 && rolesList.map((item) => {

                            return (
                                <Table.Tr key={item.id} handler={item.description ? () => onRoleClick(item.id) : undefined}>
                                    <Table.Td>{item.name}</Table.Td>
                                    <Table.Td><Text lineClamp={1}>{item.description || '-'}</Text></Table.Td>
                                    <Table.Td>{item.usersCount
                                        ? <Flex sx={{ flexGrow: 1, justifyContent: 'center' }}>{item.usersCount}</Flex>
                                        : <Flex sx={{ flexGrow: 1, justifyContent: 'center' }}>0</Flex>
                                    }</Table.Td>
                                </Table.Tr>
                            );

                        })}

                        {rolesList.length === 0 && <Table.EmptyRow columnCount={3}>
                            <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                        </Table.EmptyRow>}
                    </Table.Body>
                </Table>

                {pagination && <Pagination pagination={ pagination } withPerPage={pagination.totalPages > 1}/>}
            </>
        }

        {selectedRole && <Modal modalWidth="roleDetails" opened={true} onCloseByOverlay={onCloseDescription}>
            <Modal.Body>
                <>
                    <Modal.Header title={`${i18n._(t`Role description`)} ${selectedRole.name}`} onClose={onCloseDescription}/>
                    {selectedRole.description}
                </>
            </Modal.Body>
        </Modal>}

    </>);

};
