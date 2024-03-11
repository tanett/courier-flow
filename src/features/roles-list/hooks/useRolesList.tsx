import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sortDirection, typeSearchRequest } from 'app/api/types';
import { accessScope, DEFAULT_ITEMS_PER_PAGE_IN_TABLE } from 'app/config/api-constants';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { typeSearchRolesFilter } from '../../../entities/role/api/types';
import { typeRolesExtended } from '../../../entities/role/model/types';
import { useLazySearchRolesExtendedQuery } from '../../../entities/role/api/api';

export function useRolesList() {

    const location = useLocation();
    const urlParams = useUrlParams();

    const [ getRolesList, { isFetching } ] = useLazySearchRolesExtendedQuery();
    const [ rolesList, setRolesList ] = useState<typeRolesExtended[]>();
    const [ pagination, setPagination ] = useState<typeTablePagination | undefined>(undefined);

    const filters: typeSearchRolesFilter = { accessScopes: [ accessScope.merchant ] };

    if (urlParams.searchPhrase) filters.searchText = urlParams.searchPhrase;

    const requestData: typeSearchRequest<typeSearchRolesFilter, 'NAME'> = {
        filter: filters,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 1 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE_IN_TABLE,
        },
        sorts: [
            {
                sort: 'NAME',
                direction: sortDirection.asc,
            }
        ],
    };

    const getData = async () => {

        try {

            const rolesListResponse = await getRolesList(requestData).unwrap();
            setRolesList(rolesListResponse.content);
            setPagination(rolesListResponse.totalPages
                ? {
                    pageNumber: rolesListResponse.pageNumber,
                    totalPages: rolesListResponse.totalPages,
                    totalElements: rolesListResponse.totalElements,
                    pageSize: rolesListResponse.pageSize,
                }
                : undefined);

        } catch (err) {

            console.log('rolesExtendedListResponse', err);

        }

    };


    useEffect(() => {

        if (location) {

            getData().then();

        }

    }, [ location ]);

    return { rolesList, isLoading: isFetching, pagination };

}
