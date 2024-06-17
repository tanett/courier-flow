import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeTerminalConfigurations } from '../../../entities/terminals-configurations/model/state-slice';

export type typeTerminalConfigurationsListTable = {
    isAllowedEdit: boolean | null,
    goToEditPage: (id: string) => void
    goToDetailsPage: (id: string, name: string) => void
    onDeleteButtonHandler: (id: string) => void
    list: typeTerminalConfigurations[] | undefined
    pagination: typeTablePagination | undefined,
    isLoading: boolean
}
