import {  typeReturnOrderForm } from 'features/orders-create/types/types';
import { typeOrder } from 'entities-project/orders/model/state-slice';

export type typeProductsInCartTable= {
    form: typeReturnOrderForm
    orderData?: typeOrder
}


