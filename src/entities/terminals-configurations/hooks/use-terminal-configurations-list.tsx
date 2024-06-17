import { useSearchTerminalConfigurationsQuery } from '../api/api';
import { useTerminalConfigurationsRequestData } from './use-terminal-configurations-request-data';

export function useTerminalConfigurationsList() {

  const {requestData} = useTerminalConfigurationsRequestData()

    const { data, isFetching, isLoading, refetch } = useSearchTerminalConfigurationsQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        list: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
    };


}
