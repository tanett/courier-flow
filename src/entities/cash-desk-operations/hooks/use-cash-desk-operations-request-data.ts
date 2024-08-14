import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { perPageVariants } from '../../../app/config/api-constants';
import {
    typeSearchCashDeskOperationsSortingNames,
    typeSearchFilterCashDeskOperations,
} from '../model/types';

export const useCashDeskOperationsRequestData = (cashDeskId: string | undefined) => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchFilterCashDeskOperations = {};

    if (cashDeskId) filter.cashDeskIds = [ cashDeskId ];

    /* if (urlParams.searchPhrase) filter.searchText = urlParams.searchPhrase;

    const storeId = urlParams.getFilterValue('storeId');
    if (storeId && typeof storeId === 'string') filter.storeIds = [ storeId ]; */

    const requestData: typeSearchRequest<typeSearchFilterCashDeskOperations, typeSearchCashDeskOperationsSortingNames> = {
        filter: filter,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 0 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? perPageVariants.default,
        },
        sorts: [
            {
                sort: 'CREATED_AT',
                direction: sortDirection.dec,
            }
        ],
    };

    return {
        requestData,
        filter,
    };

};
