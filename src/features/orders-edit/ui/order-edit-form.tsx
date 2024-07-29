import React, { useEffect, useState } from 'react';
import { useAppDispatchT, } from 'app/state';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { Button, Flex, Space, Tabs, } from '@mantine/core';
import { t } from '@lingui/macro';
import { useStyles } from 'features/orders-create/ui/styles';
import { useChangeOrderDataMutation, } from '../../../entities/orders/api/api';
import { useForm } from '@mantine/form';
import { fieldsInTabClient, fieldsInTabProduct, initialOrderForm, mapRequestFieldsToFormFieldOrders } from 'features/orders-create/form/form';
import { typeOrdersForm } from 'features/orders-create/types/types';
import { generatePath, useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { OrderProducts } from './order-products';
import { typeEditOrderRequest } from '../../../entities/orders/api/types';
import { getServicePaymentAmount } from 'features/orders-create/helpers/get-service-payment-amount';
import { mapProductsForCreateOrderObject } from 'features/orders-create/helpers/map-products-for-create-order-object';
import { notificationActions } from '../../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { routerPaths } from 'app/config/router-paths';
import { typeResponseError } from 'app/api/types';
import { typeOrder } from '../../../entities/orders/model/state-slice';
import { mapOrderedProductsToCart } from 'features/orders-edit/helpers/map-ordered-products-to-cart';
import { OrderClient } from 'features/orders-create/ui/order-client';
import { errorHandlerForForm } from 'app/utils/error-handler-for-form';
import { typeReturnForm } from 'features/selector-with-search-store/types';

const enum TYPE_TABS {
    CLIENT = 'client',
    PRODUCTS = 'products',
}

export const OrderEditForm: React.FC<{ orderData: typeOrder }> = ({ orderData }) => {


    const { classes } = useStyles();

    const navigate = useNavigate();

    const { i18n } = useLingui();

    const dispatchAppT = useAppDispatchT();

    const form = useForm<typeOrdersForm>({
        ...initialOrderForm,
        initialValues: {
            customer: {
                fullName: orderData.customer.fullName,
                email: orderData.customer.email || '',
                phone: orderData.customer.phone,

            },
            discount: (orderData.products[0]?.discountPercent && orderData.products[0].discountPercent !== undefined) ? (orderData.products[0].discountPercent *100).toFixed(2) : orderData.totalDiscountAmount.toString(),
            isDiscountInPercent: !!(orderData.products[0]?.discountPercent && orderData.products[0].discountPercent !== undefined),
            deliveryAddress: {
               address: orderData.deliveryAddress.address,
                additionalInfo: orderData.deliveryAddress.additionalInfo || ''
            },
            storeId: orderData.storeId,
            servicePayment: orderData.servicePaymentPercent ?(orderData.servicePaymentPercent * 100).toFixed(2): orderData.servicePaymentAmount.toString(),
            isServicePaymentInPercent: (orderData.servicePaymentPercent === 0 && orderData.servicePaymentAmount === 0 ) ? true : !!orderData.servicePaymentPercent,

            products: mapOrderedProductsToCart(orderData),
        }
    });

    const [ tab, setTab ] = useState(TYPE_TABS.CLIENT);

    const [ errorInTab, setErrorInTab ] = useState<TYPE_TABS | null>(null);

    const [ editOrder, { isLoading } ] = useChangeOrderDataMutation();

    const [ isInProgress, setIsInProgress ] = useState(false);


    useEffect(() => {

        const fieldWithErrors = Object.keys(form.errors);

        if (fieldWithErrors.length > 0) {

            const errorInClient = fieldsInTabClient.some((fieldName) => fieldWithErrors.includes(fieldName));
            const errorInProducts = fieldsInTabProduct.some((fieldName) => fieldWithErrors.includes(fieldName));
            if (errorInClient && tab !== TYPE_TABS.CLIENT) { setErrorInTab(TYPE_TABS.CLIENT);}
            if (errorInProducts && tab !== TYPE_TABS.PRODUCTS) { setErrorInTab(TYPE_TABS.PRODUCTS);}

        } else {
            setErrorInTab(null);
        }
    }, [ form.errors, tab ]);

    const onCancel = () => {

        form.reset();
        navigate(-1);

    };

    const onSave = async () => {
        if(form.values.storeId) {

            const orderObject: typeEditOrderRequest = {
                id: orderData.id,
                currentStatus: orderData.status,
                customer: {
                    fullName: form.values.customer.fullName,
                    phone: form.values.customer.phone,
                    email: form.values.customer.email.trim() === '' ? undefined : form.values.customer.email,
                },
                deliveryAddress: {
                    address: form.values.deliveryAddress.address.trim(),
                    additionalInfo: form.values.deliveryAddress.additionalInfo.trim() === '' ? undefined : form.values.deliveryAddress.additionalInfo.trim()
                },
                servicePaymentAmount: getServicePaymentAmount(form),
                servicePaymentPercent: form.values.isServicePaymentInPercent ? +(((+form.values.servicePayment) / 100).toFixed(4)) : 0,
                products: {
                    deleteAllExisting: true,
                    create: mapProductsForCreateOrderObject(form)
                },

            };

            try {

                const resp = await editOrder(orderObject).unwrap();

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: i18n._(t`Order edited successfully.`),
                }));

                navigate(generatePath(routerPaths.orders_details, { id: orderData.id}));

            } catch (err) {

                errorHandlerForForm(err as typeResponseError, 'onEditOrder', dispatchAppT,  form as unknown as typeReturnForm, mapRequestFieldsToFormFieldOrders);

                setIsInProgress(false);

            }

        }

    };

    return (

                <form onSubmit={ form.onSubmit(onSave) }>
                    <Tabs
                        defaultValue={ TYPE_TABS.CLIENT }
                        className={ classes.tab }
                        variant="outline"
                        value={ tab }
                        onTabChange={ (value) => { setTab(value as TYPE_TABS); } }
                    >
                        <Flex justify="space-between" align={ 'end' }>
                            <Tabs.List className={ classes.tab }>
                                <Tabs.Tab value={ TYPE_TABS.CLIENT } className={ errorInTab === TYPE_TABS.CLIENT ? classes.errorInTab : undefined }>{ i18n._(t`Client details`) }</Tabs.Tab>
                                <Tabs.Tab value={ TYPE_TABS.PRODUCTS } className={ errorInTab === TYPE_TABS.PRODUCTS ? classes.errorInTab : undefined }>{ i18n._(t`Products`) }</Tabs.Tab>
                            </Tabs.List>
                        </Flex>

                        <Tabs.Panel value={ TYPE_TABS.CLIENT }><OrderClient form={ form }/> </Tabs.Panel>
                        <Tabs.Panel value={ TYPE_TABS.PRODUCTS }><OrderProducts form={ form }/></Tabs.Panel>
                    </Tabs>
                    { (isInProgress || isLoading) && <LoaderOverlay/> }
                    <Space h={ 42 }/>
                    <Flex className={ classes.buttonsBar }>
                        <Button key="cancel" type="reset" variant="outline" onClick={ onCancel }>{ t`Cancel` }</Button>
                        <Button key="submit" disabled={ !!Object.values(form.errors).length || isInProgress }
                                type="submit">{ t`Save` }</Button>
                    </Flex>
                </form>

    );

};
