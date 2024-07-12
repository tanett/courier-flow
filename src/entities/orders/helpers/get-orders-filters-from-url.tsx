import { typeUseUrlParams } from 'shared/hooks/use-url-params/types';
import { typeSearchFilterOrders } from '../api/types';

export const getOrdersFiltersFromUrl = (urlParams: typeUseUrlParams) => {

    const tempFilter: typeSearchFilterOrders = { };

    if (urlParams.searchPhrase) tempFilter.searchText = urlParams.searchPhrase;

    const storeId = urlParams.getFilterValue('storeId');
    if (storeId && typeof storeId === 'string') tempFilter.storeIds = [ storeId ];
    const code = urlParams.getFilterValue('code');
    if (code && typeof code === 'string') tempFilter.codes = [ code ];
    const assigneeId = urlParams.getFilterValue('assigneeId');
    if (assigneeId && typeof assigneeId === 'string') tempFilter.assigneeIds = [ assigneeId ];
    const courierId = urlParams.getFilterValue('courierId');
    if (courierId && typeof courierId === 'string') tempFilter.courierIds = [ courierId ];
    const createdById = urlParams.getFilterValue('createdById');
    if (createdById && typeof createdById === 'string') tempFilter.createdByIds = [ createdById ];

    const orderedAtFrom = urlParams.getFilterValue('orderedAtFrom');
    const orderedAtTo = urlParams.getFilterValue('orderedAtTo');
    if (orderedAtTo && typeof orderedAtTo === 'string' && orderedAtFrom && typeof orderedAtFrom === 'string') {

        tempFilter.orderedAtFrom = orderedAtFrom;
        tempFilter.orderedAtTo = orderedAtTo;

    }

    const hasDeclinedProducts = urlParams.getFilterValue('hasDeclinedProducts');
    if (hasDeclinedProducts && typeof hasDeclinedProducts === 'string') tempFilter.hasDeclinedProducts = hasDeclinedProducts === 'true';

    return tempFilter;

};
