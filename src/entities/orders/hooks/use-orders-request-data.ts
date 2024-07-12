import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { typeSearchFilterOrders, typeSearchOrdersSortingNames } from '../api/types';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { perPageVariants } from '../../../app/config/api-constants';
import { getOrdersFiltersFromUrl } from '../helpers/get-orders-filters-from-url';

export const useOrdersRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchFilterOrders = getOrdersFiltersFromUrl(urlParams);


    const requestData: typeSearchRequest<typeSearchFilterOrders, typeSearchOrdersSortingNames> = {
        filter: filter,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 0 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? perPageVariants.default,
        },
        sorts: [
            {
                sort: 'ORDERED_AT',
                direction: urlParams.sortDirection? urlParams.sortDirection : sortDirection.dec,
            }
        ],
    };

    return {
        requestData,
        filter,
    };

};
