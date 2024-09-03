import React from 'react';
import { Box, Text } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { EmptyElement } from 'shared/ui/empty-element';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { typeOrderedProductsTable } from './types';

export const TableOrderedProducts: React.FC<typeOrderedProductsTable> = ({ productList, }) => {

    const { i18n } = useLingui();


    return (
        <>
            {!productList
                ? <TableSkeleton/>
                : productList.length === 0
                    ? <EmptyElement
                        title1={i18n._(t`The list of sold products is empty.`)}/>
                    : productList && <>
                    <Table variant="inTab">
                        <Table.Header>
                            <Table.Th withoutLeftDivider>
                                <Trans>Product</Trans>
                            </Table.Th>
                            <Table.Th>
                                <Trans>Quantity</Trans>
                            </Table.Th>
                            <Table.Th>
                                <Trans>Price for unit</Trans>
                            </Table.Th>
                            <Table.Th>
                                <Trans>Discount <Text fw={600}>&nbsp; %/sum</Text></Trans>
                            </Table.Th>
                            <Table.Th>
                                <Box sx={{ lineHeight: '16px' }}>
                                    <Trans>Cost without<br/> discount</Trans>
                                </Box>
                            </Table.Th>
                            <Table.Th>
                                <Trans>Total cost</Trans>
                            </Table.Th>
                        </Table.Header>

                        <Table.Body>
                            {productList.map((item, index) => {

                                const discountInPercent = item?.discountPercent ? numberCurrencyFormat(item.discountPercent * 100 || 0) : numberCurrencyFormat(item?.discountAmount ? item.discountAmount / (item?.totalCost + (item.discountAmount ?? 0))*100 : 0);

                                return (
                                    <Table.Tr key={index}>
                                        <Table.Td><Box maw={400} miw={300} sx={{ wordBreak: 'break-all' }}>{item.name}</Box></Table.Td>
                                        <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{item?.quantity || '-'} {item?.unit.toLowerCase()}</Box></Table.Td>
                                        <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{item?.priceInStore ? numberCurrencyFormat(item?.priceInStore) : '-'}</Box></Table.Td>
                                        <Table.Td><Box maw={400}
                                                       sx={{ wordBreak: 'break-all' }}>{discountInPercent + '%' } / {numberCurrencyFormat(item?.discountAmount || 0)}</Box></Table.Td>
                                        <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{numberCurrencyFormat(item?.totalCost + (item.discountAmount ?? 0) || 0)}</Box></Table.Td>
                                        <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{numberCurrencyFormat(item?.totalCost || 0)}</Box></Table.Td>
                                    </Table.Tr>
                                );

                            })}
                        </Table.Body>
                    </Table>

                </>
            }
        </>
    );

};
