import { typeReturnOrderForm } from 'features/orders-create/types/types';
import { typeOrderCreate } from '../../../entities/orders/model/state-slice';
import { getDiscountPercentFromDiscountAmount } from 'features/orders-create/helpers/get-discount-percent-from-discount-amount';

export const mapProductsForCreateOrderObject = (form: typeReturnOrderForm): typeOrderCreate['products'] => {
    const productsList = form.values.products.filter(item => item.storeId === form.values.storeId).map(item => {
        let discountPercent: number | undefined = undefined;
        let discountAmount: number | undefined = undefined;

        if (form.values.isDiscountInPercent) {
            discountPercent = parseFloat((parseFloat(form.values.discount) / 100).toFixed(4));
            discountAmount = parseFloat(((item.price * (+item.amount)) * discountPercent).toFixed(2));

        } else {
            const costInCard = form.values.products.reduce((acc, current) => acc + current.price * (+current.amount), 0);

            // in this case the discountPercent= undefined so that this field can be recognized in the edit form

            const discountPercentTemp = getDiscountPercentFromDiscountAmount(parseFloat(form.values.discount), costInCard);
            discountAmount = parseFloat(((item.price * (+item.amount)) * discountPercentTemp / 100).toFixed(2));
        }

        const totalCostForProduct = parseFloat((item.price * (+item.amount) - (discountAmount || 0)).toFixed(2));


        return {
            id: item.id,
            name: item.product.name,
            categoryId: item.product.productCategoryId,
            unit: item.product.unit,
            barcodes: item.product.barcodes,
            markedLabels: undefined,
            priceInStore: item.price,
            quantity: (+item.amount),
            discountPercent: discountPercent,
            discountAmount: discountAmount,
            totalCost: totalCostForProduct,
            vatPercent: item.product.vat,
            vatAmount: parseFloat(((+item.amount) * ((item.price * item.product.vat) / (item.product.vat + 1))).toFixed(2)),
            additionalFields: item.product.productAdditionalFields
        };
    });

    // verify sum of discount amount for all product if isDiscountInPercent = false
    if (!form.values.isDiscountInPercent) {
        const differance = parseFloat(form.values.discount) - productsList.reduce((prev: number, curr) => prev + curr.discountAmount, 0);

        if (differance !== 0) {
            let indexProductWithMaxCost = 0;
            let maxCost = 0;
            productsList.forEach((product, index) => {
                if (product.totalCost > maxCost) {
                    maxCost = product.totalCost;
                    indexProductWithMaxCost = index;
                }
            });

            productsList[indexProductWithMaxCost].discountAmount = parseFloat((productsList[indexProductWithMaxCost].discountAmount + differance).toFixed(2));

        }

    }

    return productsList;
};
