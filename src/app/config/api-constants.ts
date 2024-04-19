// Response constants
export enum accessScope {
    admin = 'ADMIN',
    merchant = 'MERCHANT',
    store = 'STORE',
    system = 'SYSTEM',
}

export enum queryParamsNames {
    pageNumber = 'p',
    itemsPerPage = 's',
    searchPhrase = 'q',
    filtersString = 'f',
}

export const filterFieldNameSeparator = '.';
export const filterValuesSeparator = ',';
export const filterSeparator = ';';

export interface typeSearchParamsObj {
    [queryParamsNames.pageNumber]?: string
    [queryParamsNames.itemsPerPage]?: string
    [queryParamsNames.searchPhrase]?: string
    [queryParamsNames.filtersString]?: string
}

// TODO: make filters
export enum filterNames {
    active = 'active'
}


export const DEFAULT_ITEMS_PER_PAGE_IN_TABLE = 10;
export const DEFAULT_FIRST_PAGE_NUMBER = 0;

export enum perPageVariants {
    default = DEFAULT_ITEMS_PER_PAGE_IN_TABLE,
    second = 24,
    third = 50,
}

export const availableItemsPerPage = Array.from(Object.values(perPageVariants)).filter(item => typeof item === 'number');

export const perPageVariantList: {value: string, label: string}[] = [
    { value: perPageVariants.default.toString(), label: perPageVariants.default.toString() },
    { value: perPageVariants.second.toString(), label: perPageVariants.second.toString() },
    { value: perPageVariants.third.toString(), label: perPageVariants.third.toString() },
]

export const REFETCH_INTERVAL = 1000;
