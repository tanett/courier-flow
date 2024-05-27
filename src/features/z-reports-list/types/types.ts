import { typeTablePagination } from 'shared/ui/table/types/type';
import {typeZReport} from "../../../entities/z-report/model/types";

export type typeZReportsListTable = {
    goToDetailsReportPage: (id: string, refundNumber: number) => void
    onOpenReceipt: (id: string) => void
    zReportsList: typeZReport[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
}
