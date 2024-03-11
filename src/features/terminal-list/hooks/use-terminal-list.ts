import { useSearchTerminalsExtendedQuery } from '../../../entities/terminals/api/api';
import { typeSearchRequest } from '../../../app/api/types';
import { typeSearchTerminalsFilter, typeSearchTerminalSortingNames } from '../../../entities/terminals/api/types';

export const useTerminalList = (requestData: typeSearchRequest<typeSearchTerminalsFilter, typeSearchTerminalSortingNames>) => {

    const { data: terminalListResponse, isFetching } = useSearchTerminalsExtendedQuery(requestData);

    // const [ pagination, setPagination ] = useState<typeTablePagination | undefined>(undefined);

    const pagination = terminalListResponse?.totalPages
        ? {
            pageNumber: terminalListResponse.pageNumber,
            totalPages: terminalListResponse.totalPages,
            totalElements: terminalListResponse.totalElements,
            pageSize: terminalListResponse.pageSize,
        }
        : undefined;

    return {
        terminalList: terminalListResponse?.content || null,
        isLoading: isFetching,
        pagination: pagination,
    };

};
