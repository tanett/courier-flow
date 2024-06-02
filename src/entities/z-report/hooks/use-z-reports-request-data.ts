import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { perPageVariants } from '../../../app/config/api-constants';
import useGetZReportsDataByIdFromUrl from "./use-get-z-reports-data-by-id-from-url";
import {typeSearchFilterZResponse, typeSearchZResponseSortingNames} from "../model/types";

export const useZReportsRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter = {}; // TODO


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
