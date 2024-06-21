import { useAdvancesRequestData } from './use-advances-request-data';
import { useSearchAdvancesShortQuery } from '../api/api';


export function useShortAdvancesList() {

    const { requestData } = useAdvancesRequestData();

    const { data, isFetching, isLoading, refetch } = useSearchAdvancesShortQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        shortAdvancesList: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
    };

}
