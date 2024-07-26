import React, { forwardRef, useEffect, useState } from 'react';
import { typeSelectorUsers } from './types';
import { Box, Flex, Loader, Select, Text } from '@mantine/core';
import { t } from '@lingui/macro';
import { IconChevronDown } from '@tabler/icons-react';
import { useDebouncedValue } from '@mantine/hooks';
import { sortDirection, typeResponseError, typeSearchRequest } from 'app/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import { useAppDispatchT } from 'app/state';
import { useLazySearchUserQuery } from '../../entities/users/api/api';
import { typeSearchFilterUsers } from '../../entities/users/api/types';
import { accessScope } from 'app/config/api-constants';


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
                    color: theme.colors.gray[4],
                    fontSize: theme.fontSizes.md,
                    marginLeft: '10px'
                }) }>
                    ({ markerText })
                </Box> }</Text>

            </Flex>

        </div>
    )
);

export const SelectorWithSearchUsers: React.FC<typeSelectorUsers> = ({
    form,
    fieldName,
    required,
    initialValue,
    disabled,
    label,
    storesFilters,
    roleCodesFilters,
    currentUser,
    markerForCurrentUser

}) => {

    const dispatch = useAppDispatchT();

    const [ searchValue, onSearchChange ] = useState('');
    const [ debouncedSearchValue ] = useDebouncedValue(searchValue, 500);

    const [ usersList, setUsersList ] = useState<{ value: string, label: string, markerText?: string }[]>([]);
    const [ firstRequest, setFirstRequest ] = useState<{ value: string, label: string }[]>([]);

    const [ getUsers, { isFetching } ] = useLazySearchUserQuery();

    const getData = async (requestData: typeSearchRequest<typeSearchFilterUsers, 'FULL_NAME'>, isFirst?: boolean) => {

        try {

            const response = await getUsers(requestData).unwrap();

            let mapResponse = response.content.map(item => ({
                value: item.id,
                label: item.fullName,
                markerText: (markerForCurrentUser && item.id === currentUser) ? markerForCurrentUser : undefined
            }));

            if (markerForCurrentUser && currentUser) {

                const currentUserIndex = mapResponse.findIndex(item => item.value === currentUser);
                if (currentUserIndex >= 0) {
                    mapResponse = [ mapResponse[currentUserIndex], ...mapResponse.filter(item => item.value !== currentUser) ];
                }
            }

            setUsersList(mapResponse);

            if (isFirst) {

                setFirstRequest(mapResponse);

            }

        } catch (err) {

            errorHandler(err as typeResponseError, 'getUsersInSelect', dispatch);

        }

    };

    useEffect(() => {

        const requestData: typeSearchRequest<typeSearchFilterUsers, 'FULL_NAME'> = {
            filter: {
                archived: false,
                storeIds: storesFilters,
                roleCodes: roleCodesFilters
            },
            pagination: {
                pageNumber: 0,
                pageSize: 50,
            },
            sorts: [
                {
                    sort: 'FULL_NAME',
                    direction: sortDirection.asc,
                }
            ],
        };

        getData(requestData, true).then();

    }, []);

    useEffect(() => {

        if (initialValue) {

            const requestData: typeSearchRequest<typeSearchFilterUsers, 'FULL_NAME'> = {
                filter: {
                    archived: false,
                    ids: [ initialValue ],
                    storeIds: storesFilters,
                    roleCodes: roleCodesFilters
                },
                pagination: {
                    pageNumber: 0,
                    pageSize: 30,
                },
                sorts: [
                    {
                        sort: 'FULL_NAME',
                        direction: sortDirection.asc,
                    }
                ],
            };

            getData(requestData).then();

        }

    }, [ initialValue ]);

    useEffect(() => {

        if (searchValue.trim().length) {

            const requestData: typeSearchRequest<typeSearchFilterUsers, 'FULL_NAME'> = {
                filter: {
                    archived: false,
                    accessScopes: [ accessScope.merchant, accessScope.store ],
                    fullNameContains: searchValue,
                    storeIds: storesFilters,
                    roleCodes: roleCodesFilters
                },
                pagination: {
                    pageNumber: 0,
                    pageSize: 30,
                },
                sorts: [
                    {
                        sort: 'FULL_NAME',
                        direction: sortDirection.asc,
                    }
                ],
            };

            getData(requestData).then();

        } else {

            setUsersList(firstRequest);

        }

    }, [ debouncedSearchValue ]);

    return (
        <Select
            withinPortal
            withAsterisk={ required }
            clearable
            searchable
            limit={ 40 }
            label={ label || t`Users` }
            placeholder={ t`Type user name and select` }
            data={ usersList }
            searchValue={ searchValue }
            onSearchChange={ (query) => onSearchChange(query) }
            nothingFound={ t`User not found` }
            itemComponent={ CustomSelectItem }
            { ...form.getInputProps(fieldName) }
            maxLength={ 20 }
            disabled={ disabled }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            rightSection={ isFetching ? <Loader size={ 16 }/> : form.values[fieldName] ? undefined : <IconChevronDown size="1rem"/> }
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
