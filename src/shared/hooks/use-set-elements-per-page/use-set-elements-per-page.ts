import { useSearchParams } from 'react-router-dom';
import { DEFAULT_ITEMS_PER_PAGE_IN_TABLE, queryParamsNames } from '../../../app/config/api-constants';
import { isAvailablePerPageParam } from '../../utils/is-available-per-page-param';

export const useSetElementsPerPage = () => {

    const [ searchParams, setSearchParams ] = useSearchParams();

    return (perPage: string) => {

        const newPerPage = Number(perPage) || 0;

        if (isAvailablePerPageParam(newPerPage) && newPerPage !== DEFAULT_ITEMS_PER_PAGE_IN_TABLE) {

            searchParams.delete(queryParamsNames.pageNumber);
            setSearchParams(prev => ({ ...prev, [ queryParamsNames.itemsPerPage ]: perPage }));

        } else {

            searchParams.delete(queryParamsNames.itemsPerPage);
            searchParams.delete(queryParamsNames.pageNumber);
            setSearchParams(searchParams);

        }

    };

};
