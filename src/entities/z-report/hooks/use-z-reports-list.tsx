import { useZReportsRequestData } from './use-z-reports-request-data';
import {useSearchZReportQuery} from "../api/api";


export function useZReportsList() {

    const { requestData } = useZReportsRequestData();

  const { data, isFetching, isLoading, refetch } = useSearchZReportQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        zReportsList: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
    };

}
