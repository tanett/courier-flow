import { typeOrder, typeOrderShortExtended } from 'entities-project/orders/model/state-slice';
import { useAppDispatchT, useSelectorT } from 'app/state';
import { Payment, Product, typeCreateSale } from 'entities-project/sales/model/types';
import { randomId } from '@mantine/hooks';
import { useLazyGetOrderByIdQuery, usePatchOrderForSaleMutation } from 'entities-project/orders/api/api';
import { useEffect, useState } from 'react';
import { useMakeSaleMutation } from 'entities-project/sales/api/api';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatuses } from 'entities-project/orders/model/orders-statuses';

export const useCreateSaleFromOrder = () => {

    const dispatch = useAppDispatchT();

    const bundle = useSelectorT(state => state.bundle.bundle);

    const user = useSelectorT(state => state.userProfile.userProfile?.actor);

    const baseCurrency = useSelectorT(state => state.merchantCurrency.baseCurrency);

    const [ getFullOrder, { isFetching: isFetchingOrder } ] = useLazyGetOrderByIdQuery();

    const [ patchOrder, { isLoading: isFetchingPatchOrder } ] = usePatchOrderForSaleMutation();

    const [ makeSale, { isLoading } ] = useMakeSaleMutation();

    const createSaleObjectFromOrder = (order: typeOrder) => {

        if (!bundle || !user || !baseCurrency) return;

        const uid = randomId();

        const receiptNumber = Math.floor(Math.random() * 100000);

        const saleDate = new Date().toISOString();

        const payment: Payment = {
            amount: order.totalCost,
            baseCurrencyAmount: order.totalCost,
            createdOnTerminalAt: saleDate,
            currency: baseCurrency,
            exchangeRate: 1,
            method: 'CASH'
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
                vatAmount: product.vatAmount,
                totalCost: product.totalCost,
                additionalFields: product.additionalFields
            };
        });

        const newSale: typeCreateSale = {
            cashAppVersion: bundle.terminalData.cashAppVersion ?? '-',
            fiscalModuleId: bundle.terminalData.fiscalCardId ?? '-',
            fiscalSign: bundle.terminalData.contractCode ?? 'fs',
            merchantName: bundle.merchantData.name,
            orderId: order.id,
            paymentAppVersion: bundle.terminalData.paymentAppVersion ?? '-',
            paymentType: 'USUAL',
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
            terminalContractCode: bundle.terminalData.contractCode ?? '-',
            terminalLabel: bundle.terminalData.label,
            totalCost: order.totalCost,
            zreportNumber: 10
        };

        return newSale;
    };

    const [ isSaleLoading, setIsSaleLoading ] = useState(false);

    const createSale = async (orderId: string) => {

        setIsSaleLoading(true);
        const orderData = await getFullOrder(orderId).unwrap();
        //  console.log('orderData', orderData);

        if (orderData) {


            const sale = createSaleObjectFromOrder(orderData);
            console.log('sale', sale);
            if (sale) {

                try {
                    const IdempotentKey = uuidv4();

                    makeSale({
                        sale,
                        IdempotentKey
                    });

                    patchOrder({
                        id: orderId,
                        currentStatus: orderData.status,
                        status: OrderStatuses.COMPLETED,
                        servicePaymentPercent: orderData.servicePaymentPercent ?? 0,
                        servicePaymentAmount: orderData.servicePaymentAmount,
                    });

                } catch (e) {
                    errorHandler(e as typeResponseError, 'create sale', dispatch);
                }

            }

            setIsSaleLoading(false);
        }
    };

    return {
        createSale,
        isSaleLoading: isSaleLoading || isLoading
    };

};
