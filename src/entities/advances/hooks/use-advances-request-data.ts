import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { typeSearchAdvancesSortingNames, typeSearchFilterAdvances } from '../api/types';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { perPageVariants } from '../../../app/config/api-constants';
import { getAdvancesFiltersFromUrl } from '../helpers/get-advances-filters-from-url';

export const useAdvancesRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchFilterAdvances = getAdvancesFiltersFromUrl(urlParams);


    const requestData: typeSearchRequest<typeSearchFilterAdvances, typeSearchAdvancesSortingNames> = {
        filter: filter,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 0 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? perPageVariants.default,
        },
        sorts: [
            {
                sort: 'CREATED_ON_TERMINAL_AT',
                direction:  sortDirection.dec,
            }
        ],
    };

    return {
        requestData,
        filter,
    };

};
