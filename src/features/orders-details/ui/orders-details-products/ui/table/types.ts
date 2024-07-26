import { typeOrder } from '../../../../../../entities/orders/model/state-slice';

export type typeOrderedProductsTable = {
    productList: typeOrder['products'] | undefined,
}
