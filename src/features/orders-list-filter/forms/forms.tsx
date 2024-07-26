import { typeOrdersFilterForm } from '../types/types';

export const initialOrdersFilterForm: typeOrdersFilterForm = {
    assigneeId: null,
    storeId: null,
    courierId: null,
    status: null,
    orderedAt: [ null, null ],
};

export const ordersFilterForm = { initialValues: initialOrdersFilterForm };
