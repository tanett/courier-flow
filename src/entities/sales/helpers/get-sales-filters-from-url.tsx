import { typeUseUrlParams } from 'shared/hooks/use-url-params/types';
import { typeSearchFilterSales } from '../api/types';

export const getSalesFiltersFromUrl = (urlParams: typeUseUrlParams) => {

    const tempFilter: typeSearchFilterSales = {};

    if (urlParams.searchPhrase) {
        const searchPhrase = Number(urlParams.searchPhrase);
        if (!isNaN(searchPhrase)) {
            const orFilter: typeSearchFilterSales['_or_'] = [];
            if (Number.isInteger(searchPhrase)) {orFilter.push({ receiptNumber: searchPhrase });}
            orFilter.push({ totalCost: searchPhrase });
            tempFilter._or_ = orFilter
        }

    }

    const storeId = urlParams.getFilterValue('storeId');
    if (storeId && typeof storeId === 'string') tempFilter.storeIds = [ storeId ];
    const employee = urlParams.getFilterValue('employeeId');
    if (employee && typeof employee === 'string') tempFilter.soldByIds = [ employee ];
    const terminalId = urlParams.getFilterValue('terminalId');
    if (terminalId && typeof terminalId === 'string') tempFilter.terminalIds = [ terminalId ];

    const soldAtFrom = urlParams.getFilterValue('soldAtFrom');
    const soldAtTo = urlParams.getFilterValue('soldAtTo');
    if (soldAtTo && typeof soldAtTo === 'string' && soldAtFrom && typeof soldAtFrom === 'string') {

        tempFilter.soldAtFrom = soldAtFrom;
        tempFilter.soldAtTo = soldAtTo;

    }

    return tempFilter;

};
