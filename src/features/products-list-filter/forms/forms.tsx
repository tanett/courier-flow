import { typeProductsFilterForm } from '../types/types';

export const initialProductsFilterForm: typeProductsFilterForm = {
    barcode: undefined,
    storeId: undefined,
    categoryId: undefined,
    unit: undefined,
    marked: null
};

export const productsFilterForm = { initialValues: initialProductsFilterForm };
