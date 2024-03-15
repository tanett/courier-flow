import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Table } from '../../../shared/ui/table/ui/table-new/table';
import { TableSkeleton } from '../../../shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from '../../../shared/ui/pagination/table-pagination';
import { Box, rem, useMantineTheme } from '@mantine/core';
import { typeAction } from '../../../shared/ui/table/ui/table-actions/types';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import { typeStoresListTable } from 'features/stores-list/types/types';
import { StoresListFilter } from 'features/stores-list-filter';
import { FilterPanel } from 'shared/ui/filter-panel';

export const StoresListTable: React.FC<typeStoresListTable> = ({
    isAllowedStoreEdit,
    currentUser,
    goToEditStorePage,
    goToDetailsStorePage,
    storesList,
    pagination,
    isLoading,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    return (<>
        <FilterPanel
            withFind={ { placeholder: i18n._(t`Type part of store name`) } }
            filterComponent={ <StoresListFilter/> }
        />

        { isLoading
            ? <TableSkeleton/>
            : storesList && <>
            <Table>
                <Table.Header>
                    <Table.Th withoutLeftDivider>
                        <Trans>Name</Trans>
                    </Table.Th>
                    <Table.Th>
                        <Trans>Address</Trans>
                    </Table.Th>
                    <Table.Th>
                        <Trans>Phone number</Trans>
                    </Table.Th>

                    <Table.Th>
                        <Trans>The number of employees</Trans>
                    </Table.Th>
                    { isAllowedStoreEdit && <Table.Th>
                        <Trans>Actions</Trans>
                    </Table.Th> }
                </Table.Header>

                <Table.Body>
                    { storesList.length > 0 && storesList.map(item => {

                        const actions: typeAction[] = [
                            {
                                label: i18n._(t`Edit`),
                                handler: () => goToEditStorePage(item.id),
                                icon: <PencilSquareIcon color={ theme.colors.primary[5] } width={ 22 }/>
                            }
                        ];

                        return (
                            <Table.Tr key={ item.id } handler={ () => goToDetailsStorePage(item.id, item.name) }>
                                <Table.Td ><Box sx={{minWidth: rem(250), wordBreak: 'break-all'}}>{ item.name }</Box></Table.Td>
                                <Table.Td><Box sx={{minWidth: rem(250), wordBreak: 'break-all'}}>{item.locality}, { item.address }</Box></Table.Td>
                                <Table.Td><Box sx={{minWidth: rem(160)}}>{ item.phoneNumber ? formatIncompletePhoneNumber(item.phoneNumber) : '-' }</Box></Table.Td>

                                <Table.Td><Box sx={{minWidth: rem(160), textAlign: 'center'}}>{ item.usersCount || '-' }</Box></Table.Td>
                                { isAllowedStoreEdit && <Table.TdActions actions={ actions } align={'center'}/> }
                            </Table.Tr>
                        );

                    }) }
                    { storesList.length === 0 && <Table.EmptyRow columnCount={ isAllowedStoreEdit ? 5 : 4 }>
                        <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                    </Table.EmptyRow> }
                </Table.Body>
            </Table>

            {pagination && <Pagination pagination={ pagination } withPerPage={pagination.totalPages > 1}/>}
        </>
        }

    </>);

};
