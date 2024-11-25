import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { typeSearchDevicesFilter, typeSearchDevicesSortingNames } from '../api/types';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { perPageVariants } from '../../../app/config/api-constants';

export const useDevicesRequestData = () => {

    const urlParams = useUrlParams();


    // Filters
    const filter: typeSearchDevicesFilter = { archived: false };

    if (urlParams.searchPhrase) filter.searchText = urlParams.searchPhrase;

    const deviceModel = urlParams.getFilterValue('model') as string;
    if (deviceModel) filter.models = [ deviceModel ];

    const merchantId = urlParams.getFilterValue('merchantId');
    if (merchantId && typeof merchantId === 'string') filter.merchantIds = [ merchantId ];


    const requestData: typeSearchRequest<typeSearchDevicesFilter, typeSearchDevicesSortingNames> = {
        filter: filter,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 0 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? perPageVariants.default,
        },
        sorts: [
            {
                sort: 'CREATED_AT',
                direction: sortDirection.asc,
            }
        ],
    };

    return {
        requestData,
        filter,
    };

};
