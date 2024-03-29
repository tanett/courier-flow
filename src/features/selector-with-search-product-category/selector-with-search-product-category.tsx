import React, { useEffect, useState } from 'react';
import { typeSelectorProductCategory } from './types';
import { Loader, Select } from '@mantine/core';
import { t } from '@lingui/macro';
import { IconChevronDown } from '@tabler/icons-react';
import { useDebouncedValue } from '@mantine/hooks';
import { sortDirection, typeResponseError, typeSearchRequest } from 'app/api/types';
import { typeSearchFilterStore } from '../../entities/stores/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import { useAppDispatchT } from 'app/state';
import { useLazySearchCategoryQuery } from '../../entities/category/api/api';
import { typeSearchFilterCategory } from '../../entities/category/api/types';

export const SelectorWithSearchProductCategory: React.FC<typeSelectorProductCategory> = ({
    form,
    fieldName,
    required,
    initialValue,

}) => {

    const dispatch = useAppDispatchT();

    const [ searchValue, onSearchChange ] = useState('');
    const [ debouncedSearchValue ] = useDebouncedValue(searchValue, 500);

    const [ list, setList ] = useState<{value: string, label: string}[]>([]);

    const [ getCategories, { isLoading } ] = useLazySearchCategoryQuery();

    const getData = async (requestData: typeSearchRequest<typeSearchFilterCategory, 'NAME'>) => {

        try {

            const response = await getCategories(requestData).unwrap();
            setList(response.content.map(item => ({ value: item.id, label: item.name })));

        } catch (err) {

            errorHandler(err as typeResponseError, 'getProductCategoryInSelect', dispatch);

        }

    };

    useEffect(() => {

        const requestData: typeSearchRequest<typeSearchFilterCategory, 'NAME'> = {
            filter: { },
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

            const requestData: typeSearchRequest<typeSearchFilterCategory, 'NAME'> = {
                filter: { ids: [ initialValue ], },
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

        if (searchValue.trim().length) {

            const requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'> = {
                filter: {
                    archived: false,
                    nameContains: searchValue,
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

    }, [ debouncedSearchValue ]);

    return (
        <Select
            withAsterisk={ required }
            clearable
            searchable
            limit={ 40 }
            label={ t`Category` }
            placeholder={ t`Type category name and select` }
            data={ list }
            searchValue={ searchValue }
            onSearchChange={(query) => onSearchChange(query) }
            nothingFound={ t`Product category not found` }
            { ...form.getInputProps(fieldName) }
            maxLength={ 20 }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            rightSection={ isLoading ? <Loader size={ 16 }/> : form.values[fieldName] ? undefined :  <IconChevronDown size="1rem"/> }
            sx={ { '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': {transform: 'rotate(180deg)', },}}
        />
    );

};
