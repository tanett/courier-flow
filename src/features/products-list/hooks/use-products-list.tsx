import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sortDirection, typeSearchRequest } from 'app/api/types';
import { DEFAULT_ITEMS_PER_PAGE_IN_TABLE } from 'app/config/api-constants';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { useLazySearchProductQuery } from '../../../entities/products/api/api';
import { typeSearchFilterProduct } from '../../../entities/products/api/types';
import { typeProduct } from '../../../entities/products/model/state-slice/types';

export function useProductsList() {

    const location = useLocation();
    const urlParams = useUrlParams();

    const [ getProductsList, { isFetching } ] = useLazySearchProductQuery();
    const [ refetch, setRefetch ] = useState(true);
    const [ productsList, setProductsList ] = useState<typeProduct[]>();
    const [ pagination, setPagination ] = useState<typeTablePagination | undefined>(undefined);

    const filters: typeSearchFilterProduct = { archived: false,  };

    if (urlParams.searchPhrase) filters.searchText = urlParams.searchPhrase;
    //
    // const roleId = urlParams.getFilterValue('roleId');
    // if (roleId && typeof roleId === 'string') filters.roleIds = [ roleId ]; todo fix it
    // const storeId = urlParams.getFilterValue('storeId');
    // if (storeId && typeof storeId === 'string') filters.storeIds = [ storeId ];

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

    const getData = async () => {

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
        setRefetch
    };

}
