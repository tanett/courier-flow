import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sortDirection, typeSearchRequest } from 'app/api/types';
import { DEFAULT_ITEMS_PER_PAGE_IN_TABLE } from 'app/config/api-constants';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { useLazySearchCategoryExtendedQuery } from '../../../entities/category/api/api';
import { typeCategoryExtended } from '../../../entities/category/model/types';
import { typeSearchFilterCategory } from '../../../entities/category/api/types';

export function useCategoriesList() {

    const location = useLocation();
    const urlParams = useUrlParams();

    const [ getCategoriesList, { isFetching } ] = useLazySearchCategoryExtendedQuery();
    const [ refetch, setRefetch ] = useState(true);
    const [ categoriesList, setCategoriesList ] = useState<typeCategoryExtended[]>();
    const [ pagination, setPagination ] = useState<typeTablePagination | undefined>(undefined);

    const filters: typeSearchFilterCategory = {};

    if (urlParams.searchPhrase) filters.searchText = urlParams.searchPhrase;

    const requestData: typeSearchRequest<typeSearchFilterCategory, 'NAME'> = {
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
