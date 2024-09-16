import { useSearchTerminalsExtendedQuery } from '../api/api';
import { useTerminalsRequestData } from './use-terminals-request-data';


export function useExtendedTerminalsList() {

    const { requestData } = useTerminalsRequestData();

    const { data, isFetching, isLoading, refetch } = useSearchTerminalsExtendedQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        extendedTerminalsList: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
    };

}
