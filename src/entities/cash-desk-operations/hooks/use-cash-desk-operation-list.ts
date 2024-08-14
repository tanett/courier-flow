import { useSearchCashDeskOperationsQuery } from '../api/api';
import { useCashDeskOperationsRequestData } from './use-cash-desk-operations-request-data';


export function useCashDeskOperationList() {

    const { requestData } = useCashDeskOperationsRequestData();

    const { data, isFetching, error, isLoading, refetch } = useSearchCashDeskOperationsQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        cashDeskOperationsList: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
        error,
    };

}
