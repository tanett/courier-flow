import { typeEncashmentFilterForm } from '../types/types';

export const initialEncashmentFilterForm: typeEncashmentFilterForm = {
    cashDeskId: null,
    employeeId: null,
    storeId: null,
    encashedAt: [ null, null ],
};

export const encashmentFilterForm = { initialValues: initialEncashmentFilterForm };
