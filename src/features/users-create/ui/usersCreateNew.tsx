import React, { useState } from 'react';
import { useStyles } from './styles';
import { useForm } from '@mantine/form';
import { typeUsersCreateForm } from '../types/types';
import { initialUsersCreateForm } from '../form/form';
import { useAppDispatchT } from 'app/state';
import { Button, Flex, Loader, Select, SimpleGrid, Space, TextInput } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { errorHandler } from 'app/utils/errorHandler';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { notificationActions } from '../../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { typeResponseError } from 'app/api/types';
import { typeUsersCreate } from '../../../entities/users/model/types';
import { useCreateUserMutation } from '../../../entities/users/api/api';
import { FieldsetForForm } from 'shared/ui/fieldset-for-form';
import { useNavigate } from 'react-router-dom';
import useGetRolesData from 'features/users-create/helpers/use-get-roles-data';
import { routerPaths } from '../../../app/config/router-paths';
import { isPossiblePhoneNumber } from 'libphonenumber-js';
import { IconChevronDown } from '@tabler/icons-react';


export const UsersCreateNew: React.FC = () => {

    const { classes } = useStyles();

    const navigate = useNavigate();

    const { i18n } = useLingui();

    const dispatchAppT = useAppDispatchT();

    const userForm = useForm<typeUsersCreateForm>(initialUsersCreateForm);

    const [ createUser, { isLoading } ] = useCreateUserMutation();

    const [ isInProgress, setIsInProgress ] = useState(false);

    // set roles
    const {
        roles,
        isRolesFetching,
    } = useGetRolesData();

    const onSave = async () => {

        setIsInProgress(true);

        const { phone } = userForm.values;

        const dataObject: typeUsersCreate = {
            fullName: userForm.values.fullName.trim(),
            email: userForm.values.email.trim(),
            phone: isPossiblePhoneNumber(phone) ? phone : undefined,
            roleId: userForm.values.roleId,
            temporaryPassword: true,
        };

        try {

            await createUser(dataObject).unwrap();

            dispatchAppT(notificationActions.addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                message: i18n._(t`User created successfully.`),
            }));

            navigate(routerPaths.users, { replace: true });

        } catch (err) {

            errorHandler(err as typeResponseError, 'onCreateUser', dispatchAppT);
            setIsInProgress(false);

        }


        setIsInProgress(false);

    };

    const onCancel = () => {

        userForm.reset();
        navigate(-1);

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
                            maxLength={150}
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
                            maxLength={100}
                        />
                        {/* <PhoneInputWithMoskito */}
                        {/*     formGetInputProps={userForm.getInputProps('phone')} */}
                        {/*     onInput={ e => userForm.setFieldValue('phone', e.currentTarget.value)} */}
                        {/*     value={userForm.values.phone} */}
                        {/* /> */}
                    </SimpleGrid>
                </FieldsetForForm>
                <Space h={10}/>
                <Flex className={ classes.buttonsBar }>
                    <Button key="cancel" type="reset" variant="outline" onClick={ onCancel }>{ t`Cancel` }</Button>
                    <Button key="submit" disabled={ !!Object.values(userForm.errors).length || isInProgress}
                        type="submit">{ t`Save` }</Button>
                </Flex>

            </Flex>
            { (isInProgress || isLoading) && <LoaderOverlay/> }
        </form>
    );

};
