import { sortDirection, typeSearchRequest } from 'app/api/types';
import { pageSizeForSelectors } from 'features/terminal-configurations-details/ui/list-stores&terminals/constants';
import { useEffect, useState } from 'react';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeSearchFilterProduct } from '../../../entities/products/api/types';
import { useSearchProductQuery } from '../../../entities/products/api/api';
import { typeProduct } from 'entities/products/model/state-slice';


export const useGetProductsByCategoryList = (categoryId: string,pageNumber: number) => {

    const requestData: typeSearchRequest<typeSearchFilterProduct, 'NAME'> = {
        filter: {categoriesIds: [categoryId], archived: false},
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

    const {data, isFetching} = useSearchProductQuery(requestData);

    const [ productsList, setProductsList ] = useState<typeProduct[] | null>(null);
    const [ currentPagination, setCurrentPagination ] = useState<typeTablePagination | undefined>(undefined);

    useEffect(() => {
        if (data) {

            setProductsList((productsList && data.pageNumber>0 )? [ ...productsList, ...data.content ] : data.content);

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
        productsList,
        currentPagination,
        isFetching,
    }
}
