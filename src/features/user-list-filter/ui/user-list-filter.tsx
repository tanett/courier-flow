import { typeFilterForm, typeRoleItemSelect } from '../types/types';
import React, { useContext, useEffect, useState } from 'react';
import { userFilterForm } from '../forms/forms';
import { useForm } from '@mantine/form';
import { Select } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { FilterButtonsBar, FilterFormWrapper, DrawerContext } from '../../../shared/ui/filter-panel';
import { useLazySearchRolesQuery } from '../../../entities/role/api/api';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { typeSearchRolesFilter } from '../../../entities/role/api/types';
import { FilterSkeleton } from './filter-skeleton';
import { accessScope, queryParamsNames } from '../../../app/config/api-constants';
import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
export const UserListFilter: React.FC = () => {

    const { i18n } = useLingui();

    const close: undefined | (() => void) = useContext(DrawerContext);

    const form = useForm<typeFilterForm>(userFilterForm);

    const urlParams = useUrlParams();

    const [ getRoles, { isLoading } ] = useLazySearchRolesQuery();

    const [ roleList, setRoleList ] = useState<typeRoleItemSelect[]>([]);

    const requestData: typeSearchRequest<typeSearchRolesFilter, 'NAME'> = {
        filter: {
            archived: false,
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
    };

    const getData = async () => {

        try {

            const rolesListResponse = await getRoles(requestData).unwrap();
            const roleList: typeRoleItemSelect[] = rolesListResponse.content.map(item => ({ value: item.id, label: item.name }));
            setRoleList(roleList);
            const roleId = urlParams.getFilterValue('roleId');
            if (roleId && typeof roleId === 'string') form.setValues({ roleId: roleId });

        } catch (err) {

            console.log('user-list-form 55', err);

        }

    };

    useEffect(() => {

        getData().then();

    }, []);

    const setFilterHandler = () => {

        const filterObj: Record<string, unknown> = { roleId: form.values.roleId };

        urlParams.setSearchParams({
            [ queryParamsNames.filtersString ]: urlParams.filtersToUri(filterObj),
            [ queryParamsNames.pageNumber ]: undefined,
        });

        if (close) close();

    };

    const onReset = () => {

        form.reset();

    };

    return (
        <FilterFormWrapper>
            {isLoading
                ? <FilterSkeleton/>
                : <form onSubmit={form.onSubmit(setFilterHandler)} onReset={form.onReset}>
                    <Select
                        clearable
                        label={i18n._(t`Role`)}
                        data={roleList}
                        {...form.getInputProps('roleId')}
                    />
                    <FilterButtonsBar onReset={onReset}/>
                </form>
            }
        </FilterFormWrapper>
    );

};
