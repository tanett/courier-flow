import React, { useState } from 'react';
import { ActionIcon, Box, Divider, Flex, Menu, Tabs, Tooltip, useMantineTheme } from '@mantine/core';
import { t } from '@lingui/macro';
import { useStyles } from './styles';
import { useLingui } from '@lingui/react';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { queryParamsNames } from 'app/config/api-constants';
import { EllipsisVerticalIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { generatePath, useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import { typeOrder } from 'entities/orders/model/state-slice';
import { OrdersDetailsCommon } from 'features/orders-details/ui/orders-details-common';
import { OrdersDetailsOrderedProductsList } from 'features/orders-details/ui/orders-details-products';
import { getRefusedProducts } from 'features/orders-details/helpers/get-refused-products';
import { OrdersDetailsRefusedProductsList } from 'features/orders-details/ui/orders-details-refused-products';
import cn from 'classnames';
import { OrderStatusAvailableForEdit, OrderStatuses } from '../../../entities/orders/model/orders-statuses';
import { ModalChangeStatusWaitingDelivery } from 'features/orders-list/ui/modal/modal-change-status-waiting-delivery';
import { ModalCancelOrder } from 'features/orders-list/ui/modal/modal-cancel-order';
import { Modal } from 'shared/ui/modal';
import { typeGetCurrentUserResponse } from '../../../entities/user-profile/api/types';
import { ModalAddCourier } from 'features/orders-list/ui/modal/modal-add-courier';
import { isOrderPossibleToEdit } from '../../../entities/orders/helpers/is-order-possible-to edit';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { editOrdersPermissions } from 'app/config/permissions-config';
import { useChangeStatusProcessing } from 'features/orders-list/hooks/use-change-status-processing';


const enum TYPE_TABS {
    COMMON = 'common',
    PRODUCTS = 'products',
    REFUSED_PRODUCTS = 'refused_products'
}

const OrdersTabs: React.FC<{ orderData: typeOrder, currentUser: typeGetCurrentUserResponse }> = ({
    orderData,
    currentUser
}) => {

    const { classes } = useStyles();

    const theme = useMantineTheme();

    const navigate = useNavigate();

    const { i18n } = useLingui();

    const isAllowedEditByPermission = useIsAllowedPermissions(editOrdersPermissions);

    const isPossibleToEdit = isOrderPossibleToEdit(orderData, currentUser, isAllowedEditByPermission || false);

    const urlParams = useUrlParams();

    const [ tab, setTab ] = useState<TYPE_TABS | null>(TYPE_TABS.COMMON);

    if (urlParams.tab && urlParams.tab !== tab ) {

        setTab(urlParams.tab as TYPE_TABS);

    }

    const goToEditPage = (id: string | number) => navigate(generatePath(routerPaths.orders_edit, { id: id }),);

    const{onChangeStatusInProcessing}=useChangeStatusProcessing()

    const refusedProducts = getRefusedProducts(orderData.products);

    const [ popupContent, setPopupContent ] = useState<React.ReactNode | null>(null);

    const dropdownMenuArr: { label: string, handler: () => void, disabled: boolean, textColor?: string }[] | undefined = [

        {
            label: i18n._(t`Assign courier `),
            handler: () => setPopupContent(<ModalAddCourier data={ orderData } setOpen={ setPopupContent }/>),
            disabled: !isPossibleToEdit
        },
        {
            label: i18n._(t`In process`),
            handler: () => onChangeStatusInProcessing(orderData),
            disabled:orderData.status === OrderStatuses.PROCESSING ? true :  !isPossibleToEdit
        },
        {
            label: i18n._(t`Waiting for delivery`),
            handler: () => setPopupContent(<ModalChangeStatusWaitingDelivery data={ orderData } setOpen={ setPopupContent }/>),
            disabled: orderData.status === OrderStatuses.WAITING_FOR_DELIVERY ? true :  !isPossibleToEdit
        },
        {
            label: i18n._(t`Cancelled`),
            handler: () => setPopupContent(<ModalCancelOrder data={ orderData } setOpen={ setPopupContent }/>),
            disabled: !isPossibleToEdit,
            textColor: theme.colors.red[5]
        },

    ].filter(item=>!item.disabled);

    return (

        <Tabs
            defaultValue={ TYPE_TABS.COMMON }
            className={ classes.tab }
            variant="outline"
            value={ tab }
            onTabChange={ (value) =>   urlParams.setNewTab( value ) }

        >
            <Flex justify="space-between" align={ 'end' }>
                <Tabs.List className={ classes.tab }>
                    <Tabs.Tab value={ TYPE_TABS.COMMON }>{ i18n._(t`Main`) }</Tabs.Tab>
                    <Tabs.Tab value={ TYPE_TABS.PRODUCTS }>{ i18n._(t`Ordered products`) }</Tabs.Tab>
                    { refusedProducts.length > 0 && <Tabs.Tab value={ TYPE_TABS.REFUSED_PRODUCTS }>{ i18n._(t`Refused products`) }</Tabs.Tab> }
                </Tabs.List>
                { OrderStatusAvailableForEdit.includes(orderData.status as OrderStatuses) && <Flex align={ 'center' } justify={ 'center' } h={ 36 }>
                    { <Tooltip withArrow arrowSize={ 6 } radius="md" label={ i18n._(t`Go to editing page`) }>
                        <ActionIcon variant="subtle"
                                    disabled={ !isPossibleToEdit }
                                    onClick={ (e) => {
                                        e.stopPropagation();
                                        goToEditPage(orderData.id);
                                    } }>
                            <PencilSquareIcon color={ isPossibleToEdit ? theme.colors.primary[5] : theme.colors.gray[5] } width={ 24 } height={ 24 }/>
                        </ActionIcon>
                    </Tooltip> }
                    <Box key="dots" className={ cn(classes.icon, classes.divider) }>
                        <Menu trigger="click" openDelay={ 100 } closeDelay={ 400 } position="bottom-end" offset={ 3 }>
                            <Menu.Target>
                                <ActionIcon variant="subtle">
                                    <EllipsisVerticalIcon color={ theme.colors.gray[5] } width={ 22 }/>
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>

                                {
                                    dropdownMenuArr && dropdownMenuArr.map((item, index) => <React.Fragment key={ index }>
                                        { index === 1 && <Divider size={ 'xs' } color={ theme.colors.gray[2] }/> }
                                        <Menu.Item
                                            key={ index }
                                            className={ classes.menuItem }
                                            disabled={ item.disabled }
                                            sx={ { color: item.textColor ? item.textColor : undefined, } }
                                            onClick={ (e) => {

                                                e.stopPropagation();
                                                item.handler();

                                            } }
                                        >
                                            { item.label }
                                        </Menu.Item>
                                    </React.Fragment>)

                                }
                            </Menu.Dropdown>
                        </Menu>

                    </Box>
                </Flex> }
            </Flex>

            <Tabs.Panel value={ TYPE_TABS.COMMON }><OrdersDetailsCommon data={ orderData }/></Tabs.Panel>
            <Tabs.Panel value={ TYPE_TABS.PRODUCTS }><OrdersDetailsOrderedProductsList orderData={ orderData }/></Tabs.Panel>
            { refusedProducts.length > 0 && <Tabs.Panel value={ TYPE_TABS.REFUSED_PRODUCTS }><OrdersDetailsRefusedProductsList orderData={ orderData }/></Tabs.Panel> }

            { popupContent && <Modal modalWidth="auto" opened={ true } onCloseByOverlay={ () => setPopupContent(null) }>
                <Modal.Body>
                    { popupContent }
                </Modal.Body>
            </Modal> }
        </Tabs>
    );

};

export default OrdersTabs;
