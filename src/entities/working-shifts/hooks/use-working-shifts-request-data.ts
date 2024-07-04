import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { typeSearchFilterWorkingShifts, typeSearchWorkingShiftsSortingNames, } from '../api/types';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { perPageVariants } from '../../../app/config/api-constants';
import { getWorkingShiftsFiltersFromUrl } from '../helpers/get-working-shifts-filters-from-url';

export const useWorkingShiftsRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchFilterWorkingShifts= getWorkingShiftsFiltersFromUrl(urlParams);


    const requestData: typeSearchRequest<typeSearchFilterWorkingShifts, typeSearchWorkingShiftsSortingNames> = {
        filter: filter,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 0 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? perPageVariants.default,
        },
        sorts: [
            {
                sort: 'OPENED_AT',
                direction: sortDirection.dec,
            }
        ],
    };

    return {
        requestData,
        filter,
    };

};
