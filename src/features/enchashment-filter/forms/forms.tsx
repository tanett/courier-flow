import { typeEncashmentFilterForm } from '../types/types';

export const initialEncashmentFilterForm: typeEncashmentFilterForm = {
    employeeId: null,
    storeId: null,
    encashedAt: [ null, null ],
};

export const encashmentFilterForm = { initialValues: initialEncashmentFilterForm };
