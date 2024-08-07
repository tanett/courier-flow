import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { perPageVariants } from '../../../app/config/api-constants';
import { typeSearchFilterEncashment, typeSearchEncashmentSortingNames } from '../model/types';

export const useEncashmentRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchFilterEncashment = {};

    if (urlParams.searchPhrase) filter.searchText = urlParams.searchPhrase;

    const storeId = urlParams.getFilterValue('storeId');
    if (storeId && typeof storeId === 'string') filter.storeIds = [ storeId ];

    const employee = urlParams.getFilterValue('employeeId');
    if (employee && typeof employee === 'string') filter.createdBy = [ employee ];

    const encashedAtFrom = urlParams.getFilterValue('encashedAtFrom');
    const encashedAtTo = urlParams.getFilterValue('encashedAtTo');
    if (encashedAtTo && typeof encashedAtTo === 'string' && encashedAtFrom && typeof encashedAtFrom === 'string') {

        filter.encashedAtFrom = encashedAtFrom;
        filter.encashedAtTo = encashedAtTo;

    }

    const requestData: typeSearchRequest<typeSearchFilterEncashment, typeSearchEncashmentSortingNames> = {
        filter: filter,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 0 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? perPageVariants.default,
        },
        sorts: [
            {
                sort: 'ENCASHED_AT',
                direction: sortDirection.dec,
            }
        ],
    };

    return {
        requestData,
        filter,
    };

};
