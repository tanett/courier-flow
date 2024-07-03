import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeCreditExtended } from '../../../entities/credits/model/types';

export type typeCreditsListTable = {
    goToDetailsPage: (id: string) => void
    creditsList: typeCreditExtended[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
}

