import { typeOrder } from 'entities-project/orders/model/state-slice';
import { useAppDispatchT, useSelectorT } from 'app/state';
import { Payment, PaymentType, Product, typeCreateSale } from 'entities-project/sales/model/types';
import { randomId } from '@mantine/hooks';
import { useLazyGetOrderByIdQuery } from 'entities-project/orders/api/api';
import { useState } from 'react';
import { useMakeSaleMutation } from 'entities-project/sales/api/api';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { v4 as uuidv4 } from 'uuid';

export const useCreateSaleFromOrderWithChangeProducts = () => {

    const dispatch = useAppDispatchT();

    const bundle = useSelectorT(state => state.bundle.bundle);

    const user = useSelectorT(state => state.userProfile.userProfile?.actor);

    const baseCurrency = useSelectorT(state => state.merchantCurrency.baseCurrency);

    const [ getFullOrderAfterPatch, { isFetching: isFetchingOrder } ] = useLazyGetOrderByIdQuery();

    const [ makeSale, { isLoading } ] = useMakeSaleMutation();

    const createSaleObjectFromOrder = (order: typeOrder) => {

        if (!bundle || !user || !baseCurrency) return;

        const uid = randomId();

        const receiptNumber = Math.floor(Math.random() * 100000);

        const saleDate = new Date().toISOString();

        const payment: Payment = {
            amount: order.totalCost,
            baseCurrencyAmount: order.totalCost,
            createdOnDeviceAt: saleDate,
            currency: baseCurrency,
            exchangeRate: 1,
            method: 'CASH',
        };

        const productList: Product[] = order.products.map(product => {

            return {
                id: product.id,
                name: product.name,
                categoryId: product.categoryId,
                unit: product.unit,
                barcodes: product.barcodes,
                markedLabels: product.markedLabels,
                unitPrice: product.priceInStore,
                quantity: product.quantity,
                discountPercent: product.discountPercent ?? 0,
                discountAmount: product.discountAmount ?? 0,
                vatPercent: product.vatPercent,
                vatAmount: +(product.vatAmount.toFixed(2)),
                totalCost: product.totalCost,
                additionalFields: product.additionalFields,
            };

        });

        const newSale: typeCreateSale = {
            cashAppVersion: 'web-test-sale',
            fiscalModuleId: 'web-test-sale',
            fiscalSign:'web-test-sale',
            merchantName: bundle.merchantData.name,
            orderId: order.id,
            paymentAppVersion: 'web-test-sale',
            paymentType: PaymentType.USUAL,
            payments: [ payment ],
            products: productList,
            publicId: uid,
            receiptNumber: receiptNumber,
            servicePayment: order.servicePaymentAmount,
            soldAt: saleDate,
            soldBy: user.id,
            soldByName: user.fullName,
            storeAddress: bundle.storeData.address,
            storeName: bundle.storeData.name,
            totalCost: order.totalCost,
            zReportNumber: 10,
        };

        return newSale;

    };

    const [ isSaleLoading, setIsSaleLoading ] = useState(false);

    const createSale = async (orderId: string) => {

        setIsSaleLoading(true);

        const orderData = await getFullOrderAfterPatch(orderId).unwrap();

        //  console.log('orderData', orderData);

        if (orderData) {


            const sale = createSaleObjectFromOrder(orderData);

            if (sale) {

                try {

                    const IdempotentKey = uuidv4();

                    makeSale({
                        sale,
                        IdempotentKey,
                    });


                } catch (e) {

                    errorHandler(e as typeResponseError, 'create sale with patched order', dispatch);

                }

            }

            setIsSaleLoading(false);

        }

    };

    return {
        createSale,
        isSaleLoading: isSaleLoading || isLoading,
    };

};
