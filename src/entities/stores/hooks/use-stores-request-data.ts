import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { typeSearchFilterStore } from '../api/types';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { DEFAULT_ITEMS_PER_PAGE_IN_TABLE,  } from '../../../app/config/api-constants';
import { typeStoreType } from '../../../entities/stores/model/types';

export const useStoresRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchFilterStore = { archived: false };

    if (urlParams.searchPhrase) filter.searchText = urlParams.searchPhrase;

    const createdAtFrom = urlParams.getFilterValue('createdAtFrom');
    const createdAtTo = urlParams.getFilterValue('createdAtTo');
    if (createdAtTo && typeof createdAtTo === 'string' && createdAtFrom && typeof createdAtFrom === 'string') {

        filter.createdAtFrom = createdAtFrom; filter.createdAtTo = createdAtTo;

    }


    const type = urlParams.getFilterValue('type');
    if (type && typeof type === 'string') filter.types = [ type as typeStoreType ];

    const requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'> = {
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
