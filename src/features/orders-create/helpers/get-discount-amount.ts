import { typeReturnOrderForm } from 'features/orders-create/types/types';

export const getDiscountAmount = (form: typeReturnOrderForm)=>{
    const costInCard = form.values.products.reduce((acc, current) => acc + current.price * (+current.amount), 0);

    return form.values.isDiscountInPercent ?
        parseFloat(((costInCard/100) * (+form.values.discount)).toFixed(2)) : +form.values.discount
}
