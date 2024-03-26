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
import { typeProductForm } from 'features/product-create/types/types';
import { useLazySearchProductCategoryQuery } from '../../entities/productsCategory/api/api';
import { typeSearchFilterProductCategory } from '../../entities/productsCategory/api/types';

export const SelectorWithSearchProductCategory: React.FC<typeSelectorProductCategory<typeProductForm>> = ({
    form,
    fieldName,
    required,
    initialValue,

}) => {

    const dispatch = useAppDispatchT();

    const [ searchValue, onSearchChange ] = useState('');
    const [ debouncedSearchValue ] = useDebouncedValue(searchValue, 500);

    const [ list, setList ] = useState<{value: string, label: string}[]>([]);

    const [ getCategories, { isLoading } ] = useLazySearchProductCategoryQuery();

    const getData = async (requestData: typeSearchRequest<typeSearchFilterProductCategory, 'NAME'>) => {

        try {

            const response = await getCategories(requestData).unwrap();
            setList(response.content.map(item => ({ value: item.id, label: item.name })));

        } catch (err) {

            errorHandler(err as typeResponseError, 'getProductCategoryInSelect', dispatch);

        }

    };

    useEffect(() => {

        const requestData: typeSearchRequest<typeSearchFilterProductCategory, 'NAME'> = {
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

            const requestData: typeSearchRequest<typeSearchFilterProductCategory, 'NAME'> = {
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

            // itemComponent={ SelectItem }
            rightSection={ isLoading ? <Loader size={ 16 }/> : <IconChevronDown size="1rem"/> }
            sx={ { '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' } } }
        />
    );

};
