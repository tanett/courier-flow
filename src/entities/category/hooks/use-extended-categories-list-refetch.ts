import { useLazySearchCategoryExtendedQuery } from '../api/api';
import { useCategoriesRequestData } from './use-categories-request-data';

export const useExtendedCategoriesListRefetch = () => {

    const { requestData } = useCategoriesRequestData();

    const [ refetch ] = useLazySearchCategoryExtendedQuery();

    const categoriesListRefetch = () => refetch(requestData);

    return { categoriesListRefetch: categoriesListRefetch };

};
