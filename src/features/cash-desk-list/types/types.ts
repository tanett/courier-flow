import { typeTablePagination } from 'shared/ui/table/types/type';
import {typeCashDesk} from "../../../entities/cash-desk/model/types";

export type typeCashDeskListTable = {
    goToDetailsCashDeskPage: (id: string, cashDeskName: string) => void
    onEdit: (id: string) => void
    onArchive: (id: string) => void
    cashDeskList: typeCashDesk[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
}
