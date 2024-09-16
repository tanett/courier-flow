import { useSearchOrdersShortExtendedQuery, } from '../api/api';
import { getOrdersRequestData, } from './use-orders-request-data';



export function useShortOrdersList(courierId: string) {

    const { requestData } = getOrdersRequestData(courierId);

    const {data, isFetching, refetch} = useSearchOrdersShortExtendedQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined

    return {
        ordersShortList: data?.content,
        isLoading: isFetching ,
        pagination,
        refetch
    };

}
