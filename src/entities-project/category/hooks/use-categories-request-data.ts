import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';

import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { DEFAULT_ITEMS_PER_PAGE_IN_TABLE } from '../../../app/config/api-constants';
import { typeSearchFilterCategory } from '../api/types';

export const useCategoriesRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchFilterCategory = {};

    if (urlParams.searchPhrase) filter.searchText = urlParams.searchPhrase;

    const requestData: typeSearchRequest<typeSearchFilterCategory, 'NAME'> = {
        filter: filter,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 1 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE_IN_TABLE,
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
