import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { useLazySearchProductExtendedQuery } from '../../../entities/products/api/api';
import { typeProductExtended } from '../../../entities/products/model/state-slice/types';
import { getProductsFiltersFromUrl } from '../../../entities/products/helpers/get-products-filters-from-url';
import { sortDirection, typeSearchRequest } from 'app/api/types';
import { typeSearchFilterProduct } from '../../../entities/products/api/types';
import { DEFAULT_ITEMS_PER_PAGE_IN_TABLE } from 'app/config/api-constants';

export function useProductsList() {

    const location = useLocation();
    const urlParams = useUrlParams();

    const [ getProductsList, { isFetching } ] = useLazySearchProductExtendedQuery();
    const [ refetch, setRefetch ] = useState(true);
    const [ productsList, setProductsList ] = useState<typeProductExtended[]>();
    const [ pagination, setPagination ] = useState<typeTablePagination | undefined>(undefined);


    const getData = async () => {

        const filters = getProductsFiltersFromUrl(urlParams);

        const requestData: typeSearchRequest<typeSearchFilterProduct, 'NAME'> = {
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

        try {

            const response = await getProductsList(requestData).unwrap();
            setProductsList(response.content);
            setPagination(response.totalPages
                ? {
                    pageNumber: response.pageNumber,
                    totalPages: response.totalPages,
                    totalElements: response.totalElements,
                    pageSize: response.pageSize,
                }
                : undefined);

        } catch (err) {

            console.log('productListResponse 58', err);

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
        productsList,
        isLoading: isFetching,
        pagination,
        setRefetch,
    };

}
