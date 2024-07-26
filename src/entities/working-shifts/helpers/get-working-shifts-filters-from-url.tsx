import { typeUseUrlParams } from 'shared/hooks/use-url-params/types';
import { typeSearchFilterWorkingShifts } from '../api/types';

export const getWorkingShiftsFiltersFromUrl = (urlParams: typeUseUrlParams) => {

    const tempFilter: typeSearchFilterWorkingShifts= {};

    if (urlParams.searchPhrase) {
        const searchPhrase = urlParams.searchPhrase;
        tempFilter.searchText = searchPhrase;
    }


    const storeId = urlParams.getFilterValue('storeId');
    if (storeId && typeof storeId === 'string') tempFilter.storeIds = [ storeId ];
    const cashierId = urlParams.getFilterValue('cashierId');
    if (cashierId && typeof cashierId === 'string') tempFilter.cashierIds = [ cashierId ];

    const closedAtFrom = urlParams.getFilterValue('closedAtFrom');
    const closedAtTo = urlParams.getFilterValue('closedAtTo');
    if (closedAtTo && typeof closedAtTo === 'string' && closedAtFrom && typeof closedAtFrom === 'string') {

        tempFilter.closedAtFrom = closedAtFrom;
        tempFilter.closedAtTo = closedAtTo;

    }

    return tempFilter;

};
