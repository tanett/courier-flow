import useGetUserDataByIdFromUrl from '../../../entities/users/hooks/use-get-user-data-by-id-from-url';
import { useEffect, useState } from 'react';
import { typeStore } from '../../../entities/stores/model/types';
import { useLazySearchStoreQuery } from '../../../entities/stores/api/api';
import { sortDirection } from 'app/api/types';
import { useLocation } from 'react-router-dom';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { DEFAULT_ITEMS_PER_PAGE_IN_TABLE } from 'app/config/api-constants';

export const useGetUserFromUrlWithStoresData = () => {

    const location = useLocation();
    const urlParams = useUrlParams();

    const {
        userData,
        isUserFetching,
    } = useGetUserDataByIdFromUrl();

    const [ getStoresList, {isFetching: isStoresFetching} ] = useLazySearchStoreQuery();

    const [storesList, setStoresList] = useState<typeStore[] | undefined>(undefined)
    const [ pagination, setPagination ] = useState<typeTablePagination | undefined>(undefined);

    const getStoresData = async (storesIds: string[]) => {
        try {

            const response = await getStoresList({

                filter: { ids: storesIds, archived: false },
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
            }).unwrap();

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

            console.log(err);

        }}

    useEffect(() => {

        if(userData && userData.storeIds.length>0){

            getStoresData(userData.storeIds).then()

        }

    }, [userData, location]);

    return {
        userData,
        isUserFetching,
        storesList,
        isStoresFetching,
        pagination
    }
}
