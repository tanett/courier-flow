import { useSearchProductExtendedQuery } from '../api/api';
import { useProductsRequestData } from './use-products-request-data';


export function useExtendedProductsList() {

    const { requestData } = useProductsRequestData();

    const { data, isFetching, isLoading, refetch } = useSearchProductExtendedQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        extendedProductsList: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
    };

}
