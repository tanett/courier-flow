import { typeTablePagination } from 'shared/ui/table/types/type';
import {typeRefund} from "../../../entities/refunds/model/types";

export type typeRefundListTable = {
    goToDetailsReceiptPage: (id: string) => void
    onOpenReceipt: (id: string) => void
    refundList: typeRefund[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
}
