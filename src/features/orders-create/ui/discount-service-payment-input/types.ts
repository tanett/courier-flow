import { typeReturnOrderForm } from 'features/orders-create/types/types';

export type typeDiscountInput= {
    form: typeReturnOrderForm
}

export enum TYPE_INPUT  {
    'PERCENT'='%',
    'MONEY' = 'sum'
}
