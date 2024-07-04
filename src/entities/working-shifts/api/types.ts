
export interface typeSearchFilterWorkingShifts {
    ids?: string[]
    searchText?: string
    merchantId?: string
    storeIds?: string[]
    cashierIds?: string[]
    closedAtFrom?: string
    closedAtTo?: string
    _or_?:  Omit<typeSearchFilterWorkingShifts, '_or_' | '_not_' | '_and_'>[]
    _not_?: string
    _and_?: Omit<typeSearchFilterWorkingShifts, '_or_' | '_not_' | '_and_'>[]
}

export type typeSearchWorkingShiftsSortingNames = 'OPENED_AT' | 'CLOSED_AT';


export const tagTypesWorkingShiftsList = { workingShiftsList: { type: 'workingShiftsList', id: 'PARTIAL-LIST' } } as const;
