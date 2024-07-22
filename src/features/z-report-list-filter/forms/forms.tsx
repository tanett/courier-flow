import { typeZReportsFilterForm } from '../types/types';

export const initialZReportFilterForm: typeZReportsFilterForm = {
    fiscalId: '',
    storeId: null,
    terminalSN: '',
    closeDate: [ null, null ],
};

export const zReportFilterForm = { initialValues: initialZReportFilterForm };
