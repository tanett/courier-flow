import {  useSearchProductExtendedQuery } from '../api/api';
import { useProductsRequestData } from './use-products-request-data';


export function useProductsList() {

    const { requestData } = useProductsRequestData();

    const  { data,  isFetching, isLoading, refetch } = useSearchProductExtendedQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        productsList: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
    };

}
