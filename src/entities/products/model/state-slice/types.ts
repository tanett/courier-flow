import { typeCategory } from '../../../category/model/types';


export type typeProduct = {
    id: string
    createdAt: string
    createdBy: string
    archived: boolean
    archivedAt: string
    archivedBy: string
    name: string
    productCategory: typeCategory
    unit: PRODUCT_UNIT_VALUE
    marked: boolean
    vat: number
    barcodes: string[]
    productAdditionalFields: typeProductAdditionalField[]
    merchantId: string
}

export type typeProductExtended = typeProduct & {
    minPrice: number
    maxPrice: number
    storesCount: number
}
export enum PRODUCT_UNIT_VALUE {
    KILOGRAM = 'KILOGRAM',
    GRAM = 'GRAM',
    LITRE = 'LITRE',
    MILLILITRE = 'MILLILITRE',
    PIECE = 'PIECE'
}

export enum PRODUCT_ADDITIONAL_FIELD {
    PSID = 'PSID',
    UNIT_CODE = 'UNIT_CODE',
    PACKAGE_CODE = 'PACKAGE_CODE',
    COMMISSION_TIN = 'COMMISSION_TIN',
    COMMISSION_PINFL = 'COMMISSION_PINFL'
}

export type typeProductAdditionalField = {
    id: string
    createdAt: string
    createdBy: string
    type: PRODUCT_ADDITIONAL_FIELD
    value: string
}

export type typeAdditionalFieldForForm = Pick<typeProductAdditionalField, 'type' | 'value'> & {id?: string}

export type typeProductCreate = Pick<typeProduct, 'name' | 'unit' | 'vat' | 'merchantId'>
    & Partial<Pick<typeProduct, 'marked' | 'barcodes'>>
    & { productCategoryId?: string }
    & { productAdditionalFields?: typeAdditionalFieldForForm[] }

export type typeProductEdit = {
    id: typeProduct['id'],
    name?: typeProduct['name'],
    productCategoryId?: string | null,
    unit?: typeProduct['unit'],
    marked?: typeProduct['marked'],
    vat?: typeProduct['vat'],
    productAdditionalFields?: typeAdditionalFieldForEdit // todo fix it
    barcodes?: {
        values: string[],
        patchType: 'REPLACE' | 'ADD' | 'REMOVE'
    }
}

type typeAdditionalFieldForEdit = {
    deleteAllExisting?: boolean;  // use together with create for replace existing data
    create?: typeAdditionalFieldForForm[];
    patch?: Patch[];
    delete?: string[];
}

interface Patch {
    id: string;
    value: string;
}

export type typeProductToArchive = string[]

export type typeProductAdditionalFieldInfo = {
    name: string
    code: PRODUCT_ADDITIONAL_FIELD
    pattern: string
    patternDescription: string
    required: boolean
}


export interface typeProductsState {
    additionalFieldInfo?: typeProductAdditionalFieldInfo[];
}

export type typeChangeCategoryForProduct = Pick<typeProductEdit, 'id' | 'productCategoryId'>

export type typeChangeVatForAll = {
    merchantId: string,
    newVat: number
}
