import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { FilterPanel } from '../../../shared/ui/filter-panel';
import { Table } from '../../../shared/ui/table';
import { TableSkeleton } from '../../../shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from '../../../shared/ui/pagination/table-pagination';
import { Flex, useMantineTheme } from '@mantine/core';
import {typeZReportsListTable} from "../types/types";
import {ReceiptIcon} from "../../../shared/images/icons/receipt";
import {useStyles} from "./styles";
import {ZReportListFilter} from "../../z-report-list-filter/ui/z-report-list-filter";
import {typeActionList} from "../../../shared/ui/table/ui/table-actions/types";


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
                placeholder: i18n._(t`Search by terminal serial number`),
                minValueLength: 1
            } }
            filterComponent={ <ZReportListFilter/> }
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

                            const actions: typeActionList = [
                                {
                                    label: i18n._(t`Receipt`),
                                    handler: () => onOpenReceipt(item.id),
                                    icon: <ReceiptIcon color={theme.colors.primary[4]} width={22} height={22}/>,
                                }
                            ];

                            const openedDateObj = new Date(item.openedAt)
                            const openedDate = openedDateObj.toLocaleDateString(undefined, {day: 'numeric', month: 'numeric', year: 'numeric',});
                            const openedTime = openedDateObj.toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric', second: 'numeric',})

                            const closedDateObj = new Date(item.closedAt)
                            const closedDate = closedDateObj.toLocaleDateString(undefined, {day: 'numeric', month: 'numeric', year: 'numeric',});
                            const closedTime = closedDateObj.toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric', second: 'numeric',})

                            return (
                                <Table.Tr key={ item.id } handler={ () => goToDetailsReportPage(item.id, item.number.toString()) }>
                                    <Table.Td>{ item.fiscalModuleId }</Table.Td>
                                    <Table.Td>
                                        <Flex className={classes.dateColumn}>
                                            <div className={classes.dateOpened}>
                                                <span className={classes.dateTitle}><Trans>opened</Trans>:</span> <b className={classes.dateDay}>{ openedDate }</b>,
                                                {openedTime}
                                            </div>
                                            <div>
                                                <span className={classes.dateTitle}><Trans>closed</Trans>:</span> <b className={classes.dateDay}>{closedDate}</b>,
                                                {closedTime}
                                            </div>
                                        </Flex>
                                    </Table.Td>
                                    <Table.Td><Flex className={classes.center}>{ item.number }</Flex></Table.Td>
                                    <Table.Td>{ item.totalCashIncome + item.totalCashlessIncome }</Table.Td>
                                    <Table.Td>{ item.totalCashRefunds + item.totalCashlessRefunds }</Table.Td>
                                    <Table.Td>{ item.storeName }</Table.Td>
                                    <Table.Td>{ item.terminalSerialNumber }</Table.Td>
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
