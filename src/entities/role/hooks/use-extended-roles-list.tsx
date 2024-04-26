import {  useSearchRolesExtendedQuery } from '../api/api';
import { useRolesRequestData } from './use-roles-request-data';

export function useExtendedRolesList() {

  const {requestData} = useRolesRequestData()

    const { data, isFetching, isLoading, refetch } = useSearchRolesExtendedQuery(requestData);

      const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        extendedRolesList: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
    };

}
