import React from 'react';
import { Box, Text } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { EmptyElement } from 'shared/ui/empty-element';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import ButtonAsLink from 'shared/ui/button-as-link/button-as-link';
import { typeSoldProductsTable } from './types';
import { typeAdvanceProduct } from 'entities/advances/model/state-slice';

export const TableSoldProducts: React.FC<typeSoldProductsTable> = ({
    productList,
    isLoading,
    onSoldProductClick
}) => {

    const { i18n } = useLingui();

    const onProductNameClick = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>, soldProduct: typeAdvanceProduct)=>{
        e.stopPropagation();
        onSoldProductClick(soldProduct)

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
                                    <Trans>Total price</Trans>
                                </Table.Th>
                            </Table.Header>

                            <Table.Body>
                                { productList.map((item , index) => {

                                    return (
                                        <Table.Tr key={ index} >
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}><ButtonAsLink onClick={(e)=>onProductNameClick(e, item)} label={ item.name }/></Box></Table.Td>
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{ item?.quantity || '-' }</Box></Table.Td>
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{item?.priceInStore  ? numberCurrencyFormat(item?.priceInStore ) : '-' }</Box></Table.Td>
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{ item?.vatPercent || '-' }% / {numberCurrencyFormat(item.vatAmount)}</Box></Table.Td>
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{ numberCurrencyFormat(item?.discountAmount || 0) }% / {numberCurrencyFormat(item.discountAmount)}</Box></Table.Td>
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{numberCurrencyFormat(item.totalCost )}</Box></Table.Td>
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
