import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { FilterPanel } from '../../../shared/ui/filter-panel';
import { Table } from '../../../shared/ui/table';
import { TableSkeleton } from '../../../shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from '../../../shared/ui/pagination/table-pagination';
import { Box, useMantineTheme } from '@mantine/core';
import { typeAction } from '../../../shared/ui/table/ui/table-actions/types';
import {typeZReportsListTable} from "../types/types";
import {ReceiptIcon} from "../../../shared/images/icons/receipt";
import {useStyles} from "./styles";


export const RefundListTable: React.FC<typeZReportsListTable> = ({
    zReportsList,
    goToDetailsReportPage,
    onOpenReceipt,
    pagination,
    isLoading,
}) => {

    const {classes} = useStyles()

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    return (<>
        <FilterPanel
            withFind={ {
                placeholder: i18n._(t`Search by receipt number or total cost`),
                minValueLength: 1
            } }
            // filterComponent={ <RefundsListFilter/> }
        />

        { isLoading
            ? <TableSkeleton/>
            : zReportsList && <>
                <Table>
                    <Table.Header>
                        <Table.Th withoutLeftDivider>
                            <Trans>Fiscal card ID</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Date</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Z-report number</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Total income</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Total refunds</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Store name</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Terminal SN</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Actions</Trans>
                        </Table.Th>
                    </Table.Header>

                    <Table.Body>
                        { zReportsList.length > 0 && zReportsList.map(item => {

                            const actions: typeAction[] = [
                                {
                                    label: i18n._(t`Receipt`),
                                    handler: () => onOpenReceipt(item.id),
                                    icon: <ReceiptIcon color={theme.colors.primary[4]} width={22} height={22}/>,
                                }
                            ];

                            const dateObj = new Date(item.createdAt)
                            const date = dateObj.toLocaleDateString(undefined, {
                                day: 'numeric',
                                month: 'numeric',
                                year: 'numeric',
                            });
                            const time = dateObj.toLocaleTimeString(undefined, {
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                            })

                            return (
                                <Table.Tr key={ item.id } handler={ () => goToDetailsReportPage(item.id, item.receiptNumber) }>
                                    <Table.Td><Box>
                                        <div>{ date }</div>
                                        <div className={classes.time}>{ time }</div>
                                    </Box></Table.Td>
                                    <Table.Td>{ item.receiptNumber }</Table.Td>
                                    <Table.Td>{ item.storeName }</Table.Td>
                                    <Table.Td>{ item.refundedByName }</Table.Td>
                                    <Table.Td>{ item.totalPaymentsAmount }</Table.Td>
                                    <Table.TdActions actions={ actions }/>
                                </Table.Tr>
                            );

                        }) }
                        { zReportsList.length === 0 && <Table.EmptyRow columnCount={ 8 }>
                            <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                        </Table.EmptyRow> }
                    </Table.Body>
                </Table>

                { pagination && <Pagination pagination={ pagination } withPerPage={true}/> }
            </>
        }

    </>);

};
