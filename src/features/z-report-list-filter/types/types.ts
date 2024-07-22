export interface typeZReportsFilterForm {
    fiscalId: string | null
    storeId: string | null
    terminalSN: string | null
    closeDate:[Date | null, Date | null]
}


export type typeQuickFilter = 'yesterday' | 'today' | 'last week' | 'last month' | null
