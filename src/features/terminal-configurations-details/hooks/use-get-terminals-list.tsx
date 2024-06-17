import { sortDirection, typeSearchRequest } from 'app/api/types';
import { pageSizeForSelectors } from 'features/terminal-configurations-details/ui/list-stores&terminals/constants';
import { typeSearchTerminalsFilter } from '../../../entities/terminals/api/types';
import { useSearchTerminalListQuery } from '../../../entities/terminals/api/api';
import { useEffect, useState } from 'react';
import { typeTerminal } from '../../../entities/terminals/model/types';
import { typeTablePagination } from 'shared/ui/table/types/type';


export const useGetTerminalsList = (terminalsIds: string[], pageNumber: number) => {

    const requestData: typeSearchRequest<typeSearchTerminalsFilter, 'CREATED_AT'> = {
        filter: {
            ids: terminalsIds,
            archived: false
        },
        pagination: {
            pageNumber: pageNumber,
            pageSize: pageSizeForSelectors,
        },
        sorts: [
            {
                sort: 'CREATED_AT',
                direction: sortDirection.asc,
            }
        ],
    };

    const {
        data: terminalsResponse,
        isFetching
    } = useSearchTerminalListQuery(requestData);

    const [ terminalsList, setTerminalsList ] = useState<typeTerminal[] | null>(null);
    const [ currentPagination, setCurrentPagination ] = useState<typeTablePagination | undefined>(undefined);

    useEffect(() => {
        if (terminalsResponse) {
            setTerminalsList(terminalsList ? [ ...terminalsList, ...terminalsResponse.content ] : terminalsResponse.content);

            const pagination = terminalsResponse.totalPages
                ? {
                    pageNumber: terminalsResponse.pageNumber,
                    totalPages: terminalsResponse.totalPages,
                    totalElements: terminalsResponse.totalElements,
                    pageSize: terminalsResponse.pageSize,
                }
                : undefined;

            setCurrentPagination(pagination);
        }

    }, [ terminalsResponse ]);


    return {
        terminalsList,
        currentPagination,
        isFetching,
    };
};
