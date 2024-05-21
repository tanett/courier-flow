import { typeSale } from '../../../../entities/sales/model/types';

export type typeSoldProductsTable = {
    productList: typeSale['products'] | undefined,
    isLoading: boolean,
    onSoldProductClick:(soldProductName: string)=>void
}
