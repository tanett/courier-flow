import { useSalesRequestData } from '../hooks/use-sales-request-data';
import { useSearchSalesShortQuery } from '../api/api';


export function useShortSalesList() {

    const { requestData } = useSalesRequestData();

    const { data, isFetching, isLoading, refetch } = useSearchSalesShortQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        shortSalesList: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
    };

}
