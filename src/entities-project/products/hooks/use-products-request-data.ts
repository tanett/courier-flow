import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { typeSearchFilterProductExtended, typeSearchProductSortingNames } from '../api/types';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { perPageVariants } from '../../../app/config/api-constants';
import { getProductsFiltersFromUrl } from '../../products/helpers/get-products-filters-from-url';

export const useProductsRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchFilterProductExtended = getProductsFiltersFromUrl(urlParams);


    const requestData: typeSearchRequest<typeSearchFilterProductExtended, typeSearchProductSortingNames> = {
        filter: filter,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 0 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? perPageVariants.default,
        },
        sorts: [
            {
                sort: 'NAME',
                direction: urlParams.sortDirection? urlParams.sortDirection : sortDirection.asc,
            }
        ],
    };

    return {
        requestData,
        filter,
    };

};
