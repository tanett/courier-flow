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
    const employee = urlParams.getFilterValue('employeeId');
    if (employee && typeof employee === 'string') tempFilter.cashierIds = [ employee ];

    // const refundedAtFrom = urlParams.getFilterValue('refundedAtFrom');
    // const refundedAtTo = urlParams.getFilterValue('refundedAtTo');
    // if (refundedAtTo && typeof refundedAtTo === 'string' && refundedAtFrom && typeof refundedAtFrom === 'string') {
    //
    //     tempFilter.refundedAtFrom = refundedAtFrom;
    //     tempFilter.refundedAtTo = refundedAtTo;
    //
    // }

    return tempFilter;

};
