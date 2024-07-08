export interface typeWorkingShiftsFilterForm {
    cashierId: string | null
    storeId: string | null
    closedAt:[Date | null, Date | null]
}


export type typeQuickFilter = 'yesterday' | 'today' | 'last week' | 'last month' | null
