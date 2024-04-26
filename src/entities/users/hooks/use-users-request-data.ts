import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { typeSearchFilterUsers } from '../api/types';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { accessScope, DEFAULT_ITEMS_PER_PAGE_IN_TABLE } from '../../../app/config/api-constants';

export const useUsersRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchFilterUsers = {
        archived: false,
        accessScopes: [ accessScope.merchant, accessScope.store ],
    };

    if (urlParams.searchPhrase) filter.searchText = urlParams.searchPhrase;

    const roleId = urlParams.getFilterValue('roleId');
    if (roleId && typeof roleId === 'string') filter.roleIds = [ roleId ];
    const storeId = urlParams.getFilterValue('storeId');
    if (storeId && typeof storeId === 'string') filter.storeIds = [ storeId ];

    const requestData: typeSearchRequest<typeSearchFilterUsers, 'FULL_NAME'> = {
        filter: filter,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 1 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE_IN_TABLE,
        },
        sorts: [
            {
                sort: 'FULL_NAME',
                direction: sortDirection.asc,
            }
        ],
    };

    return {
        requestData,
        filter,
    };

};
