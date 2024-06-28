import React, { useEffect, useState } from 'react';
import { typeSelectorStores } from './types';
import { Loader, Select } from '@mantine/core';
import { t } from '@lingui/macro';
import { IconChevronDown } from '@tabler/icons-react';
import { useLazySearchStoreQuery } from '../../entities/stores/api/api';
import { useDebouncedValue } from '@mantine/hooks';
import { sortDirection, typeResponseError, typeSearchRequest } from 'app/api/types';
import { typeSearchFilterStore } from '../../entities/stores/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import { useAppDispatchT } from 'app/state';


export const SelectorWithSearchStore: React.FC<typeSelectorStores> = ({
    form,
    fieldName,
    required,
    initialValue,
    disabled,

}) => {

    const dispatch = useAppDispatchT();

    const [ searchStoreValue, onSearchStoreChange ] = useState('');
    const [ debouncedSearchValue ] = useDebouncedValue(searchStoreValue, 500);

    const [ storesList, setStoresList ] = useState<{ value: string, label: string }[]>([]);
    const [ firstRequest, setFirstRequest ] = useState<{ value: string, label: string }[]>([]);

    const [ getStores, { isLoading } ] = useLazySearchStoreQuery();

    const getData = async (requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'>, isFirst?: boolean) => {

        try {

            const response = await getStores(requestData).unwrap();
            const mapResponse = response.content.map(item => ({
                value: item.id,
                label: item.name,
            }));
            setStoresList(mapResponse);
            if (isFirst) {

                setFirstRequest(mapResponse);

            }

        } catch (err) {

            errorHandler(err as typeResponseError, 'getStoresInSelect', dispatch);

        }

    };

    useEffect(() => {

        const requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'> = {
            filter: { archived: false },
            pagination: {
                pageNumber: 0,
                pageSize: 50,
            },
            sorts: [
                {
                    sort: 'NAME',
                    direction: sortDirection.asc,
                }
            ],
        };

        getData(requestData, true).then();

    }, []);

    useEffect(() => {

        if (initialValue) {

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

        } else {

            setStoresList(firstRequest);

        }

    }, [ debouncedSearchValue ]);

    return (
        <Select
            withinPortal
            withAsterisk={ required }
            clearable
            searchable
            limit={ 40 }
            label={ t`Store` }
            placeholder={ t`Type store name and select` }
            data={ storesList }
            searchValue={ searchStoreValue }
            onSearchChange={ (query) => onSearchStoreChange(query) }
            nothingFound={ t`Store not found` }
            { ...form.getInputProps(fieldName) }
            maxLength={ 20 }
            disabled={ disabled }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            rightSection={ isLoading ? <Loader size={ 16 }/> : form.values[ fieldName ] ? undefined : <IconChevronDown size="1rem"/> }
            styles={ {
                rightSection: {
                    pointerEvents: 'none',
                    pointer: 'pointer',
                },
            } }
            sx={ { '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' } } }
        />
    );

};
