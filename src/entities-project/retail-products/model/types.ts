import { typeProduct } from '../../products/model/state-slice';
import { typeStore } from '../../stores/model/types';


export type typeRetailProduct = {
    id: string
    createdAt: string
    createdBy: string
    merchantId: string
    product: typeProduct
    store: typeStore
    price: number
}

export type typeCreateRetailProduct = {
    productId: string
    storeId: string
    merchantId: string
    price: number
}

export type typeEditRetailProduct = Pick<typeRetailProduct, 'id' | 'price'>


export type typeChangePricesInAllStores= {
    productId: string
    newPrice: number
}
