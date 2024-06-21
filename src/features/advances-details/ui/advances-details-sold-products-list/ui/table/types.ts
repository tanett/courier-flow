import { typeAdvance, typeAdvanceProduct } from '../../../../../../entities/advances/model/state-slice/types';

export type typeSoldProductsTable = {
    productList: typeAdvance['products'] | undefined,
    isLoading: boolean,
    onSoldProductClick:(soldProduct: typeAdvanceProduct)=>void
}
