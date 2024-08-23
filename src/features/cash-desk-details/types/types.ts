import { typeCashDesk } from '../../../entities/cash-desk/model/types';
import { typeCashDeskOperation } from '../../../entities/cash-desk-operations/model/types';

export type typeCashDeskDetailsCommonProps = {
    cashDeskData: typeCashDesk | undefined,
    isFetching: boolean
}

export type typeCashDeskDetailsOperationsProps = {
    cashDeskId: string | undefined,
    storeId: string | undefined
    isFetching: boolean
}

export type typeCashDeskOperationsTable = {
    operationList: typeCashDeskOperation[] | undefined,
    isLoading: boolean,
}


export type typeAddCorrectionDialogProps = {
    onCloseDialog: () => void,
    storeId: string | undefined,
    cashDeskId: string | undefined,
}
