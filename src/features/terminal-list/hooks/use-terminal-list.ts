import { useLazySearchTerminalsExtendedQuery } from '../../../entities/terminals/api/api';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { useLocation } from 'react-router-dom';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { useEffect, useState } from 'react';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { DEFAULT_ITEMS_PER_PAGE_IN_TABLE } from 'app/config/api-constants';
import { typeTerminalExtended } from '../../../entities/terminals/model/types';
import { typeSearchTerminalsFilter } from '../../../entities/terminals/api/types';

export const useTerminalList = () => {

    const location = useLocation();

    const urlParams = useUrlParams();

    const [ terminalsList, setTerminalsList ] = useState<typeTerminalExtended[]>();

    const [ pagination, setPagination ] = useState<typeTablePagination | undefined>(undefined);

    const [ getTerminalsList, { isFetching } ] = useLazySearchTerminalsExtendedQuery();

    const filters: typeSearchTerminalsFilter = { archived: false };

    if (urlParams.searchPhrase) filters.searchText = urlParams.searchPhrase;

    const model = urlParams.getFilterValue('model');
    if (model && typeof model === 'string') filters.models = [ model ];

    const serialNumber = urlParams.getFilterValue('serialNumber');
    if (serialNumber && typeof serialNumber === 'string') filters.serialNumbers = [ serialNumber ];

    const fiscalCardId = urlParams.getFilterValue('fiscalCardId');
    if (fiscalCardId && typeof fiscalCardId === 'string') filters.fiscalCardIds = [ fiscalCardId ];

    const blocked = urlParams.getFilterValue('blocked');
    if (blocked && typeof blocked === 'string') filters.blocked = blocked === 'true';

    const requestData: typeSearchRequest<typeSearchTerminalsFilter, 'CREATED_AT'> = {
        filter: filters,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 1 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE_IN_TABLE,
        },
        sorts: [
            {
                sort: 'CREATED_AT',
                direction: sortDirection.asc,
            }
        ],
    };

    const getData = async () => {

        try {

            const response = await getTerminalsList(requestData).unwrap();

            setTerminalsList(response.content);

            setPagination(response.totalPages
                ? {
                    pageNumber: response.pageNumber,
                    totalPages: response.totalPages,
                    totalElements: response.totalElements,
                    pageSize: response.pageSize,
                }
                : undefined);

        } catch (err) {

            console.log('terminalsListResponse 58', err);

        }

    };


    useEffect(() => {

        if (location) {

            getData().then();

        }

    }, [ location.search ]);


    return {
        terminalsList,
        isFetching,
        pagination,
    };

};
