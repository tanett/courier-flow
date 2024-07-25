import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { perPageVariants } from '../../../app/config/api-constants';
import {typeSearchFilterZResponse, typeSearchZResponseSortingNames} from "../model/types";

export const useZReportsRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchFilterZResponse = {};

    if (urlParams.searchPhrase) filter.terminalSerialNumbers = [urlParams.searchPhrase]

    const fiscalId = urlParams.getFilterValue('fiscalId');
    if (fiscalId && fiscalId.length > 0 && typeof fiscalId === 'string') filter.fiscalModuleIds = [ fiscalId ]; else delete filter.fiscalModuleIds

    const terminalSN = urlParams.getFilterValue('terminalSN');
    if (terminalSN && terminalSN.length > 0 && typeof terminalSN === 'string') filter.terminalSerialNumbers = [ terminalSN ]; else delete filter.terminalSerialNumbers

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
