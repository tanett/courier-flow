import { typeSearchParamsObj } from '../../../app/config/api-constants';
import { sortDirection } from 'app/api/types';

export interface typeUseUrlParams {
    pageNumber: number | null
    itemsPerPage: number | null
    searchPhrase: string | null
    filtersString: string | null
    filters: null | Record<string, string | string[]>[]
    getFilterValue: (key: string) => string | string[] | undefined
    setSearchParams: (newParamsObj: typeSearchParamsObj) => void
    filtersToUri: (newParamsObj: Record<string, unknown>) => string | undefined
    sortDirection: sortDirection.asc | sortDirection.dec | undefined
    sortName: string | undefined
}
