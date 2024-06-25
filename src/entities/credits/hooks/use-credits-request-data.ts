import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { CREDITS_SORTING_NAME, typeSearchCreditsSortingNames, typeSearchFilterCredits } from '../api/types';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { perPageVariants } from '../../../app/config/api-constants';
import { getCreditsFiltersFromUrl } from '../helpers/get-credits-filters-from-url';

export const useCreditsRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchFilterCredits = getCreditsFiltersFromUrl(urlParams);


    const requestData: typeSearchRequest<typeSearchFilterCredits, typeSearchCreditsSortingNames> = {
        filter: filter,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 0 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? perPageVariants.default,
        },
        sorts: [
            {
                sort: urlParams.sortName as CREDITS_SORTING_NAME || CREDITS_SORTING_NAME.CREATED_ON_TERMINAL_AT,
                direction: urlParams.sortDirection || sortDirection.dec,
            }
        ],
    };

    return {
        requestData,
        filter,
    };

};
