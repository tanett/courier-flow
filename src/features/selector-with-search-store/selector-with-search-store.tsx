import React, { useEffect, useState } from 'react';
import { typeSelectorStores } from './types';
import { Loader, Select } from '@mantine/core';
import { t } from '@lingui/macro';
import { IconChevronDown } from '@tabler/icons-react';
import { typeUsersFilterForm } from 'features/user-list-filter/types/types';
import { useLazySearchStoreQuery } from '../../entities/stores/api/api';
import { useDebouncedState } from '@mantine/hooks';
import { sortDirection, typeResponseError, typeSearchRequest } from 'app/api/types';
import { typeSearchFilterStore } from '../../entities/stores/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import { useAppDispatchT } from 'app/state';

export const SelectorWithSearchStore: React.FC<typeSelectorStores<typeUsersFilterForm>> = ({
    form,
    fieldName,
    required,
    initialValue,

}) => {

    const dispatch = useAppDispatchT();

    const [ searchStoreValue, onSearchStoreChange ] = useDebouncedState('', 200, { leading: true });

    const [ storesList, setStoresList ] = useState<{value: string, label: string}[]>([]);

    const [ getStores, { isLoading } ] = useLazySearchStoreQuery();

    const getData = async (requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'>) => {

        try {

            const response = await getStores(requestData).unwrap();
            setStoresList(response.content.map(store => ({ value: store.id, label: store.name })));

        } catch (err) {

            errorHandler(err as typeResponseError, 'getStoresInSelect', dispatch);

        }

    };

    useEffect(() => {

        if (initialValue){

            const requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'> = {
                filter: {
                    archived: false,
                    ids: [ initialValue ],
                },
                pagination: {
                    pageNumber: 0,
                    pageSize: 30,
                },
                sorts: [
                    {
                        sort: 'NAME',
                        direction: sortDirection.asc,
                    }
                ],
            };

            getData(requestData).then();

        }

    }, [ initialValue ]);

    useEffect(() => {

        if (searchStoreValue.trim().length) {

            const requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'> = {
                filter: {
                    archived: false,
                    nameContains: searchStoreValue,
                },
                pagination: {
                    pageNumber: 0,
                    pageSize: 30,
                },
                sorts: [
                    {
                        sort: 'NAME',
                        direction: sortDirection.asc,
                    }
                ],
            };

            getData(requestData).then();

        }

    }, [ searchStoreValue ]);

    return (
        <Select
            withAsterisk={ required }
            clearable
            searchable
            limit={ 40 }
            label={ t`Stores` }
            placeholder={ t`Type store name and select` }
            data={ storesList }
            searchValue={ searchStoreValue }
            onSearchChange={(query) => onSearchStoreChange(query) }
            nothingFound={ t`Store not found` }
            { ...form.getInputProps(fieldName) }
            maxLength={ 20 }

            // itemComponent={ SelectItem }
            rightSection={ isLoading ? <Loader size={ 16 }/> : <IconChevronDown size="1rem"/> }
            sx={ { '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' } } }
        />
    );

};
