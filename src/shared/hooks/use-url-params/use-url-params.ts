import { useSearchParams } from 'react-router-dom';
import { typeUseUrlParams } from './types';
import { availableItemsPerPage, DEFAULT_ITEMS_PER_PAGE_IN_TABLE, filterFieldNameSeparator, filterSeparator, filterValuesSeparator, queryParamsNames, typeSearchParamsObj } from '../../../app/config/api-constants';

export const useUrlParams = () => {

    const [ searchParams, setSearchParams ] = useSearchParams();

    const params: {[key: string]: string} = {};

    searchParams.forEach((value, key) => params[ key ] = value);

    // Quick access to parameters
    const pageNumber = Number(params[ queryParamsNames.pageNumber ]);
    const itemsPerPage = Number(params[ queryParamsNames.itemsPerPage ]);
    let searchPhrase = params[ queryParamsNames.searchPhrase ];
    let filtersString = params[ queryParamsNames.filtersString ];

    // Decoding uri
    if (searchPhrase) searchPhrase = decodeURI(searchPhrase);
    if (filtersString) filtersString = decodeURI(filtersString);

    const setNewSearchParams = (paramsObj: typeSearchParamsObj) => {

        let newSearchParams: typeSearchParamsObj = {};

        // Current params
        if (pageNumber) newSearchParams = { ...newSearchParams, ...{ [ queryParamsNames.pageNumber ]: pageNumber.toString() } };
        if (itemsPerPage) newSearchParams = { ...newSearchParams, ...{ [ queryParamsNames.itemsPerPage ]: itemsPerPage.toString() } };
        if (searchPhrase) newSearchParams = { ...newSearchParams, ...{ [ queryParamsNames.searchPhrase ]: searchPhrase } };
        if (filtersString) newSearchParams = { ...newSearchParams, ...{ [ queryParamsNames.filtersString ]: filtersString } };

        // New params with current params
        for (const key of Object.keys(paramsObj)) {

            switch (key) {

            case queryParamsNames.pageNumber :
                if (paramsObj[ key ] && Number(paramsObj[ key ]) > 1) newSearchParams[ key ] = paramsObj[ key ];
                else delete newSearchParams[ key ];
                break;

            case queryParamsNames.itemsPerPage :
                if (paramsObj[ key ] && Number(paramsObj[ key ]) !== DEFAULT_ITEMS_PER_PAGE_IN_TABLE && !(Number(paramsObj[ key ]) in availableItemsPerPage)) newSearchParams[ key ] = paramsObj[ key ];
                else delete newSearchParams[ key ];
                break;

            case queryParamsNames.searchPhrase :
                if (paramsObj[ key ]) {

                    const value = paramsObj[ key ];
                    newSearchParams[ key ] = typeof value === 'string' ? encodeURI(value) : value;

                } else delete newSearchParams[ key ];
                break;

            case queryParamsNames.filtersString :
                if (paramsObj[ key ]) newSearchParams[ key ] = paramsObj[ key ];
                else delete newSearchParams[ key ];
                break;

            default :
                break;

            }

        }

        setSearchParams({ ...newSearchParams });

    };


    const filtersToUri = (obj: Record<string, unknown>) => {

        const uriFilterArr = [];

        for (const key of Object.keys(obj)) {

            const filterName = key;
            const filterValue = obj[ key ];

            if (typeof filterValue === 'string') {

                uriFilterArr.push(`${filterName}${filterFieldNameSeparator}${encodeURI(filterValue)}`);

            }

        }

        return uriFilterArr.length ? uriFilterArr.join(filterSeparator) : undefined;

    };

    const filterUriToObj = (): null | Record<string, string | string[]>[] => {

        if (filtersString) {

            return filtersString.split(filterSeparator).map(item => {

                const filterNameDividerIndex = item.indexOf(filterFieldNameSeparator);
                const key = item.substring(0, filterNameDividerIndex);
                const value = item.substring(filterNameDividerIndex + 1);
                const multiValue = value.split(filterValuesSeparator);
                return { [ key ]: multiValue.length > 1 ? multiValue : value };

            });

        } else return null;

    };

    const filters = filterUriToObj();

    const getFilterValue = (key: string) => {

        if (!filters) return undefined;

        const filterObj = filters.find(item => key in item);

        if (filterObj) {

            return filterObj[ key ];

        } else return undefined;

    };

    const result: typeUseUrlParams = {
        pageNumber: isNaN(pageNumber) ? null : pageNumber,
        itemsPerPage: (isNaN(itemsPerPage) || itemsPerPage === 0) ? null : itemsPerPage,
        searchPhrase: searchPhrase && searchPhrase.length > 0 ? searchPhrase : null,
        filtersString: filtersString ? filtersString : null,
        filters: filters ? filters : null,
        getFilterValue: getFilterValue,
        setSearchParams: setNewSearchParams,
        filtersToUri: filtersToUri,
    };

    return result;

};
