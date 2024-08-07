import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { perPageVariants } from '../../../app/config/api-constants';
import {typeSearchCashDeskSortingNames, typeSearchFilterCashDesk} from '../model/types';

export const useCashDeskRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchFilterCashDesk = { archived: false };

    if (urlParams.searchPhrase) filter.searchText = urlParams.searchPhrase

    /* const fiscalId = urlParams.getFilterValue('fiscalId');
    if (fiscalId && fiscalId.length > 0 && typeof fiscalId === 'string') filter.fiscalModuleIds = [ fiscalId ]; else delete filter.fiscalModuleIds

    const terminalSN = urlParams.getFilterValue('terminalSN');
    if (terminalSN && terminalSN.length > 0 && typeof terminalSN === 'string') filter.terminalSerialNumbers = [ terminalSN ]; else delete filter.terminalSerialNumbers

    const closeDateFrom = urlParams.getFilterValue('closeDateFrom');
    const closeDateTo = urlParams.getFilterValue('closeDateTo');
    if (closeDateTo && typeof closeDateTo === 'string' && closeDateFrom && typeof closeDateFrom === 'string') {

        filter.closedAtFrom = closeDateFrom;
        filter.closedAtTo = closeDateTo;

    } */

    const requestData: typeSearchRequest<typeSearchFilterCashDesk, typeSearchCashDeskSortingNames> = {
        filter: filter,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 0 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? perPageVariants.default,
        },
        sorts: [
            {
                sort: 'NAME',
                direction: sortDirection.asc,
            }
        ],
    };

    return {
        requestData,
        filter,
    };

};
