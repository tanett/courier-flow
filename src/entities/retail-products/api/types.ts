import { typeChangePricesInAllStores, typeCreateRetailProduct, typeEditRetailProduct } from 'entities/retail-products/model/types';

export type typeCreateRetailProductRequest = typeCreateRetailProduct

export type typeEditRetailProductRequest = typeEditRetailProduct

export type typeSearchFilterRetailProduct = {
    ids?: string[]
    productIds?: string[]
    storeIds?: string[]
    archived?: boolean
    _or_?:  Omit<typeSearchFilterRetailProduct, '_or_' | '_not_' | '_and_'>[]
    _not_?: string
    _and_?: Omit<typeSearchFilterRetailProduct, '_or_' | '_not_' | '_and_'>[]
}

export type typeSearchRetailProductSortingNames = 'PRODUCT_NAME' | 'STORE_NAME';

export type typeRetailProductDeleteRequest = string[]

export type typeChangePricesInAllStoresRequest = typeChangePricesInAllStores;


