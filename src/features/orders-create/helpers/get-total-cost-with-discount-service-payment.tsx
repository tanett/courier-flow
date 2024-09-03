import { typeReturnOrderForm } from 'features/orders-create/types/types';

export const getTotalCostWithDiscountAndServicePayment = (form: typeReturnOrderForm)=>{
    const products= form.values.products.filter(item=>item.storeId===form.values.storeId)
    const costInCard = products.reduce((acc, current) => acc + current.price * (+current.amount), 0);
    const discount = form.values.isDiscountInPercent ? +(form.values.discount) * (costInCard/100) : +form.values.discount;
    const servicePayment = form.values.isServicePaymentInPercent ? +(form.values.servicePayment) * (costInCard/100) : +form.values.servicePayment;
    return costInCard-discount+servicePayment
}

