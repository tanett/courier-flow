import { typeUseUrlParams } from 'shared/hooks/use-url-params/types';
import { typePaymentStatus, typeSearchFilterCredits, } from '../api/types';

export const getCreditsFiltersFromUrl = (urlParams: typeUseUrlParams) => {

    const tempFilter: typeSearchFilterCredits = {};

    if (urlParams.searchPhrase) {

        const searchPhrase = Number(urlParams.searchPhrase);

        if (!isNaN(searchPhrase)) { tempFilter._or_ = [{amount: searchPhrase, }, {salePublicId: urlParams.searchPhrase}]; } else { tempFilter._or_ = [{salePublicId: urlParams.searchPhrase}]; }

    }

    const storeId = urlParams.getFilterValue('storeId');
    if (storeId && typeof storeId === 'string') tempFilter.storeIds = [ storeId ];

    const status = urlParams.getFilterValue('status');
    if (status &&  typeof status === 'string') tempFilter.status = status==='PAID'? 'PAID': status === 'NOT_PAID' ? 'NOT_PAID' : undefined;

    // const terminalId = urlParams.getFilterValue('terminalId');
    // if (terminalId && typeof terminalId === 'string') tempFilter.terminalIds = [ terminalId ];

    const createdOnTerminalAtFrom = urlParams.getFilterValue('createdOnTerminalAtFrom');
    const createdOnTerminalAtTo = urlParams.getFilterValue('createdOnTerminalAtTo');
    if (createdOnTerminalAtTo && typeof createdOnTerminalAtTo === 'string' && createdOnTerminalAtFrom && typeof createdOnTerminalAtFrom === 'string') {

        tempFilter.createdOnTerminalAtFrom = createdOnTerminalAtFrom;
        tempFilter.createdOnTerminalAtTo = createdOnTerminalAtTo;

    }

    return tempFilter;

};
