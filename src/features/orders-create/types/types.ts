import { typeRetailProduct } from 'entities/retail-products/model/types';
import type { UseFormReturnType } from '@mantine/form';

export type typeOrdersForm = {
    customer: {
        id: string | null
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
    products: typeProductInCart[],
}

export type typeReturnOrderForm =  UseFormReturnType<typeOrdersForm, (values: typeOrdersForm) => typeOrdersForm>

export type typeProductInCart = typeRetailProduct & {
    amount: string  // for correctly work , IMask input  needs a string as value
}
