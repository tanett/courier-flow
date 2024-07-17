import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { FilterPanel } from '../../../shared/ui/filter-panel';
import { Table } from '../../../shared/ui/table';
import { TableSkeleton } from '../../../shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from '../../../shared/ui/pagination/table-pagination';
import { Box, rem, Text, useMantineTheme } from '@mantine/core';
import { typeActionList } from '../../../shared/ui/table/ui/table-actions/types';
import {typeRefundListTable} from "../types/types";
import {ReceiptIcon} from "../../../shared/images/icons/receipt";
import { RefundsListFilter } from 'features/refunds-list-filter';
import DateTimeInLine from 'shared/ui/date-time-in-line/date-time-in-line';

export const RefundListTable: React.FC<typeRefundListTable> = ({
    refundList,
    goToDetailsReceiptPage,
    onOpenReceipt,
    pagination,
    isLoading,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    return (<>
        <FilterPanel
            withFind={ {
                placeholder: i18n._(t`Search by receipt number or total cost`),
                minValueLength: 1
            } }
            filterComponent={ <RefundsListFilter/> }
        />

        { isLoading
            ? <TableSkeleton/>
            : refundList && <>
                <Table>
                    <Table.Header>
                        <Table.Th withoutLeftDivider>
                            <Trans>Date & Time</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Receipt number</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Store</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Employee</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Total cost</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Actions</Trans>
                        </Table.Th>
                    </Table.Header>

                    <Table.Body>
                        { refundList.length > 0 && refundList.map(item => {

                            const actions: typeActionList = [
                                {
                                    label: i18n._(t`Receipt`),
                                    handler: () => onOpenReceipt(item.id),
                                    icon: <ReceiptIcon color={theme.colors.primary[4]} width={22} height={22}/>,
                                }
                            ];



                            return (
                                <Table.Tr key={ item.id } handler={ () => goToDetailsReceiptPage(item.id, item.receiptNumber) }>
                                    <Table.Td>
                                      { item.createdAt? <DateTimeInLine date={ item.createdAt } fontSizeDate={'14px'} fontSizeTime={'14px'} fontWeightDate={500}/>: '-' }

                                    </Table.Td>
                                    <Table.Td>{ item.receiptNumber }</Table.Td>
                                    <Table.Td ><Box sx={{ minWidth: rem(100),wordBreak: 'break-all',maxWidth: rem(170)}}><Text truncate>{ item.storeName || '-' }</Text></Box></Table.Td>
                                    <Table.Td><Box sx={{ minWidth: rem(100),wordBreak: 'break-all',maxWidth: rem(170)}}><Text truncate>{ item.refundedByName }</Text></Box></Table.Td>
                                    <Table.Td>{ item.totalPaymentsAmount }</Table.Td>
                                    <Table.TdActions actions={ actions }/>
                                </Table.Tr>
                            );

                        }) }
                        { refundList.length === 0 && <Table.EmptyRow columnCount={ 6 }>
                            <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                        </Table.EmptyRow> }
                    </Table.Body>
                </Table>

                { pagination && <Pagination pagination={ pagination } withPerPage={true}/> }
            </>
        }

    </>);

};
