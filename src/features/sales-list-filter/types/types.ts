export interface typeSalesFilterForm {
    employeeId: string | null
    storeId: string | null
    terminalId: string | null
    soldAt:[Date | null, Date | null]
}


export type typeQuickFilter = 'yesterday' | 'today' | 'last week' | 'last month' | null
