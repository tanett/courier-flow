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
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';

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
                placeholder: i18n._({ id: `Search by refund amount or check number` , message: `Search by total cost or check number` }),
                minValueLength: 1
            } }
            filterComponent={ <RefundsListFilter/> }
            isListLoading={isLoading}
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
                            <Trans id={'Refund amount'}>Total cost</Trans>
                        </Table.Th>
                        <Table.Th align={'center'}>
                            <Trans>Actions</Trans>
                        </Table.Th>
                    </Table.Header>

                    <Table.Body>
                        { refundList.length > 0 && refundList.map(item => {

                            const actions: typeActionList = [
                                {
                                    label: i18n._(t`Print receipt`),
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
                                    <Table.Td ><Box sx={{ minWidth: rem(300),wordBreak: 'break-all',maxWidth: rem(330)}}><Text truncate>{ item.storeName || '-' }</Text></Box></Table.Td>
                                    <Table.Td><Box sx={{ width: rem(150), maxWidth: rem(150),wordBreak: 'break-all'}}><Text truncate>{ item.refundedByName }</Text></Box></Table.Td>
                                    <Table.Td><Box sx={{ width: 'fit-content', maxWidth: rem(120)}}>{ item.totalPaymentsAmount ? numberCurrencyFormat(item.totalPaymentsAmount) : ''}</Box></Table.Td>
                                    <Table.TdActions align={'center'} actions={ actions }/>
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
