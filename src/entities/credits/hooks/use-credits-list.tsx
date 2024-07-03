import { useCreditsRequestData } from './use-credits-request-data';
import { useSearchCreditsExtendedQuery } from '../api/api';


export function useCreditsList() {

    const { requestData } = useCreditsRequestData();

    const { data, isFetching, isLoading, refetch } = useSearchCreditsExtendedQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        creditsList: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
    };

}
