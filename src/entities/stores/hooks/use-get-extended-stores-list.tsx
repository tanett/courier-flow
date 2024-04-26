import { useExtendedSearchStoreQuery } from '../api/api';
import { useStoresRequestData } from './use-stores-request-data';


export function useGetExtendedStoresList() {

    const { requestData } = useStoresRequestData();

    const {
        data,
        isFetching,
        isLoading,
        refetch
    } = useExtendedSearchStoreQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        extendedStoresList: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
    };

}
