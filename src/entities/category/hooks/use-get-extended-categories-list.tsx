import { useSearchCategoryExtendedQuery } from '../api/api';
import { useCategoriesRequestData } from './use-categories-request-data';

export function useGetExtendedCategoriesList() {

    const {requestData} = useCategoriesRequestData()

    const {data,  isFetching, isLoading, refetch} = useSearchCategoryExtendedQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        categoriesList: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
    };

}
