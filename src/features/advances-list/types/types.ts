import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeAdvanceExtended } from '../../../entities/advances/model/state-slice/types';

export type typeAdvancesListTable = {
    goToDetailsPage: (id: string) => void
    advancesList: typeAdvanceExtended[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
    onOpenReceipt: (id: string) => void,
}

