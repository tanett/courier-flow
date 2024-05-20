import { typeTablePagination } from 'shared/ui/table/types/type';
import {typeRefund} from "../../../entities/refunds/model/types";

export type typeRefundListTable = {
    goToDetailsReceiptPage: (id: string, refundNumber: number) => void
    onOpenReceipt: (id: string) => void
    refundList: typeRefund[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
}
