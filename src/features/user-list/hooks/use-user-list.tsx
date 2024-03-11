import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { typeUser } from '../../../entities/user-profile/model/state-slice';
import { sortDirection, typeSearchRequest } from 'app/api/types';
import { accessScope, DEFAULT_ITEMS_PER_PAGE_IN_TABLE } from 'app/config/api-constants';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { useLazySearchUserQuery } from '../../../entities/users/api/api';
import { typeSearchFilter } from '../../../entities/users/api/types';

export function useUserList() {

    const location = useLocation();
    const urlParams = useUrlParams();

    const [ getUserList, { isFetching } ] = useLazySearchUserQuery();
    const [ refetch, setRefetch ] = useState(true);
    const [ userList, setUserList ] = useState<typeUser[]>();
    const [ pagination, setPagination ] = useState<typeTablePagination | undefined>(undefined);

    const filters: typeSearchFilter = {
        archived: false,
        accessScopes: [ accessScope.merchant ],
    };

    if (urlParams.searchPhrase) filters.searchText = urlParams.searchPhrase;

    const roleId = urlParams.getFilterValue('roleId');
    if (roleId && typeof roleId === 'string') filters.roleIds = [ roleId ];

    const requestData: typeSearchRequest<typeSearchFilter, 'FULL_NAME'> = {
        filter: filters,
        pagination: {
            pageNumber: urlParams.pageNumber && urlParams.pageNumber > 1 ? urlParams.pageNumber - 1 : 0,
            pageSize: urlParams.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE_IN_TABLE,
        },
        sorts: [
            {
                sort: 'FULL_NAME',
                direction: sortDirection.asc,
            }
        ],
    };

    const getData = async () => {

        try {

            const userListResponse = await getUserList(requestData).unwrap();
            setUserList(userListResponse.content);
            setPagination(userListResponse.totalPages
                ? {
                    pageNumber: userListResponse.pageNumber,
                    totalPages: userListResponse.totalPages,
                    totalElements: userListResponse.totalElements,
                    pageSize: userListResponse.pageSize,
                }
                : undefined);

        } catch (err) {

            console.log('userListResponse 58', err);

        }

    };


    useEffect(() => {

        if (location) {

            getData().then();

        }

    }, [ location ]);

    useEffect(() => {

        if (location && refetch) {

            getData().then();
            setRefetch(false);

        }

    }, [ refetch ]);

    return { userList, isLoading: isFetching, pagination, setRefetch };

}
