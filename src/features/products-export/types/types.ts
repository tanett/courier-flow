import { typeStoreListChecked } from 'features/products-import/ui/select-stores/types';

export enum PRODUCT_EXPORT_TYPE_REQUEST {
    CATALOG='catalog',
    RETAIL = 'retail'
}

export type typeExportOptions = {
    type: PRODUCT_EXPORT_TYPE_REQUEST,
    stores?: { isAllSelected: boolean, countStores: number, selectedStores: typeStoreListChecked[] }
    productIds?: string[]

}
