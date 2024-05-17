import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { FilterPanel } from '../../../shared/ui/filter-panel';
import { UserListFilter } from '../../user-list-filter';
import { Table } from '../../../shared/ui/table';
import { TableSkeleton } from '../../../shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from '../../../shared/ui/pagination/table-pagination';
import { Box, useMantineTheme } from '@mantine/core';
import { typeAction } from '../../../shared/ui/table/ui/table-actions/types';
import {typeRefundListTable} from "../types/types";
import {ReceiptIcon} from "../../../shared/images/icons/receipt";
import {useStyles} from "./styles";

export const RefundListTable: React.FC<typeRefundListTable> = ({
    refundList,
    goToDetailsReceiptPage,
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
            filterComponent={ <UserListFilter/> }
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
                                <Table.Tr key={ item.id } handler={ () => goToDetailsReceiptPage(item.id) }>
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
