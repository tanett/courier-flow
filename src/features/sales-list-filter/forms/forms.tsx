import { typeSalesFilterForm } from '../types/types';

export const initialSalesFilterForm: typeSalesFilterForm = {
    employeeId: null,
    storeId: null,
    terminalId: null,
    soldAt: [ null, null ],
};

export const salesFilterForm = { initialValues: initialSalesFilterForm };
