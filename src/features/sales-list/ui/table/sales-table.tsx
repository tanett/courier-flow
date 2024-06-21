import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from 'shared/ui/pagination/table-pagination';
import { Box, Checkbox, rem, useMantineTheme, Text } from '@mantine/core';
import { typeAction } from 'shared/ui/table/ui/table-actions/types';
import { FilterPanel } from 'shared/ui/filter-panel';
import { typeSalesListTable } from 'features/sales-list/types/types';
import { SalesListTableHeader } from 'features/sales-list/ui/table/sales-table-header';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import dayjs from 'dayjs';
import PaymentsList from 'shared/ui/payments/payments-list';
import ButtonAsLink from 'shared/ui/button-as-link/button-as-link';
import { SalesListFilter } from 'features/sales-list-filter';
import { ReceiptIcon } from 'shared/images/icons/receipt';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';

export const SalesListTable: React.FC<typeSalesListTable> = ({
    salesList,
    goToDetailsSalePage,
    pagination,
    headerActions,
    handlersListState,
    isAllowedExport,
    isLoading,
    onOpenReceipt
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const navigate = useNavigate();

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

    const onRefundCounterClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, receiptNumber: string,) => {
        e.stopPropagation()
        navigate([routerPaths.refunds, `?q=${receiptNumber}` ].join('/'))
    }
    return (<>
        <FilterPanel
            withFind={ { placeholder: i18n._(t`Search by receipt number or total cost`) } }
            filterComponent={ <SalesListFilter/> }
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
                                label: i18n._(t`Receipt`),
                                handler: () => onOpenReceipt(item.id),
                                icon: <ReceiptIcon color={theme.colors.primary[4]} width={22} height={22}/>,
                            },

                        ];
                        const data = (date: string) => {
                            const dateStr = dayjs(date).format('DD.MM.YYYY');
                            const timeStr = dayjs(date).format('HH:mm:ss');
                            return (<Box>
                                <Text sx={ { lineHeight: rem(20) } }>{ dateStr }</Text>
                                <Text sx={ {
                                    color: theme.colors.gray[5],
                                    fontWeight: 400,
                                    lineHeight: rem(16)
                                } }>{ timeStr }</Text>

                            </Box>);
                        };

                        return (
                            <Table.Tr key={ item.id } handler={ () => goToDetailsSalePage(item.id, item.publicId) }>
                                <td onClick={ (event) => event.stopPropagation() } align={ 'center' } width={ 50 } style={ { cursor: 'auto' } }>

                                    <Checkbox size={ 'sm' }
                                              sx={ { '& input': { cursor: 'pointer' } } }
                                              checked={ item.checked }
                                              onChange={ (event) => onCheckedItemHandler(event, index) }/>

                                </td>
                                <Table.Td><Box sx={ { minWidth: rem(155) } }>{ data(item.createdAt) }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(65) } }>{ item.receiptNumber }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(170) } }><Text truncate>{ item.storeName }</Text></Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(170) } }>{ item.soldByName }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(110) } }>{ numberCurrencyFormat(item.totalCost) }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(110) } }><PaymentsList sale={ item }/></Box></Table.Td>
                                <Table.Td><Box sx={ {
                                    minWidth: rem(55),
                                    textAlign: 'center'
                                } }>{ item.refundsCount ? <ButtonAsLink onClick={(e)=>onRefundCounterClick(e, item.receiptNumber.toString())} label={item.refundsCount.toString()}/> : '-' }</Box></Table.Td>
                                <Table.TdActions actions={ actions } align={ 'center' }/>
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
