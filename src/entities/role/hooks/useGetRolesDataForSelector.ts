import { useLazySearchRolesQuery } from 'entities/role/api/api';
import { useEffect, useState } from 'react';
import type { SelectItem } from '@mantine/core';
import { accessScope } from 'app/config/api-constants';
import { sortDirection } from 'app/api/types';


const useGetRolesDataForSelector = () => {

    const [ getRoles, { isLoading: isRolesLoading } ] = useLazySearchRolesQuery();

    const [ rolesList, setRolesList ] = useState<SelectItem[]>([]);

    const getData = async () => {

        try {

            const response = await getRoles({
                filter: {
                    accessScopes: [ accessScope.admin ],
                    clientRole: false,
                },
                pagination: {
                    pageNumber: 0,
                    pageSize: 100,
                },
                sorts: [
                    {
                        sort: 'NAME',
                        direction: sortDirection.asc,
                    }
                ],
            }).unwrap();

            if (response.content) {

                setRolesList(response.content.map(role => ({
                    label: role.name,
                    value: role.id,
                })));

            }

        } catch (err) {

            console.log('userRolesList', err);

        }


    };

    useEffect(() => {

        getData().then();

    }, []);


    return {
        roles: rolesList,
        isRolesFetching: isRolesLoading,
    };

};

export default useGetRolesDataForSelector;
