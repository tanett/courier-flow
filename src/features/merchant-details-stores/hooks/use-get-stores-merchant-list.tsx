import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { typeTablePagination } from '../../../shared/ui/table/types/type';
import { useLazySearchStoreQuery } from 'entities/stores/api/api';
import { typeStore } from 'entities/stores/model/types';
import { typeSearchFilterStore } from 'entities/stores/api/types';
import { DEFAULT_ITEMS_PER_PAGE_IN_TABLE } from 'app/config/api-constants';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';

export function useGetStoresMerchantList() {

    const location = useLocation();

    const urlParams = useUrlParams();

    const { id } = useParams();
    const [ refetch, setRefetch ] = useState(true);
    const [ getStoresList, { isFetching } ] = useLazySearchStoreQuery();
    const [ storeList, setStoreList ] = useState<typeStore[]>();
    const [ pagination, setPagination ] = useState<typeTablePagination | undefined>(undefined);


    const getData = async (requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'>) => {

        try {

            const storesListResponse = await getStoresList(requestData).unwrap();
            setStoreList(storesListResponse.content);
            setPagination(storesListResponse.totalPages
                ? {
                    pageNumber: storesListResponse.pageNumber,
                    totalPages: storesListResponse.totalPages,
                    totalElements: storesListResponse.totalElements,
                    pageSize: storesListResponse.pageSize,
                }
                : undefined);

        } catch (err) {

            console.log('storesMerchantResponse 58', err);

        }

    };


    useEffect(() => {

        if (location && id) {

            const filters: typeSearchFilterStore = { merchantIds: [ id ], archived: false };


            const requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'> = {
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
            getData(requestData).then();
            setRefetch(false);

        }

    }, [ location ]);

    useEffect(() => {

        if (location && id && refetch) {

            const filters: typeSearchFilterStore = { merchantIds: [ id ], archived: false };


            const requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'> = {
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
            getData(requestData).then();
            setRefetch(false);

        }

    }, [ refetch ]);

    return {
        storeList,
        isLoading: isFetching,
        pagination,
        setRefetch,
    };

}
