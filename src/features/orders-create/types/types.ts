import { typeOrderCreate } from '../../../entities/orders/model/state-slice';

export type typeOrdersForm = {
    customer: {
        id: string | null
        fullName: string
        phone: string
        email: string
    }
    deliveryAddress: { address: string, additionalInfo: string }
    storeId: string | null
    servicePaymentPercent: string
    servicePaymentAmount: string
    discountPercent: string
    discountAmount: string
    products: typeOrderCreate['products']
}


