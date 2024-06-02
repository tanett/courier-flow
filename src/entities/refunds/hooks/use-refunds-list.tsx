import { useRefundsRequestData } from './use-refunds-request-data';
import { useSearchRefundsQuery } from '../api/api';


export function useRefundsList() {

    const { requestData } = useRefundsRequestData();

  const { data, isFetching, isLoading, refetch } = useSearchRefundsQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        refundsList: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
    };

}
