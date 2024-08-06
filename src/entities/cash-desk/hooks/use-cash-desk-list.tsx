import {useSearchCashDeskQuery} from "../api/api";
import {useCashDeskRequestData} from "./use-cash-desk-request-data";


export function useCashDeskList() {

    const { requestData } = useCashDeskRequestData();

  const { data, isFetching, isLoading, refetch } = useSearchCashDeskQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        cashDeskList: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
    };

}
