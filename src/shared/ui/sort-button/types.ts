import { sortDirection as initialSortDirection } from 'app/api/types';

export type typeSortButton = {
    id?: string
    disabled?: boolean
    sortName?: string
    initialSortDirection?: initialSortDirection
    isDefaultSorting?: boolean
}
