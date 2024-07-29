import React, { useState } from 'react';
import { useStyles } from './styles';
import { useForm } from '@mantine/form';
import { typeUsersCreateForm } from '../types/types';
import { initialUsersCreateForm, mapRequestFieldsToFormFieldUsers } from '../form/form';
import { useAppDispatchT, useSelectorT } from 'app/state';
import { Button, Flex, Loader, Select, SimpleGrid, Space, TextInput } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { notificationActions } from '../../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { typeResponseError } from 'app/api/types';
import { typeUsersCreate } from '../../../entities/users/model/types';
import { useCreateUserMutation } from '../../../entities/users/api/api';
import { FieldsetForForm } from 'shared/ui/fieldset-for-form';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from '../../../app/config/router-paths';
import { isPossiblePhoneNumber } from 'libphonenumber-js';
import { IconChevronDown } from '@tabler/icons-react';
import { MultiSelectorWithSearchStore } from 'features/multiselector-with-search-store';
import { PhoneInputWithCountrySelector } from 'shared/ui/phone-input';
import useGetRolesDataForSelector from '../../../entities/role/hooks/use-get-roles-data-for-selector';
import { errorHandlerForForm, typeReturnForm } from 'app/utils/error-handler-for-form';


export const UsersCreateNew: React.FC = () => {

    const { classes } = useStyles();

    const navigate = useNavigate();

    const { i18n } = useLingui();

    const dispatchAppT = useAppDispatchT();

    const userForm = useForm<typeUsersCreateForm>(initialUsersCreateForm);

    const [ createUser, { isLoading } ] = useCreateUserMutation();

    const [ isInProgress, setIsInProgress ] = useState(false);

    const currentUser = useSelectorT(state => state.userProfile.userProfile);


    // set roles
    const {
        roles,
        isRolesFetching,
    } = useGetRolesDataForSelector();

    const onSave = async () => {

        if (currentUser) {

            setIsInProgress(true);

            const { phone } = userForm.values;

            const dataObject: typeUsersCreate = {
                fullName: userForm.values.fullName.trim(),
                email: userForm.values.email.trim(),
                phone: isPossiblePhoneNumber(phone) ? phone : undefined,
                roleId: userForm.values.roleId,
                temporaryPassword: true,
                merchantId: currentUser.actor.merchantId,
                storeIds: userForm.values.storeIds.length > 0 ? userForm.values.storeIds : undefined,
            };

            try {

                await createUser(dataObject).unwrap();

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: i18n._(t`User created successfully.`),
                }));

                navigate(routerPaths.users, { replace: true });

            } catch (err) {

                errorHandlerForForm(err as typeResponseError, 'onCreateUser', dispatchAppT, userForm as unknown as typeReturnForm, mapRequestFieldsToFormFieldUsers);
                setIsInProgress(false);

            }


            setIsInProgress(false);

        }

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
                            label={ mapRequestFieldsToFormFieldUsers.fullName.translatedValue }
                            placeholder={ i18n._(t`User name`) }
                            { ...userForm.getInputProps('fullName') }
                            maxLength={ 150 }
                        />
                        <Select
                            withAsterisk
                            label={ mapRequestFieldsToFormFieldUsers.roleId.translatedValue }
                            data={ roles }
                            transitionProps={ {
                                duration: 80,
                                timingFunction: 'ease',
                            } }
                            { ...userForm.getInputProps('roleId') }
                            placeholder={ i18n._(t`Select a role`) }
                            rightSection={ isRolesFetching ? <Loader size="xs"/> : <IconChevronDown size="1rem"/> }
                            styles={ {
                                rightSection: {
                                    pointerEvents: 'none',
                                    pointer: 'pointer',
                                },
                            } }
                            sx={ { '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' } } }
                        />
                        <MultiSelectorWithSearchStore
                            required={false}
                            fieldName={'storeIds'}
                            form={userForm}
                            initialValue={null}
                        />
                    </SimpleGrid>
                </FieldsetForForm>
                <FieldsetForForm title={ <Trans>Contacts</Trans> }>

                    <SimpleGrid cols={ 2 } className={ classes.formGrid }>
                        <TextInput
                            withAsterisk
                            label={ mapRequestFieldsToFormFieldUsers.email.translatedValue }
                            placeholder="example@email.com"
                            { ...userForm.getInputProps('email') }
                            maxLength={ 100 }
                        />
                        <PhoneInputWithCountrySelector
                            isRequired={false}
                            {...userForm.getInputProps('phone')}
                            value={ userForm.values.phone }
                            onChange={(value: string) => userForm.setFieldValue('phone', value)}
                        />
                    </SimpleGrid>
                </FieldsetForForm>
                <Space h={ 10 }/>
                <Flex className={ classes.buttonsBar }>
                    <Button key="cancel" type="reset" variant="outline" onClick={ onCancel }>{ t`Cancel` }</Button>
                    <Button key="submit" disabled={ !!Object.values(userForm.errors).length || isInProgress }
                        type="submit">{ t`Create` }</Button>
                </Flex>

            </Flex>
            { (isInProgress || isLoading) && <LoaderOverlay/> }
        </form>
    );

};
