import { useSearchOrdersShortExtendedQuery, } from '../api/api';
import { useOrdersRequestData } from './use-orders-request-data';


export function useShortOrdersList() {

    const { requestData } = useOrdersRequestData();

    const { data, isFetching, isLoading, refetch } = useSearchOrdersShortExtendedQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        ordersShortList: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
    };

}
