import { typeUseUrlParams } from 'shared/hooks/use-url-params/types';
import { typeSearchFilterRefunds } from '../api/types';

export const getRefundsFiltersFromUrl = (urlParams: typeUseUrlParams) => {

    const tempFilter: typeSearchFilterRefunds = {};

    if (urlParams.searchPhrase) {
        const searchPhrase = Number(urlParams.searchPhrase);
        if (!isNaN(searchPhrase)) {
            const orFilter: typeSearchFilterRefunds['_or_'] = [];
            if (Number.isInteger(searchPhrase)) {orFilter.push({ receiptNumber: searchPhrase });}
            orFilter.push({ totalPaymentsAmount: searchPhrase });
            tempFilter._or_ = orFilter
        }

    }


    const storeId = urlParams.getFilterValue('storeId');
    if (storeId && typeof storeId === 'string') tempFilter.storeIds = [ storeId ];
    const employee = urlParams.getFilterValue('employeeId');
    if (employee && typeof employee === 'string') tempFilter.refundedByIds = [ employee ];
    const terminalId = urlParams.getFilterValue('terminalId');
    if (terminalId && typeof terminalId === 'string') tempFilter.terminalIds = [ terminalId ];

    const refundedAtFrom = urlParams.getFilterValue('refundedAtFrom');
    const refundedAtTo = urlParams.getFilterValue('refundedAtTo');
    if (refundedAtTo && typeof refundedAtTo === 'string' && refundedAtFrom && typeof refundedAtFrom === 'string') {

        tempFilter.refundedAtFrom = refundedAtFrom;
        tempFilter.refundedAtTo = refundedAtTo;

    }

    return tempFilter;

};
