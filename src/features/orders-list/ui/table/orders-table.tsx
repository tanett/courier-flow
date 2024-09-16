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
import {  OrderStatuses } from 'entities-project/orders/model/orders-statuses';

import { TdActionsOrders } from 'features/orders-list/ui/table/table-actions-for-orders/table-actions-orders';
import { isOrderPossibleToEdit } from 'entities-project/orders/helpers/is-order-possible-to edit';
import { useChangeStatusDelivering } from 'features/orders-list/hooks/use-change-status-delivering';
import { OrdersListFilter } from 'features/orders-list-filter';
import { IconTruckDelivery } from '@tabler/icons-react';
import { ShoppingCartIcon } from '@heroicons/react/16/solid';
import { TdActions } from 'shared/ui/table/ui/table-actions/table-actions';
import { useCreateSaleFromOrder } from 'entities-project/sales/hooks/use-create-sale-from-order';
import { generatePath, useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';

export const OrdersListTable: React.FC<typeOrdersListTable> = ({
    isAllowedEditByPermission,
    currentUser,
    goToDetailsPage,
    ordersList,
    pagination,
    isLoading,
    setPopupContent
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const navigate = useNavigate();

    const{onChangeStatusInDelivering}=useChangeStatusDelivering()

    const {createSale, isSaleLoading} = useCreateSaleFromOrder()

    return (<>
        <FilterPanel
            withFind={ { placeholder: i18n._(t`Search by client’s phone number, delivery address, order number or order amount`) } }
            filterComponent={ <OrdersListFilter/> }
            isListLoading={isLoading}
        />

        { (isLoading || isSaleLoading)
            ? <TableSkeleton/>
            : ordersList && <>
            <Table>
                <OrdersListTableHeader
                    isAllowedEdit={ isAllowedEditByPermission }
                    />

                <Table.Body>
                    { ordersList.length > 0 && currentUser && ordersList.map((item, index) => {

                        const isPossible = isOrderPossibleToEdit(item, currentUser, isAllowedEditByPermission || false)

                        const actions: typeActionList | undefined =  [
                            {
                                label: i18n._(t`Took for delivery`),
                                handler: () => onChangeStatusInDelivering(item),
                                icon: <IconTruckDelivery color={(!isPossible || item.status!== OrderStatuses.WAITING_FOR_DELIVERY) ?theme.colors.gray[3] : theme.colors.primary[5] } width={ 22 }/>,
                                disabled: !isPossible || item.status!== OrderStatuses.WAITING_FOR_DELIVERY,
                            },
                            {
                                label: i18n._(t`Edit product list and sale`),
                                handler: () => navigate(generatePath(routerPaths.orders_edit,{id: item.id})),
                                icon: <PencilSquareIcon color={(!isPossible || item.status!== OrderStatuses.DELIVERING)?theme.colors.gray[3] : theme.colors.primary[5] } width={ 22 }/>,
                                disabled: !isPossible || item.status!== OrderStatuses.DELIVERING,
                            },
                            {
                                label: i18n._(t`Complete with sale`),
                                handler: () => createSale(item.id),
                                icon: <ShoppingCartIcon color={(!isPossible || item.status!== OrderStatuses.DELIVERING)?theme.colors.gray[3] : theme.colors.primary[5] } width={ 22 }/>,
                                disabled: !isPossible || item.status!== OrderStatuses.DELIVERING,
                            },


                        ] ;

                        const finalActions: typeActionList | undefined = actions? [actions[0] as  typeActionWithRequiredIcon, ...actions.slice(1).filter(item=>!item.disabled)] : undefined

                        // actions.push({
                        //     label: i18n._(t`Archive`),
                        //     handler: () => onClickRowActionsArchiveItem(item),
                        //     icon: <ArchiveBoxXMarkIcon color={ theme.colors.primary[ 5 ] } width={ 22 }/>,
                        // });


                        return (
                            <Table.Tr key={ item.id + item.status } handler={ () => goToDetailsPage(item.id, item.code) }>

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
                                <Table.Td>{ <BadgeOrdersStatus statusCode={ item.status } key={ item.status }/> }</Table.Td>

                                { (isAllowedEditByPermission && finalActions) ? <TdActions actions={ finalActions } visibleCount={3}/> : <Table.Td/> }
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
