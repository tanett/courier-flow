import React from 'react';
import { Box } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { EmptyElement } from 'shared/ui/empty-element';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { typeSoldProductsTable } from 'features/sales-details-sold-products-list/ui/table/types';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import ButtonAsLink from 'shared/ui/button-as-link/button-as-link';

export const TableSoldProducts: React.FC<typeSoldProductsTable> = ({
    productList,
    isLoading,
    onSoldProductClick
}) => {

    const { i18n } = useLingui();

    const onProductNameClick = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>, soldProductName: string)=>{
        e.stopPropagation();
        onSoldProductClick(soldProductName)
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
                                    <Trans>VAT  %/sum</Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans>Discount %/sum</Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans>Total price</Trans>
                                </Table.Th>
                            </Table.Header>

                            <Table.Body>
                                { productList.map((item , index) => {

                                    return (
                                        <Table.Tr key={ index} >
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}><ButtonAsLink onClick={(e)=>onProductNameClick(e, item.name)} label={ item.name }/></Box></Table.Td>
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{ item?.quantity || '-' }</Box></Table.Td>
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{item?.unitPrice  ? numberCurrencyFormat(item?.unitPrice ) : '-' }</Box></Table.Td>
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{ item?.vatPercent || '-' }% / {numberCurrencyFormat(item.vatAmount)}</Box></Table.Td>
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{ numberCurrencyFormat(item?.discountPercent || 0) }% / {numberCurrencyFormat(item.discountAmount)}</Box></Table.Td>
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
