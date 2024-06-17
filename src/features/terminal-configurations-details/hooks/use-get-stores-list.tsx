import { sortDirection, typeSearchRequest } from 'app/api/types';
import { typeSearchFilterStore } from '../../../entities/stores/api/types';
import { pageSizeForSelectors } from 'features/terminal-configurations-details/ui/list-stores&terminals/constants';
import { useSearchStoreQuery } from '../../../entities/stores/api/api';
import { useEffect, useState } from 'react';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeStore } from '../../../entities/stores/model/types';


export const useGetStoresList = (storesIds: string[],pageNumber: number) => {

    const requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'> = {
        filter: {ids: storesIds, archived: false},
        pagination: {
            pageNumber: pageNumber,
            pageSize: pageSizeForSelectors,
        },
        sorts: [
            {
                sort: 'NAME',
                direction: sortDirection.asc,
            }
        ],
    }

    const {data, isFetching} = useSearchStoreQuery(requestData);

    const [ storesList, setStoresList ] = useState<typeStore[] | null>(null);
    const [ currentPagination, setCurrentPagination ] = useState<typeTablePagination | undefined>(undefined);

    useEffect(() => {
        if (data) {
            setStoresList(storesList ? [ ...storesList, ...data.content ] : data.content);

            const pagination = data.totalPages
                ? {
                    pageNumber: data.pageNumber,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    pageSize: data.pageSize,
                }
                : undefined;

            setCurrentPagination(pagination);
        }

    }, [ data ]);

    return {
        storesList,
        currentPagination,
        isFetching,
    }
}
