import { typeTablePagination } from 'shared/ui/table/types/type';
import {typeEncashment} from "../../../entities/encashment/model/types";

export type typeCashDeskListTable = {
    encashmentList: typeEncashment[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
}
