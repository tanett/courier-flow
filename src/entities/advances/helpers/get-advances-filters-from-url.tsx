import { typeUseUrlParams } from 'shared/hooks/use-url-params/types';
import { typeSearchFilterAdvances, } from '../api/types';

export const getAdvancesFiltersFromUrl = (urlParams: typeUseUrlParams) => {

    const tempFilter: typeSearchFilterAdvances = {};

    if (urlParams.searchPhrase) {

        const searchPhrase = Number(urlParams.searchPhrase.replace(' ', ''));

        if (!isNaN(searchPhrase)) { tempFilter.totalCost = searchPhrase }

    }

    const storeId = urlParams.getFilterValue('storeId');
    if (storeId && typeof storeId === 'string') tempFilter.storeIds = [ storeId ];
    const employee = urlParams.getFilterValue('employeeId');
    if (employee && typeof employee === 'string') tempFilter.createdOnTerminalByIds = [ employee ];
    const terminalId = urlParams.getFilterValue('terminalId');
    if (terminalId && typeof terminalId === 'string') tempFilter.terminalIds = [ terminalId ];

    const createdOnTerminalAtFrom = urlParams.getFilterValue('createdOnTerminalAtFrom');
    const createdOnTerminalAtTo = urlParams.getFilterValue('createdOnTerminalAtTo');
    if (createdOnTerminalAtTo && typeof createdOnTerminalAtTo === 'string' && createdOnTerminalAtFrom && typeof createdOnTerminalAtFrom === 'string') {

        tempFilter.createdOnTerminalAtFrom = createdOnTerminalAtFrom;
        tempFilter.createdOnTerminalAtTo = createdOnTerminalAtTo;

    }

    return tempFilter;

};
