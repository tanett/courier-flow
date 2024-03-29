import { PRODUCT_UNIT_VALUE } from '../../../entities/products/model/state-slice';

export type typeProductsFilterForm = {
    barcode: string | undefined
    storeId: string | undefined
    categoryId: string | undefined
    unit: PRODUCT_UNIT_VALUE | undefined
    marked: boolean | null
}
