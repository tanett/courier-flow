import { typeWorkingShiftsFilterForm } from '../types/types';

export const initialWorkingShiftsFilterForm: typeWorkingShiftsFilterForm = {
    cashierId: null,
    storeId: null,
    closedAt: [ null, null ],
};

export const workingShiftsFilterForm = { initialValues: initialWorkingShiftsFilterForm };
