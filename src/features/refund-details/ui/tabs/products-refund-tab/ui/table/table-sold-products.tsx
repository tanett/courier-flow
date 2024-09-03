import React from 'react';
import { Box, Text } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { EmptyElement } from 'shared/ui/empty-element';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import {typeRefundsProductsTable} from "./types";
import ButtonAsLink from 'shared/ui/button-as-link/button-as-link';


export const TableSoldProducts: React.FC<typeRefundsProductsTable> = ({
    productList,
    isLoading,
    onSoldProductClick
}) => {

    const { i18n } = useLingui();

    const onProductNameClick = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>, productName: string)=>{
        e.stopPropagation();
       onSoldProductClick(productName)
    }

    return (
        <>
            { (isLoading || !productList)
                ? <TableSkeleton/>
                : productList.length === 0
                    ? <EmptyElement
                        title1={ i18n._(t`The list of sold products is empty.`) }/>
                    : productList && <>
                        <Table variant="inTab">
                            <Table.Header>
                                <Table.Th withoutLeftDivider>
                                    <Trans>Product name</Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans>Quantity</Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans>Price for unit</Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans>VAT <Text fw={500}>&nbsp; %/sum</Text></Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans>Discount <Text fw={500}>&nbsp; %/sum</Text></Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans id={'Refund amount'}>Total cost</Trans>
                                </Table.Th>
                            </Table.Header>

                            <Table.Body>
                                { productList.map((item) => {

                                    return (
                                        <Table.Tr key={ item.id } >
                                            <Table.Td><Box maw={400} miw={300} sx={{ wordBreak: 'break-all' }}><ButtonAsLink onClick={(e)=>onProductNameClick(e, item.name)} label={ item.name }/></Box></Table.Td>
                                            <Table.Td align={'center'}><Box maw={400} sx={{ wordBreak: 'break-all' }}>{ item.quantity }</Box></Table.Td>
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{ item.unitPrice }</Box></Table.Td>
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{ item.vatPercent }% / {numberCurrencyFormat(item.vatAmount)}</Box></Table.Td>
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{item?.discountPercent ? item?.discountPercent+'% ': '-' }/{ item?.discountAmount ? numberCurrencyFormat(item.discountAmount) : '-'}</Box></Table.Td>
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{numberCurrencyFormat(item.totalCost)}</Box></Table.Td>
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
