import { typeUseUrlParams } from 'shared/hooks/use-url-params/types';
import { typeSearchFilterOrders } from '../api/types';
import { OrderStatuses } from '../model/orders-statuses';

export const getOrdersFiltersFromUrl = (urlParams: typeUseUrlParams) => {

    const tempFilter: typeSearchFilterOrders = { };

    if (urlParams.searchPhrase) tempFilter.searchText = urlParams.searchPhrase;

    const storeId = urlParams.getFilterValue('storeId');
    if (storeId && typeof storeId === 'string') tempFilter.storeIds = [ storeId ];
    const status = urlParams.getFilterValue('status');
    if (status && typeof status === 'string') tempFilter.statuses = [status as OrderStatuses];
    const collectorId = urlParams.getFilterValue('collectorId');
    if (collectorId && typeof collectorId === 'string') tempFilter.collectorIds = [ collectorId ];
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
