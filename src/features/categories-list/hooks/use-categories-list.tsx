import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sortDirection, typeSearchRequest } from 'app/api/types';
import { DEFAULT_ITEMS_PER_PAGE_IN_TABLE } from 'app/config/api-constants';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { useLazySearchProductCategoryQuery } from '../../../entities/productsCategory/api/api';
import { typeProductCategory } from '../../../entities/productsCategory/model/types';
import { typeSearchFilterProductCategory } from '../../../entities/productsCategory/api/types';

export function useCategoriesList() {

    const location = useLocation();
    const urlParams = useUrlParams();

    const [ getCategoriesList, { isFetching } ] = useLazySearchProductCategoryQuery();
    const [ refetch, setRefetch ] = useState(true);
    const [ categoriesList, setCategoriesList ] = useState<typeProductCategory[]>();
    const [ pagination, setPagination ] = useState<typeTablePagination | undefined>(undefined);

    const filters: typeSearchFilterProductCategory= {};

    if (urlParams.searchPhrase) filters.searchText = urlParams.searchPhrase;

    const requestData: typeSearchRequest<typeSearchFilterProductCategory, 'NAME'> = {
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

            const response = await getCategoriesList(requestData).unwrap();
            setCategoriesList(response.content);
            setPagination(response.totalPages
                ? {
                    pageNumber: response.pageNumber,
                    totalPages: response.totalPages,
                    totalElements: response.totalElements,
                    pageSize: response.pageSize,
                }
                : undefined);

        } catch (err) {

            console.log('categoriesListResponse 58', err);

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

    return { categoriesList, isLoading: isFetching, pagination, setRefetch };

}
