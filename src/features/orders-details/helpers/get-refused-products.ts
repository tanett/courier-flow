import { typeOrder } from '../../../entities-project/orders/model/state-slice';

export const getRefusedProducts = (products: typeOrder['products']) => {
    return products.filter(item => (item.declinedQuantity && item.declinedQuantity > 0))

}
