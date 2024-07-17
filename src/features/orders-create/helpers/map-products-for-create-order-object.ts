import { typeReturnOrderForm } from 'features/orders-create/types/types';
import { typeOrderCreate } from '../../../entities/orders/model/state-slice';

export const mapProductsForCreateOrderObject = (form: typeReturnOrderForm): typeOrderCreate['products'] => {
    return form.values.products.map(item => {
        return {
            id: item.id,
            name: item.product.name,
            categoryId: item.product.productCategory?.id,
            unit: item.product.unit,
            barcodes: item.product.barcodes,
            markedLabels: undefined,
            priceInStore: item.price,
            quantity: (+item.amount),
            // discountPercent: form.values.isDiscountInPercent ? form.values.discount :,
            // discountAmount: 0,
            totalCost: item.price * (+item.amount),
            vatPercent: item.product.vat,
            vatAmount: parseFloat(((+item.amount) * ((item.price * item.product.vat)  /(item.product.vat + 1))).toFixed(2)),
            additionalFields: item.product.productAdditionalFields.reduce((prev: Record<string, string>, curr) => {
                prev[curr.type] = curr.value;
                return prev;
            }, {})
        };
    });
};
