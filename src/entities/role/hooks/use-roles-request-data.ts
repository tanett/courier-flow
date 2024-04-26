import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { typeSearchRolesFilter } from '../api/types';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { accessScope, DEFAULT_ITEMS_PER_PAGE_IN_TABLE } from '../../../app/config/api-constants';

export const useRolesRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchRolesFilter = { accessScopes: [ accessScope.merchant, accessScope.store ], clientRole: false };

    if (urlParams.searchPhrase) filter.searchText = urlParams.searchPhrase;

    const requestData: typeSearchRequest<typeSearchRolesFilter, 'NAME'> = {
        filter: filter,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 1 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE_IN_TABLE,
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
