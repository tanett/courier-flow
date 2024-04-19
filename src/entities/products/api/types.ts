import { typeChangeCategoryForProduct, typeProductCreate, typeProductEdit, typeProductToArchive } from '../model/state-slice/types';
import { typeImportError, typeImportFileStatus, typeImportFileType } from 'entities/imports/api/types';
import { LANGUAGES } from 'app/config/languages';


export type typeCreateProductRequest = typeProductCreate

export type typeEditProductRequest = typeProductEdit

export type typeBatchEditProductRequest = typeProductEdit[]

export type typeChangeCategoryForSelectedProductsRequest = typeChangeCategoryForProduct[]

export type typeSearchFilterProduct = {
    ids?: string[]
    archived?: boolean
    searchText?: string
    nameContains?: string
    names?: string[]
    barcodes?: string[]
    categoriesIds?: string[]
    marked?: boolean
    piece?: boolean
    _or_?: string[]
    _not_?: string
    _and_?: string[]
}

export type typeSearchFilterProductExtended = typeSearchFilterProduct & {storeIds?: string[]}

export type typeSearchProductSortingNames = 'NAME';

export type typeProductToArchiveRequest = typeProductToArchive

export type typeImportResponse = {
    id: string
    createdAt: string
    createdBy: string
    type: {
        code: string
        name: string
        fileFormat: typeImportFileType
        withProgressBar: boolean
        timeoutInMinutes: number
    }
    status: typeImportFileStatus
    progressBarPercent: number
    withProgressBar: boolean
    retryAttempt: number
    errors: typeImportError[]
    unexpectedExceptionStackTrace: string
    locale: LANGUAGES
    fileName: string
}

export enum PRODUCT_IMPORT_TYPE_REQUEST  {
    PRODUCT_CATALOG='PRODUCT_CATALOG',
    RETAIL_PRODUCT_FROM_EXCEL='RETAIL_PRODUCT_FROM_EXCEL',
    RETAIL_PRODUCT_FROM_FILTER='RETAIL_PRODUCT_FROM_FILTER'
}


export type typeImportProductRequestData = {
    importType: PRODUCT_IMPORT_TYPE_REQUEST
    storeIds?: string[]
}
