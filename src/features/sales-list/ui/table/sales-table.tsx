import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from 'shared/ui/pagination/table-pagination';
import { Box, Checkbox, rem, useMantineTheme, Text } from '@mantine/core';
import { typeAction } from 'shared/ui/table/ui/table-actions/types';
import { StoresListFilter } from 'features/stores-list-filter';
import { FilterPanel } from 'shared/ui/filter-panel';
import { typeSalesListTable } from 'features/sales-list/types/types';
import { SalesListTableHeader } from 'features/sales-list/ui/table/sales-table-header';
import { IconReceipt } from '@tabler/icons-react';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';

export const SalesListTable: React.FC<typeSalesListTable> = ({
    salesList,
    goToDetailsSalePage,
    pagination,
    headerActions,
    handlersListState,
    isAllowedExport,
    isLoading,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    // observer for checkbox in header - if all checked
    const allChecked = (salesList && salesList.length > 0) ? salesList?.every((value) => value?.checked) : false;

    // observer for checkbox in header - if something checked
    const indeterminate = salesList?.some((value) => value?.checked) && !allChecked;

    const onCheckedAllHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        event.stopPropagation();
        handlersListState.setState((current) => current.map((value) => ({
            ...value,
            checked: !allChecked,
        })));

    };

    const onCheckedItemHandler = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {

        event.stopPropagation();
        handlersListState.setItemProp(index, 'checked', event.currentTarget.checked);

    };
    return (<>
        <FilterPanel
            withFind={ { placeholder: i18n._(t`Type part of store name`) } }
            filterComponent={ <StoresListFilter/> }
        />

        { isLoading
            ? <TableSkeleton/>
            : salesList && <>
            <Table>
                <SalesListTableHeader
                    headerActions={ headerActions }
                    isAllowedExport={ isAllowedExport }
                    indeterminate={ indeterminate || false }
                    allChecked={ allChecked }
                    onCheckedAllHandler={ onCheckedAllHandler }/>

                <Table.Body>
                    { salesList.length > 0 && salesList.map((item, index) => {

                        const actions: typeAction[] = [
                            {
                                label: i18n._(t`Selected export`),
                                handler: () => console.log('click export in row'),
                                icon: <IconReceipt color={ theme.colors.primary[5] } width={ 22 }/>
                            },

                        ];

                        return (
                            <Table.Tr key={ item.id } handler={ () => goToDetailsSalePage(item.id, item.publicId) }>
                                <td onClick={ (event) => event.stopPropagation() } align={ 'center' } width={ 50 } style={ { cursor: 'auto' } }>

                                    <Checkbox size={ 'sm' }
                                              sx={ { '& input': { cursor: 'pointer' } } }
                                              checked={ item.checked }
                                              onChange={ (event) => onCheckedItemHandler(event, index) }/>

                                </td>
                                <Table.Td><Box sx={ { minWidth: rem(155) } }>{ item.createdAt }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(95) } }>{ item.receiptNumber }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(170) } }><Text truncate>{ item.storeName }</Text></Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(170) } }>{ item.productsCount }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(110) } }>{ numberCurrencyFormat(item.totalCost) }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(110) } }>payments</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(110) } }>{ 'total-price' }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(110) } }>{ 'refund' }</Box></Table.Td>

                                { isAllowedExport && <Table.TdActions actions={ actions } align={ 'center' }/> }
                            </Table.Tr>
                        );

                    }) }
                    { salesList.length === 0 && <Table.EmptyRow columnCount={ isAllowedExport ? 10 : 9 }>
                        <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                    </Table.EmptyRow> }
                </Table.Body>
            </Table>

            { pagination && <Pagination pagination={ pagination } withPerPage={ true }/> }
        </>
        }

    </>);

};
