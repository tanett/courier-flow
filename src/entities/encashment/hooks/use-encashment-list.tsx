import {useSearchEncashmentQuery} from "../api/api";
import {useEncashmentRequestData} from "./use-encashment-request-data";


export function useEncashmentList() {

    const { requestData } = useEncashmentRequestData();

  const { data, isFetching, isLoading, refetch } = useSearchEncashmentQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        encashmentList: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
    };

}
