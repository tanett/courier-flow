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
import { typeUsersEdit } from '../../../entities/users/model/types';
import { useGetUserByIdQuery, usePatchUserMutation } from '../../../entities/users/api/api';
import { FieldsetForForm } from 'shared/ui/fieldset-for-form';
import { useNavigate, useParams } from 'react-router-dom';
import { initialUsersEditForm } from '../form/form';
import { typeUsersEditForm } from '../types/types';
import { IconChevronDown } from '@tabler/icons-react';
import { notificationActions } from '../../../entities/notification/model';
import { PhoneInputWithCountrySelector } from 'shared/ui/phone-input';
import useGetRolesDataForSelector from '../../../entities/role/hooks/use-get-roles-data-for-selector';
import { convertPhoneNumberToStringForApi } from 'shared/utils/convertPhoneNumbertoString';


export const StoresUsersEdit: React.FC = () => {

    const { classes } = useStyles();

    const navigate = useNavigate();

    const { i18n } = useLingui();

    const { userId, } = useParams();

    const dispatchAppT = useAppDispatchT();

    const userForm = useForm<typeUsersEditForm>(initialUsersEditForm);

    const {
        data:userData,
        isFetching: isUserFetching,
    } = useGetUserByIdQuery(userId!);

    useEffect(() => {

        if (userData) {

            userForm.setFieldValue('fullName', userData.fullName);
            userForm.setFieldValue('phone', userData.phone ? userData.phone : '');
            userForm.setFieldValue('email', userData.email);
            userForm.setFieldValue('roleId', userData.role.id);
            userForm.setFieldValue('storeIds', userData.storeIds);

        }

    }, [ userData ]);

    const {
        roles,
        isRolesFetching,
    } = useGetRolesDataForSelector();

    const [ editUser, { isLoading } ] = usePatchUserMutation();

    const [ isInProgress, setIsInProgress ] = useState(false);


    const onSave = async () => {

        setIsInProgress(true);
        if (userData?.id) {

            const phone = userForm.values.phone.trim() === ''
                ? undefined
                : userForm.values.phone.trim() === userData.phone ? undefined : convertPhoneNumberToStringForApi(userForm.values.phone);

            const dataObject: typeUsersEdit = {
                id: userData.id,
                fullName: userForm.values.fullName.trim() === userData.fullName.trim() ? undefined : userForm.values.fullName.trim().replace(/\s{2,}/g, ' '),
                // email: userForm.values.email.trim() === userData.email.trim() ? undefined : userForm.values.email.trim(),
                phone: phone,
                roleId: userForm.values.roleId === userData.role.id ? undefined : userForm.values.roleId,
                // storeIds: isArrayEqual(userData.storeIds, userForm.values.storeIds) ? undefined : {
                //     values: userForm.values.storeIds,
                //     patchType: 'REPLACE',
                // },
            };


            try {

                await editUser(dataObject).unwrap();

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: i18n._(t`User was edited successfully.`),
                }));

                navigate(-1);

            } catch (err) {

                errorHandler(err as typeResponseError, 'onEditUser', dispatchAppT);
                setIsInProgress(false);

            }

        }

        setIsInProgress(false);

    };

    const onCancel = () => {

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
                            rightSection={ (isRolesFetching || !userData) ? <Loader size="xs"/> : <IconChevronDown size="1rem"/> }
                            styles={ {
                                rightSection: {
                                    pointerEvents: 'none',
                                    pointer: 'pointer',
                                },
                            } }
                            sx={ { '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' } } }

                        />
                        {/* <MultiSelectorWithSearchStore */}
                        {/*     required={ false } */}
                        {/*     fieldName={ 'storeIds' } */}
                        {/*     form={ userForm } */}
                        {/*     initialValue={ (userData && userData.storeIds.length > 0) ? userData.storeIds : null } */}
                        {/* /> */}
                    </SimpleGrid>
                </FieldsetForForm>
                <FieldsetForForm title={ <Trans>Contacts</Trans> }>

                    <SimpleGrid cols={ 2 } className={ classes.formGrid }>
                        {/* <TextInput */}
                        {/*     withAsterisk */}
                        {/*     label={ <Trans>Email</Trans> } */}
                        {/*     placeholder="example@email.com" */}
                        {/*     { ...userForm.getInputProps('email') } */}
                        {/*     maxLength={ 100 } */}
                        {/* /> */}
                        <PhoneInputWithCountrySelector
                            isRequired={ false }
                            { ...userForm.getInputProps('phone') }
                            value={ userForm.values.phone }
                            onChange={ (value: string) => userForm.setFieldValue('phone', value) }
                        />
                    </SimpleGrid>
                </FieldsetForForm>
                <Space h={ 10 }/>
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
