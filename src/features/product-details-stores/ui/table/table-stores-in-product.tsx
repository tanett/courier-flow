import React from 'react';
import { Box, Flex, useMantineTheme , Text} from '@mantine/core';
import { ArchiveBoxXMarkIcon, ArrowRightStartOnRectangleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { EmptyElement } from 'shared/ui/empty-element';
import { typeAction } from 'shared/ui/table/ui/table-actions/types';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { typeProductStoresAndPricesTable } from 'features/product-details-stores/ui/table/types';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';


export const TableDetailsStoresInProduct: React.FC<typeProductStoresAndPricesTable> = ({
    retailProductList,
    isLoading,
    onOpenDialogChangePriceRetailProduct,
    onOpenDialogDeleteRetailProduct,
    isAllowEditProduct
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    return (
        <>
            { (isLoading || !retailProductList)
                ? <TableSkeleton/>
                : retailProductList.length === 0
                    ? <EmptyElement
                        title1={ i18n._(t`This product is not sold in any store.`) }/>
                    : retailProductList && <>
                        <Table variant="inTab">
                            <Table.Header>
                                <Table.Th withoutLeftDivider>
                                    <Trans id={'item-name'}>Name</Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans>Price</Trans>
                                </Table.Th>
                                <Table.Th align={'center'}>
                                    <Flex maw={150}><Trans>Actions</Trans></Flex>
                                </Table.Th>
                            </Table.Header>

                            <Table.Body>
                                { retailProductList.map((item) => {

                                    const actions: typeAction[] = [

                                        {
                                            label: i18n._(t`Edit the price`),
                                            handler: () => onOpenDialogChangePriceRetailProduct(item.id),
                                            icon: <PencilSquareIcon color={ theme.colors.primary[ 5 ] } width={ 22 }/>,
                                        },

                                        {
                                            icon: <ArchiveBoxXMarkIcon color={ theme.colors.primary[5] } width={ 22 }/>,
                                            handler: () => onOpenDialogDeleteRetailProduct(item.id),
                                            label: i18n._(t`Delete`),
                                        }
                                    ];

                                    return (
                                        <Table.Tr key={ item.id } >
                                            <Table.Td><Box sx={{ minWidth: '300px', maxWidth:'800px', }}><Text truncate>{ item?.store?.name || '-' }</Text></Box></Table.Td>
                                            <Table.Td><Box maw={220} miw={100} >{ item?.price ? numberCurrencyFormat(item.price) : '-' }</Box></Table.Td>
                                            { isAllowEditProduct && <Table.TdActions align={'center'} actions={ actions }/>}
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
