import { typeSale } from '../../../../entities/sales/model/types';

export type typePaymentsTable = {
    paymentsList: typeSale['payments'] | undefined,
    isLoading: boolean,
}
