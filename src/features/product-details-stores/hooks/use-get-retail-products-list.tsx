import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { typeTablePagination } from '../../../shared/ui/table/types/type';
import { DEFAULT_ITEMS_PER_PAGE_IN_TABLE } from 'app/config/api-constants';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { typeSearchFilterUsers } from '../../../entities/users/api/types';
import { useLazySearchRetailProductQuery } from '../../../entities/retail-products/api/api';
import { typeRetailProduct } from '../../../entities/retail-products/model/types';
import { typeSearchFilterRetailProduct } from '../../../entities/retail-products/api/types';

export function useGetRetailProductsList() {

    const location = useLocation();

    const urlParams = useUrlParams();

    const { id } = useParams();

    const [ getRetailProductsList, { isFetching } ] = useLazySearchRetailProductQuery();
    const [ refetch, setRefetch ] = useState(true);
    const [ list, setList ] = useState<typeRetailProduct[]>();
    const [ pagination, setPagination ] = useState<typeTablePagination | undefined>(undefined);


    const getData = async (requestData: typeSearchRequest<typeSearchFilterRetailProduct, 'STORE_NAME'>) => {

        try {

            const response = await getRetailProductsList(requestData).unwrap();
            setList(response.content);
            setPagination(response.totalPages
                ? {
                    pageNumber: response.pageNumber,
                    totalPages: response.totalPages,
                    totalElements: response.totalElements,
                    pageSize: response.pageSize,
                }
                : undefined);

        } catch (err) {

            console.log('retailProductsListResponse 58', err);

        }

    };


    useEffect(() => {

        if (location && id) {

            const filters: typeSearchFilterRetailProduct = {productsIds: [id] };

            const requestData: typeSearchRequest<typeSearchFilterRetailProduct, 'STORE_NAME'> = {
                filter: filters,
                pagination: {
                    pageNumber: urlParams.pageNumber && urlParams.pageNumber > 1 ? urlParams.pageNumber - 1 : 0,
                    pageSize: urlParams.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE_IN_TABLE,
                },
                sorts: [
                    {
                        sort: 'STORE_NAME',
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

            const filters: typeSearchFilterRetailProduct = {productsIds: [id] };
            const requestData: typeSearchRequest<typeSearchFilterUsers, 'STORE_NAME'> = {
                filter: filters,
                pagination: {
                    pageNumber: urlParams.pageNumber && urlParams.pageNumber > 1 ? urlParams.pageNumber - 1 : 0,
                    pageSize: urlParams.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE_IN_TABLE,
                },
                sorts: [
                    {
                        sort: 'STORE_NAME',
                        direction: sortDirection.asc,
                    }
                ],
            };

            getData(requestData).then();
            setRefetch(false);

        }

    }, [ refetch ]);

    return {
        list,
        isLoading: isFetching,
        pagination,
        setRefetch,
    };

}
