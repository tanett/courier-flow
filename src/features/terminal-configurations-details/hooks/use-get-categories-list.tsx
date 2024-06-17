import { sortDirection, typeSearchRequest } from 'app/api/types';
import { pageSizeForSelectors } from 'features/terminal-configurations-details/ui/list-stores&terminals/constants';
import { useEffect, useState } from 'react';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeSearchFilterCategory } from '../../../entities/category/api/types';
import { useSearchCategoryExtendedQuery } from '../../../entities/category/api/api';
import { typeCategoryExtended } from '../../../entities/category/model/types';


export const useGetCategoriesList = (categoriesIds: string[],pageNumber: number) => {

    if (categoriesIds.length === 0) {
        return {
            categoriesList: [],
            currentPagination: undefined,
            isFetching: false
        };
    }

    const requestData: typeSearchRequest<typeSearchFilterCategory, 'NAME'> = {
        filter: {ids: categoriesIds},
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

    const {data, isFetching} = useSearchCategoryExtendedQuery(requestData);

    const [ categoriesList, setCategoriesList ] = useState<typeCategoryExtended[] | null>(null);
    const [ currentPagination, setCurrentPagination ] = useState<typeTablePagination | undefined>(undefined);

    useEffect(() => {
        if (data) {
            setCategoriesList((categoriesList && data.pageNumber>0) ? [ ...categoriesList, ...data.content ] : data.content);

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
        categoriesList,
        currentPagination,
        isFetching,
    }
}
