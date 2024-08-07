import React, { forwardRef, useEffect, useState } from 'react';
import { typeSelectorCashDesk } from './types';
import { Box, Flex, Loader, Select, Text } from '@mantine/core';
import { t } from '@lingui/macro';
import { IconChevronDown } from '@tabler/icons-react';
import { useDebouncedValue } from '@mantine/hooks';
import { sortDirection, typeResponseError, typeSearchRequest } from 'app/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import { useAppDispatchT } from 'app/state';
import { useLazySearchCashDeskQuery } from '../../entities/cash-desk/api/api';
import { typeSearchFilterCashDesk } from '../../entities/cash-desk/model/types';


interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    label: string;
    markerText?: string;
}

const CustomSelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({
        label,
        markerText,
        ...others
    }: ItemProps, ref) => (
        <div ref={ ref } { ...others }>
            <Flex gap={ 8 } align={ 'baseline' }>
                <Text size="md">{ label }{ markerText && <Box component={ 'span' } sx={ theme => ({
                    color: theme.colors.gray[ 4 ],
                    fontSize: theme.fontSizes.md,
                    marginLeft: '10px',
                }) }>
                    ({ markerText })
                </Box> }</Text>

            </Flex>

        </div>
    )
);

export const SelectorWithSearchCashDesk: React.FC<typeSelectorCashDesk> = ({
    form,
    fieldName,
    required,
    initialValue,
    disabled,
    label,
    placeholder,
    storesFilters,

    // roleCodesFilters,
    currentCashDesk,
    markerForCurrentCashDesk,

}) => {

    const dispatch = useAppDispatchT();

    const [ searchValue, onSearchChange ] = useState('');
    const [ debouncedSearchValue ] = useDebouncedValue(searchValue, 500);

    const [ cashDeskList, setCashDeskList ] = useState<{ value: string, label: string, markerText?: string }[]>([]);
    const [ firstRequest, setFirstRequest ] = useState<{ value: string, label: string }[]>([]);

    const [ getCashDesk, { isFetching } ] = useLazySearchCashDeskQuery();

    const getData = async (requestData: typeSearchRequest<typeSearchFilterCashDesk, 'NAME'>, isFirst?: boolean) => {

        try {

            const response = await getCashDesk(requestData).unwrap();

            let mapResponse = response.content.map(item => ({
                value: item.id,
                label: item.name,
                markerText: (markerForCurrentCashDesk && item.id === currentCashDesk) ? markerForCurrentCashDesk : undefined,
            }));

            if (markerForCurrentCashDesk && currentCashDesk) {

                const currentCashDeskIndex = mapResponse.findIndex(item => item.value === currentCashDesk);
                if (currentCashDeskIndex >= 0) {

                    mapResponse = [ mapResponse[ currentCashDeskIndex ], ...mapResponse.filter(item => item.value !== currentCashDesk) ];

                }

            }

            setCashDeskList(mapResponse);

            if (isFirst) {

                setFirstRequest(mapResponse);

            }

        } catch (err) {

            errorHandler(err as typeResponseError, 'getUsersInSelect', dispatch);

        }

    };

    useEffect(() => {

        const requestData: typeSearchRequest<typeSearchFilterCashDesk, 'NAME'> = {
            filter: {
                archived: false,
                storeIds: storesFilters,

                // roleCodes: roleCodesFilters,
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

        getData(requestData, true).then();

    }, []);

    useEffect(() => {

        if (initialValue) {

            const requestData: typeSearchRequest<typeSearchFilterCashDesk, 'NAME'> = {
                filter: {
                    archived: false,
                    ids: [ initialValue ],
                    storeIds: storesFilters,

                    // roleCodes: roleCodesFilters,
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

        if (searchValue.trim().length) {

            const requestData: typeSearchRequest<typeSearchFilterCashDesk, 'NAME'> = {
                filter: {
                    archived: false,

                    // accessScopes: [ accessScope.merchant, accessScope.store ],
                    searchText: searchValue,
                    storeIds: storesFilters,

                    // roleCodes: roleCodesFilters,
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

            setCashDeskList(firstRequest);

        }

    }, [ debouncedSearchValue ]);

    return (
        <Select
            withinPortal
            withAsterisk={ required }
            clearable
            searchable
            limit={ 40 }
            label={ label || t`Cash desk` }
            placeholder={ placeholder ? placeholder : t`Search by Cash desk name` }
            data={ cashDeskList }
            searchValue={ searchValue }
            onSearchChange={ (query) => onSearchChange(query) }
            nothingFound={ t`Cash desk not found` }
            itemComponent={ CustomSelectItem }
            { ...form.getInputProps(fieldName) }
            maxLength={ 20 }
            disabled={ disabled }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            rightSection={ isFetching ? <Loader size={ 16 }/> : form.values[ fieldName ] ? undefined : <IconChevronDown size="1rem"/> }
            styles={ {
                rightSection: {
                    pointerEvents: 'none',
                    pointer: 'pointer',
                },
            } }
            sx={ theme => ({
                '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' },
                '& input::placeholder': { color: theme.colors.gray[ 3 ] },
            }) } />
    );

};
