import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ArchiveBoxXMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { FilterPanel } from '../../../shared/ui/filter-panel';
import { Table } from '../../../shared/ui/table/ui/table-new/table';
import { TableSkeleton } from '../../../shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from '../../../shared/ui/pagination/table-pagination';
import { Box, rem, useMantineTheme } from '@mantine/core';
import { typeActionList } from '../../../shared/ui/table/ui/table-actions/types';
import { typeTerminalConfigurationsListTable } from 'features/terminal-configurations-list/types/types';
import { TerminalConfigurationsListFilter } from 'features/terminal-configurations-list-filter';

export const TerminalConfigurationsListTable: React.FC<typeTerminalConfigurationsListTable> = ({
    isAllowedEdit,
    goToEditPage,
    goToDetailsPage,
    onDeleteButtonHandler,
    list,
    pagination,
    isLoading,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    return (<>
        <FilterPanel
            withFind={ { placeholder: i18n._(t`Search by configuration name`) } }
           filterComponent={ <TerminalConfigurationsListFilter/> }
        />

        { isLoading
            ? <TableSkeleton/>
            : list && <>
                <Table>
                    <Table.Header>
                        <Table.Th withoutLeftDivider>
                            <Trans>Configuration name</Trans>
                        </Table.Th>
                        <Table.Th  align={'center'}>
                            <Trans>Stores</Trans>
                        </Table.Th>
                        <Table.Th align={'center'}>
                            <Trans>POS</Trans>
                        </Table.Th>
                        <Table.Th align={'center'}>
                            <Trans>Categories</Trans>
                        </Table.Th>
                        { isAllowedEdit && <Table.Th align={'center'}>
                            <Trans>Actions</Trans>
                        </Table.Th> }
                    </Table.Header>

                    <Table.Body>
                        { list.length > 0 && list.map(item => {

                            const actions: typeActionList = [
                                {
                                    label: i18n._(t`Edit`),
                                    handler: () => goToEditPage(item.id),
                                    icon: <PencilSquareIcon color={ theme.colors.primary[ 5 ] } width={ 22 }/>,
                                },
                                {
                                    label: i18n._(t`Delete`),
                                    handler: () => onDeleteButtonHandler(item.id),
                                    icon: <ArchiveBoxXMarkIcon color={ theme.colors.red[ 5 ] } width={ 22 }/>,
                                }
                            ];

                            return (
                                <Table.Tr key={ item.id } handler={ () => goToDetailsPage(item.id, item.name) }>
                                    <Table.Td><Box sx={ { maxWidth: rem(440), minWidth: rem(200) } }>{ item.name }</Box></Table.Td>
                                    <Table.Td align={'center'}><Box sx={ { maxWidth: rem(160) } }>{ item.storeIds ? item.storeIds.length : '-' }</Box></Table.Td>
                                    <Table.Td align={'center'}><Box sx={ { maxWidth: rem(160) } }>{ item.terminalIds? item.terminalIds.length : '-' }</Box></Table.Td>
                                    <Table.Td align={'center'}><Box sx={ { maxWidth: rem(160) } }>{ item.productCategoryIds?.length || '-' }</Box></Table.Td>
                                    { isAllowedEdit && <Table.TdActions align={'center'} actions={ actions }/> }
                                </Table.Tr>
                            );

                        }) }
                        { list.length === 0 && <Table.EmptyRow columnCount={ isAllowedEdit ? 5 : 4 }>
                            <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                        </Table.EmptyRow> }
                    </Table.Body>
                </Table>

                { pagination && <Pagination pagination={ pagination } withPerPage={true}/> }
            </>
        }

    </>);

};
