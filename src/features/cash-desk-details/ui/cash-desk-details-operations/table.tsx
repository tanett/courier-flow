import React from 'react';
import { Box, Flex } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { EmptyElement } from 'shared/ui/empty-element';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { typeCashDeskOperationsTable } from '../../types/types';
import { useStyles } from '../styles';
import cn from 'classnames';
import { addSignStyleToNumber } from '../../../../shared/utils/add-sign-style-to-number';
import { CashDeskOperationType } from '../../../../shared/ui/cash-desk-operation-type';


export const TableDetailsCashDeskOperations: React.FC<typeCashDeskOperationsTable> = ({
    operationList,
    isLoading,
}) => {

    const { i18n } = useLingui();

    const { classes } = useStyles();

    return (
        <>
            { (isLoading || !operationList)
                ? <Box className={classes.skeletonContainer}><TableSkeleton isShort={true}/></Box>
                : operationList.length === 0
                    ? <EmptyElement
                        title1={ i18n._(t`The list of operations is empty.`) }/>
                    : operationList && <>
                        <Table variant="inTab">
                            <Table.Header>
                                <Table.Th withoutLeftDivider >
                                    <Trans>Date & time</Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans>Employee</Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans>Type</Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans>Amount before</Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans>Amount</Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans>Amount after</Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans>Comment</Trans>
                                </Table.Th>
                            </Table.Header>

                            <Table.Body>
                                { operationList.map((item) => {

                                    const createdDate = item
                                        ? new Date(item.createdAt).toLocaleDateString(undefined, {
                                            day: 'numeric',
                                            month: 'numeric',
                                            year: 'numeric',
                                        })
                                        : '-';

                                    const createdTime = item
                                        ? new Date(item.createdAt).toLocaleTimeString(undefined, {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric',
                                        })
                                        : '-';

                                    return (
                                        <Table.Tr key={ item.id } >
                                            <Table.Td>
                                                <Box>
                                                    { createdDate }, <span className={cn(classes.smallText, classes.tinyText)}>{createdTime}</span>
                                                </Box>
                                            </Table.Td>
                                            <Table.Td>{ item.employeeName }</Table.Td>
                                            <Table.Td><CashDeskOperationType operationType={item.type} /></Table.Td>
                                            <Table.Td><Flex gap={4}>{ addSignStyleToNumber(item.balanceBefore, classes.negativeSign) } <Box fw={400}>{item.currency}</Box></Flex></Table.Td>
                                            <Table.Td><Flex gap={4}>{ addSignStyleToNumber(item.amount, classes.negativeSign, classes.positiveSign) } <Box fw={400}>{item.currency}</Box></Flex></Table.Td>
                                            <Table.Td><Flex gap={4}>{ addSignStyleToNumber(item.balanceAfter, classes.negativeSign) } <Box fw={400}>{item.currency}</Box></Flex></Table.Td>
                                            <Table.Td>{ item.comment ? item.comment : '-' }</Table.Td>
                                        </Table.Tr>
                                    );

                                }) }
                            </Table.Body>
                        </Table>

                    </>
            }
        </>
    );

};
