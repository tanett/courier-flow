import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { typeSearchFilterTerminalConfigurations, typeSearchTerminalConfigurationsSortingNames, } from '../api/types';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { perPageVariants } from '../../../app/config/api-constants';
import { getTerminalConfigurationsFiltersFromUrl } from '../helpers/get-terminal-configurations-filters-from-url';

export const useTerminalConfigurationsRequestData = () => {

    const urlParams = useUrlParams();

    // Filters
    const filter: typeSearchFilterTerminalConfigurations = getTerminalConfigurationsFiltersFromUrl(urlParams);


    const requestData: typeSearchRequest<typeSearchFilterTerminalConfigurations, typeSearchTerminalConfigurationsSortingNames> = {
        filter: filter,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 0 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? perPageVariants.default,
        },
        sorts: [
            {
                sort: 'NAME',
                direction: sortDirection.asc,
            }
        ],
    };

    return {
        requestData,
        filter,
    };

};
