import { typeUseUrlParams } from 'shared/hooks/use-url-params/types';
import { typeSearchFilterTerminalConfigurations } from '../api/types';

export const getTerminalConfigurationsFiltersFromUrl = (urlParams: typeUseUrlParams) => {

    const tempFilter: typeSearchFilterTerminalConfigurations = { archived: false };

    if (urlParams.searchPhrase) tempFilter.searchText = urlParams.searchPhrase;

    const terminalId = urlParams.getFilterValue('terminalId');
    if (terminalId && typeof terminalId === 'string') tempFilter.terminalIds = [ terminalId ];
    const storeId = urlParams.getFilterValue('storeId');
    if (storeId && typeof storeId === 'string') tempFilter.storeIds = [ storeId ];

    return tempFilter;

};
