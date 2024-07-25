import { typeOrdersFilterForm } from '../types/types';

export const initialOrdersFilterForm: typeOrdersFilterForm = {
    collectorId: null,
    storeId: null,
    courierId: null,
    status: null,
    orderedAt: [ null, null ],
};

export const ordersFilterForm = { initialValues: initialOrdersFilterForm };
