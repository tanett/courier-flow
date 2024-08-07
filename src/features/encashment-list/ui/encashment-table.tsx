import React from 'react';
import { Trans } from '@lingui/macro';
import { Table } from '../../../shared/ui/table';
import { TableSkeleton } from '../../../shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from '../../../shared/ui/pagination/table-pagination';
import {Flex} from '@mantine/core';
import { typeCashDeskListTable } from "../types/types";
import {useStyles} from "./styles";


export const EncashmentTable: React.FC<typeCashDeskListTable> = ({
    encashmentList,
    pagination,
    isLoading,
}) => {

    const {classes} = useStyles()

    return (<>
        {/*<FilterPanel
            withFind={ {
                placeholder: i18n._(t`Search by terminal serial number`),
                minValueLength: 1
            } }
            filterComponent={ <ZReportListFilter/> }
            isListLoading={isLoading}
        />*/}

        { isLoading
            ? <TableSkeleton/>
            : encashmentList && <>
                <Table>
                    <Table.Header>
                        <Table.Th withoutLeftDivider>
                            <Trans>Date & Time</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Terminal SN</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Cash desk</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Store name</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Employee</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Amount before</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Encashment amount</Trans>
                        </Table.Th>
                    </Table.Header>

                    <Table.Body>
                        { encashmentList.length > 0 && encashmentList.map((item, index) => {

                            const createdDateObj = new Date(item.encashedAt)
                            const createdDate = createdDateObj.toLocaleDateString(undefined, {day: 'numeric', month: 'numeric', year: 'numeric',});
                            const createdTime = createdDateObj.toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric', second: 'numeric',})

                            return (
                                <Table.Tr key={ item.id + index }>
                                    <Table.Td>
                                        <Flex gap={4}>
                                            <span>{createdDate},</span>
                                            <span className={classes.dateTitle}>{createdTime}</span>
                                        </Flex>
                                    </Table.Td>
                                    <Table.Td>{item.terminalSerialNumber}</Table.Td>
                                    <Table.Td>{item.cashDeskName}</Table.Td>
                                    <Table.Td>{item.storeName}</Table.Td>
                                    <Table.Td>{item.createdByName}</Table.Td>
                                    <Table.Td>{item.balanceBefore}</Table.Td>
                                    <Table.Td>{item.amount}</Table.Td>
                                </Table.Tr>
                            );

                        }) }
                        { encashmentList.length === 0 && <Table.EmptyRow columnCount={ 7 }>
                            <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                        </Table.EmptyRow> }
                    </Table.Body>
                </Table>

                { pagination && <Pagination pagination={ pagination } withPerPage={true}/> }
            </>
        }

    </>);

};
