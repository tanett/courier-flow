import { typeReturnOrderForm } from 'features/orders-create/types/types';

export const getServicePaymentAmount = (form: typeReturnOrderForm)=>{
    const costInCard = form.values.products.reduce((acc, current) => acc + current.price * (+current.amount), 0);

    return form.values.isServicePaymentInPercent ?
        parseFloat(((costInCard/100) * (+form.values.servicePayment)).toFixed(2) ): +form.values.servicePayment
}
