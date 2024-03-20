
import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeTerminalExtended } from 'entities/terminals/model/types';

export type typeTerminalsListTable = {
    goToDetailsTerminalPage: (item: typeTerminalExtended) => void
    terminalsList:  typeTerminalExtended[] | undefined
    pagination: typeTablePagination | undefined,
    isFetching: boolean
}
