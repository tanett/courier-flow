import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Table } from '../../../shared/ui/table';
import { TableSkeleton } from '../../../shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from '../../../shared/ui/pagination/table-pagination';
import {Box, Flex, useMantineTheme} from '@mantine/core';
import {typeCashDeskListTable} from "../types/types";
import {typeActionList} from "../../../shared/ui/table/ui/table-actions/types";
import {ArchiveBoxArrowDownIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import {useStyles} from "./styles";
import {FilterPanel} from "../../../shared/ui/filter-panel";


export const CashDeskTable: React.FC<typeCashDeskListTable> = ({
    cashDeskList,
    goToDetailsCashDeskPage,
    onEdit,
    onArchive,
    pagination,
    isLoading,
}) => {

    const { i18n } = useLingui();

    const {classes} = useStyles();

    const theme = useMantineTheme();

    return (<>
        <FilterPanel
            withFind={{
                placeholder: i18n._(t`Search by name`),
                minValueLength: 1
            }}
            // filterComponent={ <ZReportListFilter/> }
            isListLoading={isLoading}
        />

        { isLoading
            ? <TableSkeleton/>
            : cashDeskList && <>
                <Table>
                    <Table.Header>
                        <Table.Th withoutLeftDivider>
                            <Trans>Name</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Store name</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Amount</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Actions</Trans>
                        </Table.Th>
                    </Table.Header>

                    <Table.Body>
                        { cashDeskList.length > 0 && cashDeskList.map(item => {

                            const actions: typeActionList = [
                                {
                                    label: i18n._(t`Edit`),
                                    handler: () => onEdit(item.id),
                                    icon: <PencilSquareIcon color={theme.colors.primary[4]} width={22} height={22}/>,
                                },
                                {
                                    label: i18n._(t`To archive`),
                                    handler: () => onArchive(item.id),
                                    icon: <ArchiveBoxArrowDownIcon color={theme.colors.primary[4]} width={22} height={22}/>,
                                }
                            ];

                            const amount = <Flex>{item.cashDeskBalances.map(balanceItem =>
                                <Flex key={balanceItem.id}>
                                    <Box>{balanceItem.amount}</Box>
                                    <Box>{balanceItem.currency}</Box>
                                </Flex>
                            )}</Flex>

                            return (
                                <Table.Tr key={ item.id } handler={ () => goToDetailsCashDeskPage(item.id, item.name) }>
                                    <Table.Td>{item.name}</Table.Td>
                                    <Table.Td>{item.storeName}</Table.Td>
                                    <Table.Td>{amount}</Table.Td>
                                    <Table.TdActions additionalClasses={classes.actionColumn} actions={ actions }/>
                                </Table.Tr>
                            );

                        }) }
                        { cashDeskList.length === 0 && <Table.EmptyRow columnCount={ 4 }>
                            <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                        </Table.EmptyRow> }
                    </Table.Body>
                </Table>

                { pagination && <Pagination pagination={ pagination } withPerPage={true}/> }
            </>
        }

    </>);

};
