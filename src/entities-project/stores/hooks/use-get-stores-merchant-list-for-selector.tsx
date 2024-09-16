import { useEffect, useState } from 'react';
import { sortDirection } from 'app/api/types';
import { useLazySearchStoreQuery } from 'entities-project/stores/api/api';
import { typeStore } from 'entities-project/stores/model/types';

export function useGetAllMerchantStoresForSelector(merchantId: string) {

    const [ getStoresList ] = useLazySearchStoreQuery();
    const [ storeList, setStoreList ] = useState<{
        value: string,
        label: string
    }[]>([]);

    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {

        const list: typeStore[] = [];
        const getData = async (pageNumber: number) => {

            setIsLoading(true);

            try {

                const n = await getStoresList({

                    filter: { merchantIds: [ merchantId ], archived: false },
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

                    getData(pageNumber + 1);

                } else {

                    const mappedList = list.map((item) => ({
                        value: String(item.id),
                        label: item.name || '-',
                    }));

                    setStoreList(mappedList);
                    setIsLoading(false);
                    return;

                }

            } catch (err) {

                console.log(err);

            }


        };

        getData(0).finally();

    }, []);

    return { storeList, isLoading };

}
