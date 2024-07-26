import { typeProductInCart } from 'features/orders-create/types/types';
import { typeOrder } from '../../../entities/orders/model/state-slice';

export const mapOrderedProductsToCart = (order: typeOrder): typeProductInCart[] => {

    return order.products.map(item => ({
        amount: item.quantity.toString(),
        id: item.id,
        createdAt: item.createdAt,
        createdBy: item.createdBy,
        merchantId: order.merchantId,
        product: {
            name: item.name,
            productCategory: item.categoryId,
            unit: item.unit,
            marked: !!item.markedLabels,
            vat: item.vatPercent,
            barcodes: item.barcodes,
            productAdditionalFields: item.additionalFields,
            merchantId: order.merchantId,
        },
        storeId: order.storeId,
        price: item.priceInStore
    }));

};
