import { typeTerminalsFilterForm } from '../types/types';

export const initialTerminalsFilterForm: typeTerminalsFilterForm = {
    serialNumber: '',
    fiscalCardId: '',
    model: '',
    blocked: undefined,
};

export const terminalsFilterForm = { initialValues: initialTerminalsFilterForm };
