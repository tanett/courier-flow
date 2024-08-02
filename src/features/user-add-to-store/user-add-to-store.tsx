import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { initialForm, typeAddUserToStoreForm } from 'features/user-add-to-store/form';
import { Box, Button, em, Flex, rem, Space, useMantineTheme } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useAppDispatchT } from 'app/state';
import { typeResponseError } from 'app/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import {  usePatchUserMutation } from '../../entities/users/api/api';
import { typeUsersEdit } from '../../entities/users/model/types';
import { notificationActions } from '../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { SelectorWithSearchUsers } from 'features/selector-with-search-users';
import { typeReturnForm } from 'features/selector-with-search-users/types';


export const UserAddToStore: React.FC<{ storeId: string, onClose: (refetch: boolean) => void }> = ({
    storeId,
    onClose,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const form = useForm<typeAddUserToStoreForm>(initialForm);

    const dispatchAppT = useAppDispatchT();

    const [ editUser, { isLoading: isEditUserLoading } ] = usePatchUserMutation();

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
                    width: rem(550),
                    [`@media (max-width: ${em(1000)})`]: { minWidth: '50vw', width: 'fit-content' },
                    padding: rem(15),
                    marginTop: rem(-10),
                    position: 'relative',
                    overflow: 'visible',
                    '& .mantine-InputWrapper-root': {maxWidth: 'none'}
                } }>
                <SelectorWithSearchUsers
                    form={ form as unknown as typeReturnForm }
                    fieldName={ 'userId' }
                    required={ true }
                    initialValue={ null }
                    label={i18n._(t`Employees`)}
                    placeholder={i18n._(t`Search by employee name`)}
                />
                <Space h={ 32 }/>
                <Flex sx={ {
                    gap: rem(24),
                    justifyContent: 'center',
                    flexWrap: 'wrap',
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
            { isEditUserLoading && <LoaderOverlay/> }
        </form>
    );

};
