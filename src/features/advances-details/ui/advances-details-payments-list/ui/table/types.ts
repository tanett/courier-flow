import { typeAdvance } from 'entities/advances/model/state-slice/types';

export type typePaymentsTable = {
    paymentsList: typeAdvance['payments'] | undefined,
    isLoading: boolean,
}
