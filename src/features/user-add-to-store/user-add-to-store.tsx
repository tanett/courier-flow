import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { initialForm, typeAddUserToStoreForm } from 'features/user-add-to-store/form';
import { Box, Button, Flex, Loader, rem, Select, Space, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { IconChevronDown } from '@tabler/icons-react';
import { useLingui } from '@lingui/react';
import { useAppDispatchT } from 'app/state';
import { useDebouncedValue } from '@mantine/hooks';
import { sortDirection, typeResponseError, typeSearchRequest } from 'app/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import { useLazySearchUserQuery, usePatchUserMutation } from '../../entities/users/api/api';
import { typeSearchFilterUsers } from '../../entities/users/api/types';
import { accessScope } from 'app/config/api-constants';
import { typeUsersEdit } from '../../entities/users/model/types';
import { notificationActions } from '../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { LoaderOverlay } from 'shared/ui/loader-overlay';


export const UserAddToStore: React.FC<{ storeId: string, onClose: (refetch: boolean) => void }> = ({
    storeId,
    onClose,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const form = useForm<typeAddUserToStoreForm>(initialForm);

    const dispatchAppT = useAppDispatchT();

    const [ editUser, { isLoading: isEditUserLoading } ] = usePatchUserMutation();

    const [ searchUserValue, onSearchUserChange ] = useState('');
    const [ debouncedSearchValue ] = useDebouncedValue(searchUserValue, 500);

    const [ usersList, setUsersList ] = useState<{ value: string, label: string }[]>([]);

    const [ getUsers, { isFetching } ] = useLazySearchUserQuery();

    const getData = async (requestData: typeSearchRequest<typeSearchFilterUsers, 'FULL_NAME'>) => {

        try {

            const response = await getUsers(requestData).unwrap();
            setUsersList(response.content.map(user => ({
                value: user.id,
                label: user.fullName,
            })));

        } catch (err) {

            errorHandler(err as typeResponseError, 'getUsersInSelect', dispatchAppT);

        }

    };

    useEffect(() => {

        const requestData: typeSearchRequest<typeSearchFilterUsers, 'FULL_NAME'> = {
            filter: {
                archived: false,
                accessScopes: [ accessScope.merchant, accessScope.store ],
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

    }, []);


    useEffect(() => {

        if (searchUserValue.trim().length) {

            const requestData: typeSearchRequest<typeSearchFilterUsers, 'FULL_NAME'> = {
                filter: {
                    archived: false,
                    accessScopes: [ accessScope.merchant, accessScope.store ],
                    fullNameContains: searchUserValue,
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

    }, [ debouncedSearchValue ]);

    const onCancelClick = () => {

        form.reset();
        onClose(false);

    };

    const [ isInProgress, setIsInProgress ] = useState(false);

    const onSubmit = async () => {

        if (form.values.userId) {

            setIsInProgress(true);
            const dataObject: typeUsersEdit = {
                id: form.values.userId,
                storeIds: {
                    values: [ storeId ],
                    patchType: 'ADD',
                },
            };


            try {

                await editUser(dataObject).unwrap();

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: i18n._(t`User was added successfully.`),
                }));

                onClose(true);

            } catch (err) {

                errorHandler(err as typeResponseError, 'onEditUser', dispatchAppT);


            }
            setIsInProgress(false);

        }


    };

    return (
        <form onSubmit={ form.onSubmit(onSubmit) }>
            <Box
                sx={ {
                    minWidth: '50vw',
                    padding: rem(15),
                    marginTop: rem(-10),
                    position: 'relative',
                    overflow: 'visible',
                } }>
                <Select

                    withAsterisk
                    label={ <Trans>Employees</Trans> }
                    data={ usersList }
                    clearable
                    searchable
                    searchValue={ searchUserValue }
                    onSearchChange={ onSearchUserChange }
                    transitionProps={ {
                        duration: 80,
                        timingFunction: 'ease',
                    } }
                    { ...form.getInputProps('userId') }
                    placeholder={ i18n._(t`Type a name and select an employee`) }
                    rightSection={ (isFetching || !usersList) ? <Loader size="xs"/> : <IconChevronDown size="1rem"/> }
                    sx={ {
                        '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' },
                        '&.mantine-InputWrapper-root': { width: '100%', maxWidth: 'none', zIndex: 10000 },
                    } }
                    withinPortal={true}
                    maxDropdownHeight={400}
                    limit={40}

                />
                <Space h={ 32 }/>
                <Flex sx={ {
                    gap: rem(24),
                    justifyContent: 'center',
                    '& .mantine-Button-root': {
                        minWidth: rem(165),
                        fontSize: theme.fontSizes.md,
                        fontWeight: 700,
                    },
                } }>
                    <Button key="cancel" type="reset" variant="outline" onClick={ onCancelClick }>{ t`Cancel` }</Button>
                    <Button key="submit" disabled={ !!Object.values(form.errors).length || isInProgress }
                        type="submit">{ t`Add` }</Button>
                </Flex>
            </Box>
            {isEditUserLoading && <LoaderOverlay/>}
        </form>
    );

};
