import React, { forwardRef, useEffect, useState } from 'react';
import { typeMultiSelectorStores } from './types';
import { Flex, Group, Loader, MultiSelect, Text, useMantineTheme } from '@mantine/core';
import { t } from '@lingui/macro';
import { IconCheck, IconChevronDown } from '@tabler/icons-react';
import { useLazySearchStoreQuery } from '../../entities/stores/api/api';
import { useDebouncedValue } from '@mantine/hooks';
import { sortDirection, typeResponseError, typeSearchRequest } from 'app/api/types';
import { typeSearchFilterStore } from '../../entities/stores/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import { useAppDispatchT } from 'app/state';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    label: string,
    selected: boolean
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({
        label,
        selected,
        ...others
    }: ItemProps, ref) => {

        const theme = useMantineTheme();

        return (
            <div ref={ ref } { ...others }>
                <Group noWrap align={ 'center' }>
                    { selected && <Flex align={ 'center' } sx={ {
                        width: '20px',
                        height: '20px',
                        alignSelf: 'center',
                    } }>
                        <IconCheck stroke={ 1.8 } size={ 18 } color={ theme.colors.primary[ 5 ] }/>
                    </Flex>}
                    <div>
                        <Text>{ label }</Text>
                    </div>
                </Group>
            </div>
        );

    }
);

export const MultiSelectorWithSearchStore: React.FC<typeMultiSelectorStores> = ({
    form,
    fieldName,
    required,
    initialValue,

}) => {

    const dispatch = useAppDispatchT();

    const [ searchStoreValue, onSearchStoreChange ] = useState('');
    const [ debouncedSearchValue ] = useDebouncedValue(searchStoreValue, 500);

    const [ storesList, setStoresList ] = useState<{value: string, label: string}[]>([]);

    const [ getStores, { isLoading } ] = useLazySearchStoreQuery();

    const getData = async (requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'>) => {

        try {

            const response = await getStores(requestData).unwrap();

            const filterResponse = response.content.reduce((prev, curr) => {

                const existStore = storesList.find(item => item.value === curr.id);

                return existStore ? prev : [ ...prev, { value: curr.id, label: curr.name } ];

            }, storesList);

            setStoresList(filterResponse);

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

        getData(requestData).then();

    }, []);

    useEffect(() => {

        if (initialValue){

            const requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'> = {
                filter: {
                    archived: false,
                    ids: initialValue,
                },
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
                    pageSize: 50,
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

    }, [ debouncedSearchValue ]);

    return (
        <MultiSelect
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
            disableSelectedItemFiltering
            maxDropdownHeight={400}
            { ...form.getInputProps(fieldName) }
            maxLength={ 20 }
            itemComponent={ SelectItem }
            rightSection={ isLoading ? <Loader size={ 16 }/> : <IconChevronDown size="1rem"/> }
            styles={ {
                rightSection: {
                    pointerEvents: 'none',
                    pointer: 'pointer',
                },
            } }
            sx={ { '&.mantine-MultiSelect-root div[aria-expanded=true] .mantine-MultiSelect-rightSection': { transform: 'rotate(180deg)' } } }
        />
    );

};
