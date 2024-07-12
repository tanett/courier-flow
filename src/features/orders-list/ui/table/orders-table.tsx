import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ArchiveBoxXMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { FilterPanel } from 'shared/ui/filter-panel';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from 'shared/ui/pagination/table-pagination';
import { Box, Checkbox, Flex, rem, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { typeAction } from 'shared/ui/table/ui/table-actions/types';
import { typeOrdersListTable } from 'features/orders-list/types/types';
import { OrdersListTableHeader } from 'features/orders-list/ui/table/orders-table-header';
import DateTimeInLine from 'shared/ui/date-time-in-line/date-time-in-line';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import BadgeOrdersStatus from 'shared/ui/badge-orders-status/badge-orders-status';
import { OrderStatuses } from 'entities/orders/model/orders-statuses';

export const OrdersListTable: React.FC<typeOrdersListTable> = ({
    isAllowedEdit,
    currentUser,
    goToEditPage,
    goToDetailsPage,
   // onClickRowActionsArchiveItem,
    ordersList,
    pagination,
    isLoading,
    headerActions,
    handlersListState,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();


    // observer for checkbox in header - if all checked
    const allChecked = (ordersList && ordersList.length > 0) ? ordersList?.every((value) => value?.checked) : false;

    // observer for checkbox in header - if something checked
    const indeterminate = ordersList?.some((value) => value?.checked) && !allChecked;

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
            withFind={ { placeholder: i18n._(t`Search by client’s phone number, delivery address, order number or order amount`) } }
            // filterComponent={ <ProductsListFilter/> }
        />

        { (isLoading)
            ? <TableSkeleton/>
            : ordersList && <>
                <Table>
                    <OrdersListTableHeader
                        indeterminate={ indeterminate || false }
                        allChecked={ allChecked }
                        headerActions={ headerActions }
                        isAllowedEdit={ isAllowedEdit }
                        onCheckedAllHandler={ onCheckedAllHandler }/>

                    <Table.Body>
                        { ordersList.length > 0 && ordersList.map((item, index) => {

                            const actions: typeAction[] = [
                                {
                                    label: i18n._(t`Edit`),
                                    handler: () => goToEditPage(item.id),
                                    icon: <PencilSquareIcon color={ theme.colors.primary[ 5 ] } width={ 22 }/>,
                                }
                            ];

                            // actions.push({
                            //     label: i18n._(t`Archive`),
                            //     handler: () => onClickRowActionsArchiveItem(item),
                            //     icon: <ArchiveBoxXMarkIcon color={ theme.colors.primary[ 5 ] } width={ 22 }/>,
                            // });



                            return (
                                <Table.Tr key={ item.id } handler={ () => goToDetailsPage(item.id, '5') }>
                                    {/* <td onClick={ (event) => event.stopPropagation() } align={ 'center' } width={ 50 } style={ { cursor: 'auto' } }> */}

                                    {/*     <Checkbox size={ 'sm' } */}
                                    {/*         sx={ { '& input': { cursor: 'pointer' } } } */}
                                    {/*         checked={ item.checked } */}
                                    {/*         onChange={ (event) => onCheckedItemHandler(event, index) }/> */}

                                    {/* </td> */}
                                    <Table.Td>
                                        <Flex direction={ 'column' } sx={ {
                                            maxWidth: '140px',
                                            minWidth: '80px',
                                            flexGrow: 1
                                        } }>
                                            <Flex gap={ 10 } align={ 'center' } sx={ {
                                                borderBottom: `1px solid ${ theme.colors.gray[3] }`,
                                                wordBreak: 'break-all',
                                                maxWidth: '100%'
                                            } }>
                                                {item.code ? item.code : '-'}
                                            </Flex>
                                            <Flex gap={ 10 } align={ 'center' } sx={{color: theme.colors.gray[5]}}>
                                                <DateTimeInLine date={ item.orderedAt } fontWeightDate={ 500 } fontSizeDate={ '14px' }/>
                                            </Flex>
                                        </Flex>
                                    </Table.Td>
                                    <Table.Td><Box sx={ { width: rem(100) } }><Tooltip label={item.assigneeId || '-'}><Text truncate>{ item.assigneeId || '-' }</Text></Tooltip></Box></Table.Td>
                                    <Table.Td><Box sx={ { width: rem(170) } }><Text truncate>{ item.storeId || '-' }</Text></Box></Table.Td>

                                    <Table.Td align={ 'center' }><Box sx={ { width: rem(110),} }>{ item.totalCost ? numberCurrencyFormat(item.totalCost): '-' }</Box></Table.Td>
                                    <Table.Td>
                                        <Flex direction={ 'column' } sx={ {
                                            maxWidth: '123px',
                                            flexGrow: 1
                                        } }>
                                            <Flex gap={ 10 } align={ 'center' } sx={ {
                                                borderBottom: `1px solid ${ theme.colors.gray[3] }`,
                                                wordBreak: 'break-all',
                                                maxWidth: '100%'
                                            } }>
                                                <Text truncate>{ item?.customer?.fullName || '-' }</Text>
                                            </Flex>
                                            <Flex gap={ 10 } align={ 'center' } sx={{color: theme.colors.gray[5]}}>
                                                { item.customer.phone ? formatIncompletePhoneNumber(item.customer.phone) : '-' }
                                            </Flex>
                                        </Flex></Table.Td>
                                    <Table.Td><Box sx={ { width: rem(110) } }><Tooltip label={item.courierId || '-'}><Text truncate>{ item.courierId || '-' }</Text></Tooltip></Box></Table.Td>
                                    <Table.Td><BadgeOrdersStatus statusCode={item.status}/></Table.Td>

                                    { isAllowedEdit && <Table.TdActions actions={ actions }/> }
                                </Table.Tr>
                            );

                        }) }
                        { ordersList.length === 0 && <Table.EmptyRow columnCount={ isAllowedEdit ? 9 : 8 }>
                            <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                        </Table.EmptyRow> }
                    </Table.Body>
                </Table>

                { pagination && <Pagination pagination={ pagination } withPerPage={ true }/> }
            </>
        }

    </>);

};
