import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { perPageVariants } from '../../../app/config/api-constants';
import { typeSearchCashDeskSortingNames, typeSearchFilterCashDesk } from '../model/types';

export const useCashDeskRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchFilterCashDesk = { archived: false };

    if (urlParams.searchPhrase) filter.searchText = urlParams.searchPhrase;

    const storeId = urlParams.getFilterValue('storeId');
    if (storeId && typeof storeId === 'string') filter.storeIds = [ storeId ];

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
