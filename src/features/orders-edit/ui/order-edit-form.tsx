import React, { useEffect, useState } from 'react';
import { useAppDispatchT, } from 'app/state';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { Button, Flex, Space, Tabs, } from '@mantine/core';
import { t } from '@lingui/macro';
import { useStyles } from 'features/orders-create/ui/styles';
import { useChangeOrderDataMutation, usePatchOrderForSaleWithChangeProductsMutation, } from '../../../entities-project/orders/api/api';
import { useForm } from '@mantine/form';
import { fieldsInTabClient, fieldsInTabProduct, mapRequestFieldsToFormFieldOrders } from 'features/orders-create/form/form';
import { typeOrdersForm } from 'features/orders-create/types/types';
import { generatePath, useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { OrderProducts } from './order-products';
import {  typePatchOrderForSaleWithEditProductsList, typeProductToPatch } from '../../../entities-project/orders/api/types';
import { getServicePaymentAmount } from 'features/orders-create/helpers/get-service-payment-amount';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { routerPaths } from 'app/config/router-paths';
import { typeResponseError } from 'app/api/types';
import { typeOrder } from '../../../entities-project/orders/model/state-slice';
import { mapOrderedProductsToCart } from 'features/orders-edit/helpers/map-ordered-products-to-cart';
import { errorHandlerForForm, typeReturnForm } from 'app/utils/error-handler-for-form';
import { initialEditOrderForm } from 'features/orders-edit/form/form';
import { OrderStatuses } from 'entities-project/orders/model/orders-statuses';
import { useCreateSaleFromOrderWithChangeProducts } from 'entities-project/sales/hooks/use-create-sale-from-order-with-chnge-products';
import { notificationActions } from 'entities-project/notification/model';


export const OrderEditForm: React.FC<{ orderData: typeOrder }> = ({ orderData }) => {


    const { classes } = useStyles();

    const navigate = useNavigate();

    const { i18n } = useLingui();

    const dispatchAppT = useAppDispatchT();

    const {createSale}=useCreateSaleFromOrderWithChangeProducts()

    const form = useForm<typeOrdersForm>({
        ...initialEditOrderForm,
        initialValues: {
            customer: {
                fullName: orderData.customer.fullName,
                email: orderData.customer.email || '',
                phone: orderData.customer.phone,

            },
            discount: (orderData.products[0]?.discountPercent && orderData.products[0].discountPercent !== undefined) ? (orderData.products[0].discountPercent * 100).toFixed(2) : orderData.totalDiscountAmount.toString(),
            isDiscountInPercent: !!(orderData.products[0]?.discountPercent && orderData.products[0].discountPercent !== undefined),
            deliveryAddress: {
                address: orderData.deliveryAddress.address,
                additionalInfo: orderData.deliveryAddress.additionalInfo || ''
            },
            storeId: orderData.storeId,
            servicePayment: orderData.servicePaymentPercent ? (orderData.servicePaymentPercent * 100).toFixed(2) : orderData.servicePaymentAmount.toString(),
            isServicePaymentInPercent: (orderData.servicePaymentPercent === 0 && orderData.servicePaymentAmount === 0) ? true : !!orderData.servicePaymentPercent,

            products: mapOrderedProductsToCart(orderData),
        }
    });



    const [ editOrder, { isLoading } ] = usePatchOrderForSaleWithChangeProductsMutation();

    const [ isInProgress, setIsInProgress ] = useState(false);



    const onCancel = () => {

        form.reset();
        navigate(-1);

    };

    const onSave = async () => {
        if (form.values.storeId) {


            const changedProductsByAmount = orderData.products.map(item => {

                const productInForm = form.values.products.find(product => product.id === item.id);

                let declinedMarcLabels: string[] = [];

                if (!productInForm || item.quantity > +productInForm.amount) {
                    declinedMarcLabels = item.markedLabels.filter(item => productInForm? !productInForm.markedLabels.includes(item): true);
                }

                const productToPatch:typeProductToPatch ={
                    id: item.id,
                    discountPercent: item.discountPercent,
                    discountAmount: item.discountAmount,
                    markedLabels: item?.markedLabels ? {
                        values: productInForm?.markedLabels ?? [],
                        patchType: 'REPLACE'
                    } : undefined,
                    declinedMarkedLabels: declinedMarcLabels.length >0 ? {
                        values: productInForm?.markedLabels??[],
                        patchType: 'REPLACE'
                    } : undefined,
                    quantity: item.quantity,
                    declinedQuantity: item.quantity - (productInForm? +productInForm.amount : 0)
                };

                return productToPatch

            }).filter(item=>item.declinedQuantity>0);

            const editedOrder: typePatchOrderForSaleWithEditProductsList = {
                id: orderData.id,
                currentStatus: orderData.status,
                status: OrderStatuses.COMPLETED,
                servicePaymentAmount: getServicePaymentAmount(form),
                servicePaymentPercent: form.values.isServicePaymentInPercent ? +(((+form.values.servicePayment) / 100).toFixed(4)) : 0,
                productsToPatch: changedProductsByAmount
            };

            try {

                const resp = await editOrder(editedOrder).unwrap();

                 await createSale(orderData.id)

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: i18n._(t`Order edited and completed successfully.`),
                }));

                navigate(generatePath(routerPaths.orders));

            } catch (err) {

                errorHandlerForForm(err as typeResponseError, 'onEditOrder', dispatchAppT, form as unknown as typeReturnForm, mapRequestFieldsToFormFieldOrders);

                setIsInProgress(false);

            }

        }

    };

    return (

        <form onSubmit={ form.onSubmit(onSave) }>

            <OrderProducts form={ form } orderData={ orderData }/>

            { (isInProgress || isLoading) && <LoaderOverlay/> }
            <Space h={ 42 }/>
            <Flex className={ classes.buttonsBar }>
                <Button key="cancel" type="reset" variant="outline" onClick={ onCancel }>{ t`Cancel` }</Button>
                <Button key="submit" disabled={ !!Object.values(form.errors).length || isInProgress }
                        type="submit">{ t`Save and Complete order` }</Button>
            </Flex>
        </form>

    );

};
