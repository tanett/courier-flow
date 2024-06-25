import { typeCreditsFilterForm } from '../types/types';

export const initialCreditsFilterForm: typeCreditsFilterForm = {
    // employeeId: null,
    status: null,
    storeId: null,
    // terminalId: null,
    createdOnTerminalAt: [ null, null ],
};

export const creditsFilterForm = { initialValues: initialCreditsFilterForm };
