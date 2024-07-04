import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeWorkingShifts } from '../../../entities/working-shifts/model/types';

export type typeWorkingShiftsTable = {
    goToDetailsPage: (id: string) => void
    list: typeWorkingShifts[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
}
