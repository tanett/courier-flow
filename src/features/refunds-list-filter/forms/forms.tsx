import { typeRefundsFilterForm } from '../types/types';

export const initialRefundsFilterForm: typeRefundsFilterForm = {
    employeeId: null,
    storeId: null,
    terminalId: null,
    refundedAt: [ null, null ],
};

export const refundsFilterForm = { initialValues: initialRefundsFilterForm };
