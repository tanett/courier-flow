import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sortDirection, typeSearchRequest } from 'app/api/types';
import { DEFAULT_ITEMS_PER_PAGE_IN_TABLE } from 'app/config/api-constants';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeSearchFilter } from '../../../entities/users/api/types';
import { useLazySearchStoreQuery } from '../../../entities/stores/api/api';
import { typeStore, typeStoreType } from '../../../entities/stores/model/types';
import { typeSearchFilterStore } from '../../../entities/stores/api/types';

export function useStoresList() {

    const location = useLocation();
    const urlParams = useUrlParams();

    const [ getStoresList, { isFetching } ] = useLazySearchStoreQuery();
    const [ refetch, setRefetch ] = useState(true);
    const [ storesList, setStoresList ] = useState<typeStore[]>();
    const [ pagination, setPagination ] = useState<typeTablePagination | undefined>(undefined);

    const filters: typeSearchFilterStore = { archived: false, };

    if (urlParams.searchPhrase) filters.searchText = urlParams.searchPhrase;

    const createdAtFrom = urlParams.getFilterValue('createdAtFrom');
    const createdAtTo = urlParams.getFilterValue('createdAtTo');
    if (createdAtTo && typeof createdAtTo === 'string' && createdAtFrom && typeof createdAtFrom === 'string') {

        //   filters.createdAtFrom = createdAtFrom; filters.createdAtTo = createdAtTo;  todo fix it

    }


    const type = urlParams.getFilterValue('type');
    if (type && typeof type === 'string') filters.types = [ type as typeStoreType ];

    const requestData: typeSearchRequest<typeSearchFilter, 'NAME'> = {
        filter: filters,
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

    const getData = async () => {

        try {

            const response = await getStoresList(requestData).unwrap();
            setStoresList(response.content);
            setPagination(response.totalPages
                ? {
                    pageNumber: response.pageNumber,
                    totalPages: response.totalPages,
                    totalElements: response.totalElements,
                    pageSize: response.pageSize,
                }
                : undefined);

        } catch (err) {

            console.log('storesListResponse 70', err);

        }

    };


    useEffect(() => {

        if (location) {

            getData().then();

        }

    }, [ location ]);

    useEffect(() => {

        if (location && refetch) {

            getData().then();
            setRefetch(false);

        }

    }, [ refetch ]);

    return {
        storesList,
        isLoading: isFetching,
        pagination,
        setRefetch
    };

}
