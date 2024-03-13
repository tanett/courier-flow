import useGetUserDataByIdFromUrl from '../../../entities/users/hooks/use-get-user-data-by-id-from-url';
import { useEffect, useState } from 'react';
import { typeStore } from '../../../entities/stores/model/types';
import { useLazySearchStoreQuery } from '../../../entities/stores/api/api';
import { sortDirection } from 'app/api/types';

export const useGetUserFromUrlWithStoresData = () => {

    const {
        userData,
        isUserFetching,
    } = useGetUserDataByIdFromUrl();

    const [ getStoresList, {isFetching: isStoresFetching} ] = useLazySearchStoreQuery();

    const [storesList, setStoresList] = useState<typeStore[] | undefined>(undefined)


    useEffect(() => {
        if(userData && userData.storeIds.length>0){
            const list: typeStore[] = [];
            const getStoresData = async (storesIds: string[], pageNumber: number) => {
                try {

                    const n = await getStoresList({

                        filter: { ids: storesIds, archived: false },
                        pagination: {
                            pageNumber: pageNumber,
                            pageSize: 100,
                        },
                        sorts: [
                            {
                                sort: 'NAME',
                                direction: sortDirection.asc,
                            }
                        ],
                    }).unwrap();

                    list.push(...n.content);

                    if (n.pageNumber < n.totalPages - 1) {

                        getStoresData(storesIds,pageNumber + 1);

                    } else {

                        setStoresList(list);
                        return;

                    }

                } catch (err) {

                    console.log(err);

                }}
            getStoresData(userData.storeIds, 0).then()
        }

    }, [userData]);

    return {
        userData,
        isUserFetching,
        storesList,
        isStoresFetching
    }
}
