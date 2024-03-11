import { useSearchParams } from 'react-router-dom';
import { queryParamsNames } from '../../../app/config/api-constants';

export const useSetPageNumber = () => {

    const [ searchParams, setSearchParams ] = useSearchParams();

    return (pageNumber: number) => {

        if (pageNumber <= 1) {

            searchParams.delete(queryParamsNames.pageNumber);
            setSearchParams(searchParams);

        } else {

            setSearchParams(prev => ({ ...prev, [ queryParamsNames.pageNumber ]: pageNumber.toString() }));

        }

    };

};
