import React, { useEffect, useState } from 'react';
import { useStyles } from './styles';
import { useForm } from '@mantine/form';
import { typeProfileForm } from '../types/types';
import { initialProfileForm } from '../form/form';
import { useAppDispatchT, useSelectorT } from 'app/state';
import { LANGUAGES, locales } from 'app/config/languages';
import { Button, Flex, Select, SimpleGrid, Space, TextInput } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { errorHandler } from 'app/utils/errorHandler';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { typePatchCurrentUser } from '../../../entities/user-profile/api/types';
import { notificationActions } from '../../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { typeResponseError } from 'app/api/types';
import { userProfileActions } from '../../../entities/user-profile/model/state-slice';
import { convertPhoneNumberToStringForApi } from 'shared/utils/convertPhoneNumbertoString';
import { usePatchCurrentUserMutation } from '../../../entities/user-profile/api/api';
import { FieldsetForForm } from 'shared/ui/fieldset-for-form';
import { PhoneInputWithCountrySelector } from 'shared/ui/phone-input';
import { IconChevronDown } from '@tabler/icons-react';


export const Profile: React.FC = () => {

    const { classes } = useStyles();

    const { i18n } = useLingui();

    const dispatchAppT = useAppDispatchT();

    const profileData = useSelectorT(state => state.userProfile.userProfile?.actor);

    const profileForm = useForm<typeProfileForm>(initialProfileForm);


    useEffect(() => {

        if (profileData) {

            profileForm.setFieldValue('fullName', profileData.fullName ?? '');
            profileForm.setFieldValue('email', profileData.email ?? '');
            profileForm.setFieldValue('phone', profileData.phone ?? '');
            profileForm.setFieldValue('locale', profileData.userSettings?.locale || LANGUAGES.EN);

        }

    }, [ profileData ]);

    const [ patchUser, { isLoading } ] = usePatchCurrentUserMutation();
    const [ isInProgress, setIsInProgress ] = useState(false);
    const onSave = async () => {

        setIsInProgress(true);

        if (profileData) {

            const editObject: typePatchCurrentUser = {
                id: profileData.id,
                fullName: profileForm.values.fullName.trim() === profileData.fullName ? undefined : profileForm.values.fullName.trim(),
                email: profileForm.values.email.trim() === profileData.email ? undefined : profileForm.values.email.trim(),
                phone: convertPhoneNumberToStringForApi(profileForm.values.phone) === profileData.phone ? undefined : convertPhoneNumberToStringForApi(profileForm.values.phone),
                userSettings: profileForm.values.locale === profileData?.userSettings?.locale ? undefined : { locale: profileForm.values.locale as LANGUAGES },
            };

            for (const key of Object.keys(editObject)){

                if (editObject[ key as keyof typePatchCurrentUser ] === undefined){

                    delete editObject[ key as keyof typePatchCurrentUser ];

                }

            }

            if (Object.values(editObject).length === 1){

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


            } catch (err) {

                errorHandler(err as typeResponseError, 'onEditCurrentUser', dispatchAppT);
                setIsInProgress(false);

            }

        }
        setIsInProgress(false);

    };

    const onCancel = () => {

        if (profileData) {

            profileForm.setFieldValue('fullName', profileData.fullName ?? '');
            profileForm.setFieldValue('email', profileData.email ?? '');
            profileForm.setFieldValue('phone', profileData.phone ?? '');
            profileForm.setFieldValue('locale', profileData.userSettings?.locale || LANGUAGES.EN);

        }

    };

    return (
        <form onSubmit={profileForm.onSubmit(onSave)}>

            <Flex className={classes.flexColumn}>

                <FieldsetForForm title={<Trans>Personal Information</Trans>}>
                    <TextInput
                        withAsterisk
                        label={<Trans>Full name</Trans>}
                        placeholder={i18n._(t`User name`)}
                        {...profileForm.getInputProps('fullName')}
                        maxLength={150}
                    />
                </FieldsetForForm>
                <FieldsetForForm title={<Trans>Contacts</Trans>}>
                    <SimpleGrid cols={2} className={classes.formGrid}>
                        <PhoneInputWithCountrySelector
                            isRequired={false}
                            {...profileForm.getInputProps('phone')}
                            value={ profileForm.values.phone }
                            onChange={(value: string) => profileForm.setFieldValue('phone', value)}
                        />
                        <TextInput
                            withAsterisk
                            label={<Trans>Email</Trans>}
                            placeholder="example@email.com"
                            {...profileForm.getInputProps('email')}
                        />
                    </SimpleGrid>
                </FieldsetForForm>
            </Flex>
            <Space h={25}/>

            <FieldsetForForm title={<Trans>Settings</Trans>}>
                <SimpleGrid cols={2} className={classes.formGrid}>
                    <Select
                        label={<Trans>Interface language</Trans>}
                        data={locales}
                        transitionProps={{ duration: 80, timingFunction: 'ease' }}
                        {...profileForm.getInputProps('locale')}
                        rightSection={ <IconChevronDown size="1rem"/> }
                        sx={{ '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' } }}

                    />
                </SimpleGrid>
            </FieldsetForForm>
            <Space h={42}/>
            <Flex className={classes.buttonsBar}>
                <Button key="cancel" type="reset" variant="outline" onClick={onCancel}>{t`Cancel`}</Button>
                <Button key="submit" disabled={!!Object.values(profileForm.errors).length} type="submit">{t`Save`}</Button>
            </Flex>


            {(isInProgress || isLoading) && <LoaderOverlay/>}
        </form>
    );

};
