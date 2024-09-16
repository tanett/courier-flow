import { useUsersRequestData } from './use-users-request-data';
import { useExtendedSearchUserQuery } from '../api/api';

export function useExtendedUsersList() {

  const {requestData} = useUsersRequestData()

    const { data, isFetching, isLoading, refetch } = useExtendedSearchUserQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        extendedUsersList: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
    };


}
