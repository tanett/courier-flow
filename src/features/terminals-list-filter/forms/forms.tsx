import { typeTerminalsFilterForm } from '../types/types';

export const initialTerminalsFilterForm: typeTerminalsFilterForm = {
    serialNumber: '',
    fiscalCardId: '',
    model: '',
    blocked: null,
};

export const terminalsFilterForm = { initialValues: initialTerminalsFilterForm };
