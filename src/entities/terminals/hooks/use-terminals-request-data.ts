import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { typeSearchTerminalsFilter } from '../api/types';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { DEFAULT_ITEMS_PER_PAGE_IN_TABLE } from '../../../app/config/api-constants';

export const useTerminalsRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchTerminalsFilter = { archived: false };

    if (urlParams.searchPhrase) filter.searchText = urlParams.searchPhrase;

    const model = urlParams.getFilterValue('model');
    if (model && typeof model === 'string') filter.models = [ model ];

    const serialNumber = urlParams.getFilterValue('serialNumber');
    if (serialNumber && typeof serialNumber === 'string') filter.serialNumbers = [ serialNumber ];

    const fiscalCardId = urlParams.getFilterValue('fiscalCardId');
    if (fiscalCardId && typeof fiscalCardId === 'string') filter.fiscalCardIds = [ fiscalCardId ];

    const blocked = urlParams.getFilterValue('blocked');
    if (blocked && typeof blocked === 'string') filter.blocked = blocked === 'true';

    const storeId = urlParams.getFilterValue('storeId');
    if (storeId && typeof storeId === 'string') filter.storeIds = [ storeId ];

    const requestData: typeSearchRequest<typeSearchTerminalsFilter, 'CREATED_AT'> = {
        filter: filter,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 1 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE_IN_TABLE,
        },
        sorts: [
            {
                sort: 'CREATED_AT',
                direction: sortDirection.asc,
            }
        ],
    };
    return {
        requestData,
        filter,
    };

};
