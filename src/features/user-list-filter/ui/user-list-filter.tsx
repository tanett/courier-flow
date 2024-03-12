import { typeRoleItemSelect, typeUsersFilterForm } from '../types/types';
import React, { useContext, useEffect, useState } from 'react';
import { userFilterForm } from '../forms/forms';
import { useForm } from '@mantine/form';
import { Loader, Select } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { DrawerContext, FilterButtonsBar, FilterFormWrapper } from '../../../shared/ui/filter-panel';
import { useLazySearchRolesQuery } from '../../../entities/role/api/api';
import { sortDirection, typeSearchRequest } from '../../../app/api/types';
import { typeSearchRolesFilter } from '../../../entities/role/api/types';
import { FilterSkeleton } from './filter-skeleton';
import { accessScope, queryParamsNames } from '../../../app/config/api-constants';
import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { useSelectorT } from 'app/state';
import { SelectorWithSearchStore } from 'features/selector-with-search-store';
import { IconChevronDown } from '@tabler/icons-react';

export const UserListFilter: React.FC = () => {

    const { i18n } = useLingui();

    const close: undefined | (() => void) = useContext(DrawerContext);

    const form = useForm<typeUsersFilterForm>(userFilterForm);

    const urlParams = useUrlParams();

    useEffect(() => {

        const role = urlParams.getFilterValue('roleId');
        const store = urlParams.getFilterValue('storeId');

        if (role && typeof role === 'string') form.setValues({ roleId: role });
        if (store && typeof store === 'string') form.setValues({ storeId: store });


    }, []);


    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const [ getRoles, { isLoading } ] = useLazySearchRolesQuery();

    const [ roleList, setRoleList ] = useState<typeRoleItemSelect[]>([]);


    const getRolesData = async (requestData: typeSearchRequest<typeSearchRolesFilter, 'NAME'>) => {

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

        if (currentUser) {

            const requestRolesData: typeSearchRequest<typeSearchRolesFilter, 'NAME'> = {
                filter: {
                    archived: false,
                    accessScopes: [ accessScope.merchant, accessScope.store ],

                    // merchantIds: [currentUser.actor.merchantId],
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
            getRolesData(requestRolesData).then();

        }

    }, [ currentUser ]);

    const setFilterHandler = () => {

        const filterObj: Record<string, unknown> = { roleId: form.values.roleId, storeId: form.values.storeId };

        urlParams.setSearchParams({
            [ queryParamsNames.filtersString ]: urlParams.filtersToUri(filterObj),
            [ queryParamsNames.pageNumber ]: undefined,
        });

        if (close) close();

    };

    const onReset = () => {

        urlParams.setSearchParams({
            [ queryParamsNames.filtersString ]: urlParams.filtersToUri({}),
            [ queryParamsNames.pageNumber ]: undefined,
        });
        form.reset();

    };

    return (
        <FilterFormWrapper>
            {(!urlParams)
                ? <FilterSkeleton/>
                : <form onSubmit={form.onSubmit(setFilterHandler)} onReset={form.onReset}>
                    <Select
                        clearable
                        label={i18n._(t`Role`)}
                        data={roleList}
                        {...form.getInputProps('roleId')}
                        rightSection={ isLoading ? <Loader size={ 16 }/> : <IconChevronDown size="1rem"/> }
                        sx={ { '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' } } }
                    />
                    <SelectorWithSearchStore
                        required={ false }
                        fieldName={ 'storeId' }
                        initialValue={form.values.storeId !== null ? form.values.storeId : null}
                        form={ form }/>
                    <FilterButtonsBar onReset={onReset}/>
                </form>
            }
        </FilterFormWrapper>
    );

};
