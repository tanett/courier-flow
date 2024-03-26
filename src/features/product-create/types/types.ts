import { PRODUCT_UNIT_VALUE, typeAdditionalFieldForCreate } from 'entities/products/model/state-slice';

export type typeProductForm = {
    name: string
    productCategoryId: string
    unit: PRODUCT_UNIT_VALUE | string
    marked: boolean
    vat: number
    barcodes: string[]
    productAdditionalFields: Record<string, typeAdditionalFieldForCreate>
}
