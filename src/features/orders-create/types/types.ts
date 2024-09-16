import { typeRetailProduct } from 'entities-project/retail-products/model/types';
import type { UseFormReturnType } from '@mantine/form';
import { typeProduct } from 'entities-project/products/model/state-slice';
import { typeProductInCartWithMarkedLabels } from 'features/orders-edit/types/types';

export type typeOrdersForm = {
    customer: {
        fullName: string
        phone: string
        email: string
    }
    deliveryAddress: { address: string, additionalInfo: string }
    storeId: string | null
    servicePayment: string
    isServicePaymentInPercent: boolean
    discount: string
    isDiscountInPercent: boolean
    products: typeProductInCartWithMarkedLabels[],
}

export type typeReturnOrderForm =  UseFormReturnType<typeOrdersForm, (values: typeOrdersForm) => typeOrdersForm>

export type typeProductInCart = Pick<typeRetailProduct, 'id' | 'createdAt' | 'createdBy' | 'price' | 'merchantId'> & {
    amount: string  // for correctly work , IMask input  needs a string as value
    storeId: string
    product: {
        name: typeProduct['name'],
        productCategoryId?: string,
        unit: typeProduct['unit'],
        marked: typeProduct['marked'],
        vat: typeProduct['vat'],
        barcodes: typeProduct['barcodes'],
        productAdditionalFields: Record<string, string>,
        merchantId: string
    }
}
