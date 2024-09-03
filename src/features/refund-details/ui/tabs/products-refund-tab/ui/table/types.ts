import {typeRefund} from "../../../../../../../entities/refunds/model/types";

export type typeRefundsProductsTable = {
    productList: typeRefund['products'] | undefined,
    isLoading: boolean,
    onSoldProductClick:(soldProductName: string)=>void
}
