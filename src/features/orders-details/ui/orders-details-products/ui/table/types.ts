import { typeOrder } from '../../../../../../entities-project/orders/model/state-slice';

export type typeOrderedProductsTable = {
    productList: typeOrder['products'] | undefined,
}
