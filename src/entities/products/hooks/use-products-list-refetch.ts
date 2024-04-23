import { useProductsRequestData } from './use-products-request-data';
import { useLazySearchProductExtendedQuery } from '../api/api';

export const useProductsListRefetch = () => {

    const { requestData } = useProductsRequestData();

    const [ refetch ] = useLazySearchProductExtendedQuery();

    const productsListRefetch = () => refetch(requestData);

    return { productsListRefetch: productsListRefetch };

};
