import React, { useEffect, useState } from 'react';
import { useStyles } from './styles';
import { useForm } from '@mantine/form';
import { typeProfileForm } from '../types/types';
import { initialProfileForm, mapRequestFieldsToFormField } from '../form/form';
import { useAppDispatchT } from 'app/state';
import { LANGUAGES, locales } from 'app/config/languages';
import { Button, Flex, Select, SimpleGrid, Space, TextInput } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { typePatchCurrentUser } from '../../../entities/user-profile/api/types';
import { notificationActions } from '../../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { typeResponseError } from 'app/api/types';
import { userProfileActions } from '../../../entities/user-profile/model/state-slice';
import { convertPhoneNumberToStringForApi } from 'shared/utils/convertPhoneNumbertoString';
import { useGetCurrentUserQuery, usePatchCurrentUserMutation } from '../../../entities/user-profile/api/api';
import { FieldsetForForm } from 'shared/ui/fieldset-for-form';
import { PhoneInputWithCountrySelector } from 'shared/ui/phone-input';
import { IconChevronDown } from '@tabler/icons-react';
import { getLocaleForProfile } from 'features/profile-show-edit/helpers/get-locale-for-profile';
import { errorHandlerForForm, typeReturnForm } from 'app/utils/error-handler-for-form';


export const Profile: React.FC = () => {

    const { classes } = useStyles();

    const { i18n } = useLingui();

    const dispatchAppT = useAppDispatchT();

    const {
        data,
        isFetching
    } = useGetCurrentUserQuery({});

    const profileForm = useForm<typeProfileForm>(initialProfileForm);


    useEffect(() => {

        if (data) {
            dispatchAppT(userProfileActions.changeUserProfile(data))
            const profileData = data.actor;

            profileForm.setFieldValue('fullName', profileData.fullName ?? '');
            profileForm.setFieldValue('email', profileData.email ?? '');
            profileForm.setFieldValue('phone', profileData.phone ?? '');
            profileForm.setFieldValue('locale', getLocaleForProfile(profileData.userSettings));
        }

    }, [ data ]);

    const [ patchUser, { isLoading } ] = usePatchCurrentUserMutation();
    const [ isInProgress, setIsInProgress ] = useState(false);

    const onSave = async () => {

        setIsInProgress(true);

        if (data) {
            const profileData = data.actor;
            const editObject: typePatchCurrentUser = {
                id: profileData.id,
                fullName: profileForm.values.fullName.trim() === profileData.fullName ? undefined : profileForm.values.fullName.trim().replace(/\s{2,}/g, ' '),
                email: profileForm.values.email.trim() === profileData.email ? undefined : profileForm.values.email.trim(),
                phone: convertPhoneNumberToStringForApi(profileForm.values.phone) === profileData.phone ? undefined : convertPhoneNumberToStringForApi(profileForm.values.phone),
                userSettings: profileForm.values.locale === profileData?.userSettings?.locale ? undefined : { locale: profileForm.values.locale as LANGUAGES },
            };

            for (const key of Object.keys(editObject)) {

                if (editObject[key as keyof typePatchCurrentUser] === undefined) {

                    delete editObject[key as keyof typePatchCurrentUser];

                }

            }

            if (Object.values(editObject).length === 1) {

                setIsInProgress(false);
                return;

            }

            try {

                const res = await patchUser(editObject).unwrap();

                dispatchAppT(userProfileActions.updateUserProfile(res));

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: i18n._(t`Profile changed successfully.`),
                }));

                const profileData = res;

                profileForm.setFieldValue('fullName', profileData.fullName ?? '');
                profileForm.setFieldValue('email', profileData.email ?? '');
                profileForm.setFieldValue('phone', profileData.phone ?? '');
                profileForm.setFieldValue('locale', getLocaleForProfile(profileData.userSettings));

            } catch (err) {

                errorHandlerForForm(err as typeResponseError, 'onEditCurrentUser', dispatchAppT, profileForm as unknown as typeReturnForm, mapRequestFieldsToFormField);
                setIsInProgress(false);

            }

        }
        setIsInProgress(false);

    };

    const onCancel = () => {
        const profileData = data?.actor;
        if (profileData) {

            profileForm.setFieldValue('fullName', profileData.fullName ?? '');
            profileForm.setFieldValue('email', profileData.email ?? '');
            profileForm.setFieldValue('phone', profileData.phone ?? '');
            profileForm.setFieldValue('locale', getLocaleForProfile(profileData.userSettings));
        }

    };

    return (
        <form onSubmit={ profileForm.onSubmit(onSave) }>

            <Flex className={ classes.flexColumn }>

                <FieldsetForForm title={ <Trans>Personal Information</Trans> }>
                    <TextInput
                        withAsterisk
                        label={ mapRequestFieldsToFormField.fullName.translatedValue }
                        placeholder={ i18n._(t`User name`) }
                        { ...profileForm.getInputProps('fullName') }
                        maxLength={ 150 }
                    />
                </FieldsetForForm>
                <FieldsetForForm title={ <Trans>Contacts</Trans> }>
                    <SimpleGrid cols={ 2 } className={ classes.formGrid }>
                        <PhoneInputWithCountrySelector
                            isRequired={ false }
                            { ...profileForm.getInputProps('phone') }
                            value={ profileForm.values.phone }
                            onChange={ (value: string) => profileForm.setFieldValue('phone', value) }
                        />
                        <TextInput
                            withAsterisk
                            label={ mapRequestFieldsToFormField.email.translatedValue}
                            placeholder="example@email.com"
                            { ...profileForm.getInputProps('email') }
                        />
                    </SimpleGrid>
                </FieldsetForForm>
            </Flex>
            <Space h={ 25 }/>

            <FieldsetForForm title={ <Trans>Settings</Trans> }>
                <SimpleGrid cols={ 2 } className={ classes.formGrid }>
                    <Select
                        label={ mapRequestFieldsToFormField.locale.translatedValue }
                        data={ locales }
                        transitionProps={ {
                            duration: 80,
                            timingFunction: 'ease'
                        } }
                        { ...profileForm.getInputProps('locale') }
                        rightSection={ <IconChevronDown size="1rem"/> }
                        styles={ {
                            rightSection: {
                                pointerEvents: 'none',
                                pointer: 'pointer',
                            },
                        } }
                        sx={ { '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' } } }

                    />
                </SimpleGrid>
            </FieldsetForForm>
            <Space h={ 42 }/>
            <Flex className={ classes.buttonsBar }>
                <Button key="cancel" type="reset" variant="outline" onClick={ onCancel }>{ t`Cancel` }</Button>
                <Button key="submit" disabled={ !!Object.values(profileForm.errors).length } type="submit">{ t`Save` }</Button>
            </Flex>


            { (isInProgress || isLoading || isFetching) && <LoaderOverlay/> }
        </form>
    );

};
