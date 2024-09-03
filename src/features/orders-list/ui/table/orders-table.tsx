import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {  PencilSquareIcon } from '@heroicons/react/24/outline';
import { FilterPanel } from 'shared/ui/filter-panel';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from 'shared/ui/pagination/table-pagination';
import { Box, Checkbox, Flex, rem, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { typeActionList, typeActionWithRequiredIcon } from 'shared/ui/table/ui/table-actions/types';
import { typeOrdersListTable } from 'features/orders-list/types/types';
import { OrdersListTableHeader } from 'features/orders-list/ui/table/orders-table-header';
import DateTimeInLine from 'shared/ui/date-time-in-line/date-time-in-line';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import BadgeOrdersStatus from 'shared/ui/badge-orders-status/badge-orders-status';
import { ModalCancelOrder } from 'features/orders-list/ui/modal/modal-cancel-order';
import { OrdersListFilter } from 'features/orders-list-filter';
import {  OrderStatuses } from '../../../../entities/orders/model/orders-statuses';
import { ModalChangeStatusWaitingDelivery } from 'features/orders-list/ui/modal/modal-change-status-waiting-delivery';
import { ModalAddCourier } from 'features/orders-list/ui/modal/modal-add-courier';
import { TdActionsOrders } from 'features/orders-list/ui/table/table-actions-for-orders/table-actions-orders';
import { isOrderPossibleToEdit } from '../../../../entities/orders/helpers/is-order-possible-to edit';
import { useChangeStatusProcessing } from 'features/orders-list/hooks/use-change-status-processing';

export const OrdersListTable: React.FC<typeOrdersListTable> = ({
    isAllowedEditByPermission,
    currentUser,
    goToEditPage,
    goToDetailsPage,
    // onClickRowActionsArchiveItem,
    ordersList,
    pagination,
    isLoading,
    headerActions,
    handlersListState,
    setPopupContent
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

    const{onChangeStatusInProcessing}=useChangeStatusProcessing()
    return (<>
        <FilterPanel
            withFind={ { placeholder: i18n._(t`Search by client’s phone number, delivery address, order number or order amount`) } }
            filterComponent={ <OrdersListFilter/> }
            isListLoading={isLoading}
        />

        { (isLoading)
            ? <TableSkeleton/>
            : ordersList && <>
            <Table>
                <OrdersListTableHeader
                    indeterminate={ indeterminate || false }
                    allChecked={ allChecked }
                    headerActions={ headerActions }
                    isAllowedEdit={ isAllowedEditByPermission }
                    onCheckedAllHandler={ onCheckedAllHandler }/>

                <Table.Body>
                    { ordersList.length > 0 && currentUser && ordersList.map((item, index) => {

                        const isPossible = isOrderPossibleToEdit(item, currentUser, isAllowedEditByPermission || false)

                        const actions: typeActionList | undefined =  [
                            {
                                label: i18n._(t`Edit`),
                                handler: () => goToEditPage(item.id),
                                icon: <PencilSquareIcon color={!isPossible ?theme.colors.gray[3] : theme.colors.primary[5] } width={ 22 }/>,
                                disabled: !isPossible,
                            },
                            {
                                label: i18n._(t`Assign courier `),
                                handler: () => setPopupContent(<ModalAddCourier data={ item } setOpen={ setPopupContent }  />),
                                disabled:  !isPossible

                            },
                            // {
                            //     label: i18n._(t`Assign assignee `),
                            //     handler: () => setPopupContent(<ModalChangeStatusInProgress data={ item } setOpen={ setPopupContent }  />),
                            //     disabled:  !isPossible
                            //
                            // },
                            {
                                label: i18n._(t`In process`),
                                handler: () => onChangeStatusInProcessing(item),
                                disabled:  item.status === OrderStatuses.PROCESSING ? true : !isPossible
                            },
                            {
                                label: i18n._(t`Waiting for delivery`),
                                handler: () => setPopupContent(<ModalChangeStatusWaitingDelivery data={ item } setOpen={ setPopupContent } /> ),
                                disabled:  item.status === OrderStatuses.WAITING_FOR_DELIVERY ? true :  !isPossible
                            },
                            {
                                label: i18n._(t`Cancelled`),
                                handler: () => setPopupContent(<ModalCancelOrder data={ item } setOpen={ setPopupContent }/>),
                                textColor: theme.colors.red[5],
                                disabled: !isPossible
                            },

                        ] ;

                        const finalActions: typeActionList | undefined = actions? [actions[0] as  typeActionWithRequiredIcon, ...actions.slice(1).filter(item=>!item.disabled)] : undefined

                        // actions.push({
                        //     label: i18n._(t`Archive`),
                        //     handler: () => onClickRowActionsArchiveItem(item),
                        //     icon: <ArchiveBoxXMarkIcon color={ theme.colors.primary[ 5 ] } width={ 22 }/>,
                        // });


                        return (
                            <Table.Tr key={ item.id } handler={ () => goToDetailsPage(item.id, '5') }>
                                {/* <td onClick={ (event) => event.stopPropagation() } align={ 'center' } width={ 50 } style={ { cursor: 'auto' } }> */ }

                                {/*     <Checkbox size={ 'sm' } */ }
                                {/*         sx={ { '& input': { cursor: 'pointer' } } } */ }
                                {/*         checked={ item.checked } */ }
                                {/*         onChange={ (event) => onCheckedItemHandler(event, index) }/> */ }

                                {/* </td> */ }
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
                                            { item.code ? item.code : '-' }
                                        </Flex>
                                        <Flex gap={ 10 } align={ 'center' } sx={ { color: theme.colors.gray[5] } }>
                                            <DateTimeInLine date={ item.orderedAt } fontWeightDate={ 500 } fontSizeDate={ '14px' }/>
                                        </Flex>
                                    </Flex>
                                </Table.Td>
                                {/* <Table.Td><Box sx={ { width: rem(100) } }><Tooltip label={ item.assigneeName || 'Not assigned' }><Text truncate>{ item.assigneeName || '-' }</Text></Tooltip></Box></Table.Td> */}
                                <Table.Td><Box sx={ { width: rem(190) , minWidth: rem(190) } }><Text truncate>{ item.storeName || '-' }</Text></Box></Table.Td>

                                <Table.Td align={ 'center' }><Box sx={ { width: rem(110), maxWidth: rem(140) } }>{ item.totalCost ? numberCurrencyFormat(item.totalCost) : '-' }</Box></Table.Td>
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
                                        <Flex gap={ 10 } align={ 'center' } sx={ { color: theme.colors.gray[5] } }>
                                            { item.customer.phone ? formatIncompletePhoneNumber(item.customer.phone) : '-' }
                                        </Flex>
                                    </Flex></Table.Td>
                                <Table.Td><Box sx={ { width: rem(110) } }><Tooltip label={ item.courierName || 'Not assigned' }><Text truncate>{ item.courierName || '-' }</Text></Tooltip></Box></Table.Td>
                                <Table.Td><BadgeOrdersStatus statusCode={ item.status } key={ index + item.status }/></Table.Td>

                                { (isAllowedEditByPermission && finalActions) ? <TdActionsOrders actions={ finalActions } dividerIndex={ 1 }/> : <Table.Td/> }
                            </Table.Tr>
                        );

                    }) }
                    { ordersList.length === 0 && <Table.EmptyRow columnCount={ isAllowedEditByPermission ? 8 : 7 }>
                        <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                    </Table.EmptyRow> }
                </Table.Body>
            </Table>

            { pagination && <Pagination pagination={ pagination } withPerPage={ true }/> }
        </>
        }

    </>);

};
