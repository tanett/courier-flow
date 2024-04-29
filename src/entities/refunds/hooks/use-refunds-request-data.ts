import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { typeSearchFilterRefunds, typeSearchRefundsSortingNames, } from '../api/types';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { perPageVariants } from '../../../app/config/api-constants';

export const useRefundsRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchFilterRefunds = {}; // todo


    const requestData: typeSearchRequest<typeSearchFilterRefunds, typeSearchRefundsSortingNames> = {
        filter: filter,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 0 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? perPageVariants.default,
        },
        sorts: [
            {
                sort: 'REFUNDED_AT',
                direction: sortDirection.asc,
            }
        ],
    };

    return {
        requestData,
        filter,
    };

};
