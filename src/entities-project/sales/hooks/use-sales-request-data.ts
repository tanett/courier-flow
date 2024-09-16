import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { typeSearchFilterSales, typeSearchSalesSortingNames } from '../api/types';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { perPageVariants } from '../../../app/config/api-constants';
import { getSalesFiltersFromUrl } from '../helpers/get-sales-filters-from-url';

export const useSalesRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchFilterSales = getSalesFiltersFromUrl(urlParams);


    const requestData: typeSearchRequest<typeSearchFilterSales, typeSearchSalesSortingNames> = {
        filter: filter,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 0 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? perPageVariants.default,
        },
        sorts: [
            {
                sort: 'SOLD_AT',
                direction: sortDirection.dec,
            }
        ],
    };

    return {
        requestData,
        filter,
    };

};
