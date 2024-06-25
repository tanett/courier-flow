import { typePaymentCredit } from '../../../../../../entities/credits/model/types';

export type typePaymentsTable = {
    paymentsList: typePaymentCredit[] | undefined,
    isLoading: boolean,
}
