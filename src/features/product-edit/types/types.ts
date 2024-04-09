import { PRODUCT_UNIT_VALUE, typeAdditionalFieldForForm } from '../../../entities/products/model/state-slice';

export type typeProductForm = {
    name: string
    productCategoryId: string
    unit: PRODUCT_UNIT_VALUE | undefined
    marked: boolean

    vat: string
    barcodes: string[]
    productAdditionalFields: Record<string, typeAdditionalFieldForForm>
}
