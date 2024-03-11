import React, { useEffect, useState } from 'react';
import { useStyles } from './styles';
import { useForm } from '@mantine/form';
import { useAppDispatchT } from 'app/state';
import { Button, Flex, Loader, Select, SimpleGrid, Space, TextInput } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { errorHandler } from 'app/utils/errorHandler';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { typeResponseError } from 'app/api/types';
import { convertPhoneNumberToStringForApi } from 'shared/utils/convertPhoneNumbertoString';
import { typeUsersEdit } from '../../../entities/users/model/types';
import { usePatchUserMutation } from '../../../entities/users/api/api';
import { FieldsetForForm } from 'shared/ui/fieldset-for-form';
import { useNavigate } from 'react-router-dom';
import { initialUsersEditForm } from '../form/form';
import { typeUsersEditForm } from '../types/types';
import useGetRolesData from 'features/users-edit/helpers/use-get-roles-data';
import { routerPaths } from 'app/config/router-paths';
import useGetUserDataByIdFromUrl from '../../../entities/users/hooks/use-get-user-data-by-id-from-url';
import { IconChevronDown } from '@tabler/icons-react';
import { notificationActions } from '../../../entities/notification/model';


export const UsersEdit: React.FC = () => {

    const { classes } = useStyles();

    const navigate = useNavigate();

    const { i18n } = useLingui();

    const dispatchAppT = useAppDispatchT();

    const userForm = useForm<typeUsersEditForm>(initialUsersEditForm);

    const {
        userData,
        isUserFetching,
    } = useGetUserDataByIdFromUrl();

    useEffect(() => {

        if (userData) {

            userForm.setFieldValue('fullName', userData.fullName);
            userForm.setFieldValue('phone', userData.phone ? userData.phone : '');
            userForm.setFieldValue('email', userData.email);
            userForm.setFieldValue('roleId', userData.role.id);

        }

    }, [ userData ]);

    const {
        roles,
        isRolesFetching,
    } = useGetRolesData();

    const [ editUser, { isLoading } ] = usePatchUserMutation();

    const [ isInProgress, setIsInProgress ] = useState(false);


    const onSave = async () => {

        setIsInProgress(true);
        if (userData?.id) {

            const { phone } = userForm.values;

            const dataObject: typeUsersEdit = {
                id: userData.id,
                fullName: userForm.values.fullName.trim(),
                email: userForm.values.email.trim(),
                phone: convertPhoneNumberToStringForApi(phone),
                roleId: userForm.values.roleId,
            };

            try {

                await editUser(dataObject).unwrap();

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: i18n._(t`User was edited successfully.`),
                }));

                navigate(routerPaths.users, { replace: true });

            } catch (err) {

                errorHandler(err as typeResponseError, 'onEditUser', dispatchAppT);
                setIsInProgress(false);

            }

        }

        setIsInProgress(false);

    };

    const onCancel = () => {

        navigate(routerPaths.users);

    };

    return (
        <form onSubmit={ userForm.onSubmit(onSave) }>

            <Flex className={ classes.flexColumn }>

                <FieldsetForForm title={ <Trans>Personal Information</Trans> }>
                    <SimpleGrid cols={ 2 } className={ classes.formGrid }>
                        <TextInput
                            withAsterisk
                            label={ <Trans>Full name</Trans> }
                            placeholder={ i18n._(t`User name`) }
                            { ...userForm.getInputProps('fullName') }
                            maxLength={ 150 }
                        />
                        <Select
                            withAsterisk
                            label={ <Trans>Role</Trans> }
                            data={ roles }
                            transitionProps={ {
                                duration: 80,
                                timingFunction: 'ease',
                            } }
                            { ...userForm.getInputProps('roleId') }
                            placeholder={ i18n._(t`Select a role`) }
                            rightSection={ isRolesFetching ? <Loader size="xs"/> : <IconChevronDown size="1rem"/> }
                            sx={{ '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' } }}

                        />
                    </SimpleGrid>
                </FieldsetForForm>
                <FieldsetForForm title={ <Trans>Contacts</Trans> }>

                    <SimpleGrid cols={ 2 } className={ classes.formGrid }>
                        <TextInput
                            withAsterisk
                            label={ <Trans>Email</Trans> }
                            placeholder="example@email.com"
                            { ...userForm.getInputProps('email') }
                            maxLength={ 100 }
                        />
                        {/* <PhoneInputWithMoskito */}
                        {/*     formGetInputProps={ userForm.getInputProps('phone') } */}
                        {/*     onInput={ e => userForm.setFieldValue('phone', e.currentTarget.value) } */}
                        {/*     value={ userForm.values.phone } */}
                        {/* /> */}
                    </SimpleGrid>
                </FieldsetForForm>
                <Space h={10}/>
                <Flex className={ classes.buttonsBar }>
                    <Button key="cancel" type="reset" variant="outline" onClick={ onCancel }>{ t`Cancel` }</Button>
                    <Button key="submit" disabled={ !!Object.values(userForm.errors).length || isInProgress }
                        type="submit">{ t`Save` }</Button>
                </Flex>

            </Flex>
            { (isInProgress || isLoading || isUserFetching) && <LoaderOverlay/> }
        </form>
    );

};
