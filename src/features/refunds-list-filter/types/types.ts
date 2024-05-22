export interface typeRefundsFilterForm {
    employeeId: string | null
    storeId: string | null
    terminalId: string | null
    refundedAt:[Date | null, Date | null]
}


export type typeQuickFilter = 'yesterday' | 'today' | 'last week' | 'last month' | null
