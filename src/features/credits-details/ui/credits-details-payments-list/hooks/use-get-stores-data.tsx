import { useEffect, useState } from 'react';
import { typeStore } from '../../../../../entities/stores/model/types';
import { useLazySearchStoreQuery } from '../../../../../entities/stores/api/api';
import { errorHandler } from 'app/utils/errorHandler';
import { sortDirection, typeResponseError } from 'app/api/types';
import { useAppDispatchT } from 'app/state';
import { typePaymentCredit } from '../../../../../entities/credits/model/types';


export const useGetStoresData = (paymentsList: typePaymentCredit[] | undefined) => {

    const dispatchAppT = useAppDispatchT();

    const [ storesData, setStoresData ] = useState<Record<string, typeStore> | undefined>(undefined);

    const [ getData, { isFetching } ] = useLazySearchStoreQuery();

    const getStoresData = async (ids: string[]) => {
        try {
            const response = await getData({
                filter: { ids: ids },
                pagination: {
                    pageNumber: 0,
                    pageSize: 50,
                },
                sorts: [
                    {
                        sort: 'NAME',
                        direction: sortDirection.asc,
                    }
                ],
            }).unwrap();
            setStoresData(response.content.reduce((prev: Record<string, typeStore>, curr) => {
                prev[curr.id] = curr;
                return prev;
            }, {}));
        } catch (error) {
            errorHandler(error as typeResponseError, 'onGetStores', dispatchAppT);
        }

    };

    useEffect(() => {
        if (paymentsList) {
            const setIds = Array.from(new Set(paymentsList.map(item => item.storeId)));

            getStoresData(setIds).then();
        }

    }, [ paymentsList ]);

    return {
        isFetching,
        storesData
    };
};
