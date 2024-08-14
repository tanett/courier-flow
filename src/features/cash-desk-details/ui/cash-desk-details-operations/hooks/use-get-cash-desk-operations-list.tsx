import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DEFAULT_ITEMS_PER_PAGE_IN_TABLE } from 'app/config/api-constants';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';

export function useGetCashDeskOperationsList() {

    const location = useLocation();

    const urlParams = useUrlParams();

    /* const { id } = useParams();

    const [ getUserList, { isFetching, error } ] = useLazySearchUserQuery();
    const [ refetch, setRefetch ] = useState(true);
    const [ operationsList, setUserList ] = useState<typeUser[]>();
    const [ pagination, setPagination ] = useState<typeTablePagination | undefined>(undefined);


    const getData = async (requestData: typeSearchRequest<typeSearchFilterUsers, 'FULL_NAME'>) => {

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

        if (location && id) {

            const filters: typeSearchFilterUsers = {
                archived: false,
                storeIds: [ id ],
            };
            const requestData: typeSearchRequest<typeSearchFilterUsers, 'FULL_NAME'> = {
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

            getData(requestData).then();
            setRefetch(false);

        }

    }, [ location ]);

    useEffect(() => {

        if (location && id && refetch) {

            const filters: typeSearchFilterUsers = {
                archived: false,
                storeIds: [ id ],
            };
            const requestData: typeSearchRequest<typeSearchFilterUsers, 'FULL_NAME'> = {
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

            getData(requestData).then();
            setRefetch(false);

        }

    }, [ refetch ]);*/

    return {
        operationsList: [],
        isLoading: false,
        error: false,
        pagination: null,
        setRefetch: console.log,
    };

}
