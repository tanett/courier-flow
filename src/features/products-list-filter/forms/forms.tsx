import { typeProductsFilterForm } from '../types/types';

export const initialProductsFilterForm: typeProductsFilterForm = {
    barcode: undefined,
    storeId: undefined,
    categoryId: undefined,
    piece: null,
    marked: null,
};

export const productsFilterForm = { initialValues: initialProductsFilterForm };
