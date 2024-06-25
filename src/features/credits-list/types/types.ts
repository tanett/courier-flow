import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeCredit } from '../../../entities/credits/model/types';

export type typeCreditsListTable = {
    goToDetailsPage: (id: string) => void
    creditsList: typeCredit[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
}

