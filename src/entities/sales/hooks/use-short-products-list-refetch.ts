import { useSalesRequestData } from './use-sales-request-data';
import { useLazySearchSalesShortQuery } from '../api/api';

export const useShortProductsListRefetch = () => {

    const { requestData } = useSalesRequestData();

    const [ refetch ] = useLazySearchSalesShortQuery();

    const salesListRefetch = () => refetch(requestData);

    return { salesListRefetch: salesListRefetch };

};
