export interface typeCreditsFilterForm {
    // employeeId: string | null
    status: boolean | null
    storeId: string | null
    // terminalId: string | null
    createdOnTerminalAt:[Date | null, Date | null]
}


export type typeQuickFilter = 'yesterday' | 'today' | 'last week' | 'last month' | null
