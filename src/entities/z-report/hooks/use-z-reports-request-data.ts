import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { perPageVariants } from '../../../app/config/api-constants';
import {typeSearchFilterZResponse, typeSearchZResponseSortingNames} from "../model/types";

export const useZReportsRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchFilterZResponse = {};

    if (urlParams.searchPhrase) filter.terminalSerialNumbers = [urlParams.searchPhrase]

    const requestData: typeSearchRequest<typeSearchFilterZResponse, typeSearchZResponseSortingNames> = {
        filter: filter,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 0 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? perPageVariants.default,
        },
        sorts: [
            {
                sort: 'CLOSED_AT',
                direction: sortDirection.asc,
            }
        ],
    };

    return {
        requestData,
        filter,
    };

};
