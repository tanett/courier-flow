import React, { useEffect, useState } from 'react';
import { typeSelectorStores } from './types';
import { Loader, Select } from '@mantine/core';
import { t } from '@lingui/macro';
import { IconChevronDown } from '@tabler/icons-react';
import { useDebouncedValue } from '@mantine/hooks';
import { sortDirection, typeResponseError, typeSearchRequest } from 'app/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import { useAppDispatchT } from 'app/state';
import { useLazySearchTerminalListQuery } from '../../entities/terminals/api/api';
import { typeSearchTerminalsFilter, typeSearchTerminalSortingNames } from '../../entities/terminals/api/types';


export const SelectorWithSearchTerminals: React.FC<typeSelectorStores> = ({
    form,
    fieldName,
    required,
    initialValue,
    disabled,

}) => {

    const dispatch = useAppDispatchT();

    const [ searchValue, onSearchChange ] = useState('');
    const [ debouncedSearchValue ] = useDebouncedValue(searchValue, 500);

    const [ terminalsList, setTerminalsList ] = useState<{ value: string, label: string }[]>([]);
    const [ firstRequest, setFirstRequest ] = useState<{ value: string, label: string }[]>([]);

    const [ getTerminals, { isLoading } ] = useLazySearchTerminalListQuery();

    const getData = async (requestData: typeSearchRequest<typeSearchTerminalsFilter, typeSearchTerminalSortingNames>, isFirst?: boolean) => {

        try {

            const response = await getTerminals(requestData).unwrap();
            const mapResponse = response.content.map(item => ({
                value: item.id,
                label: item.serialNumber,
            }));
            setTerminalsList(mapResponse);
            if (isFirst) {

                setFirstRequest(mapResponse);

            }

        } catch (err) {

            errorHandler(err as typeResponseError, 'getTerminalsInSelect', dispatch);

        }

    };

    useEffect(() => {

        const requestData: typeSearchRequest<typeSearchTerminalsFilter, typeSearchTerminalSortingNames> = {
            filter: { archived: false },
            pagination: {
                pageNumber: 0,
                pageSize: 50,
            },
            sorts: [
                {
                    sort: 'CREATED_AT',
                    direction: sortDirection.asc,
                }
            ],
        };

        getData(requestData, true).then();

    }, []);

    useEffect(() => {

        if (initialValue) {

            const requestData: typeSearchRequest<typeSearchTerminalsFilter, typeSearchTerminalSortingNames> = {
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
                        sort: 'CREATED_AT',
                        direction: sortDirection.asc,
                    }
                ],
            };

            getData(requestData).then();

        }

    }, [ initialValue ]);

    useEffect(() => {

        if (searchValue.trim().length) {

            const requestData: typeSearchRequest<typeSearchTerminalsFilter, typeSearchTerminalSortingNames> = {
                filter: {
                    archived: false,
                    searchText: searchValue,
                },
                pagination: {
                    pageNumber: 0,
                    pageSize: 30,
                },
                sorts: [
                    {
                        sort: 'CREATED_AT',
                        direction: sortDirection.asc,
                    }
                ],
            };

            getData(requestData).then();

        } else {

            setTerminalsList(firstRequest);

        }

    }, [ debouncedSearchValue ]);

    return (
        <Select
            withinPortal
            withAsterisk={ required }
            clearable
            searchable
            limit={ 40 }
            label={ t`Terminals` }
            placeholder={ t`Search by serial number` }
            data={ terminalsList }
            searchValue={ searchValue }
            onSearchChange={ (query) => onSearchChange(query) }
            nothingFound={ t`Terminal not found` }
            { ...form.getInputProps(fieldName) }
            maxLength={ 20 }
            disabled={ disabled }
            styles={ {
                rightSection: {
                    pointerEvents: 'none',
                    pointer: 'pointer',
                },
            } }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            rightSection={ isLoading ? <Loader size={ 16 }/> : form.values[ fieldName ] ? undefined : <IconChevronDown size="1rem"/> }
            sx={ theme => ({
                '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' },
                '& input::placeholder': { color: theme.colors.gray[3] },
            }) }        />
    );

};
