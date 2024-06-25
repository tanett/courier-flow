import { typeAdvancesFilterForm } from '../types/types';

export const initialAdvancesFilterForm: typeAdvancesFilterForm = {
    employeeId: null,
    storeId: null,
    terminalId: null,
    createdOnTerminalAt: [ null, null ],
};

export const advancesFilterForm = { initialValues: initialAdvancesFilterForm };
