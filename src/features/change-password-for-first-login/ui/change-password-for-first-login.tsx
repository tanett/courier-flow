import { Trans } from '@lingui/macro';
import { useStyles } from './styles';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { Alert, Box, Button, Flex, Image, PasswordInput, rem, Space, Text, Title } from '@mantine/core';
import { SupportLink } from 'shared/ui/support-link';
import { useNavigate } from 'react-router-dom';
import { initialChangePasswordForm } from '../forms/forms';
import { useChangePasswordMutation } from '../../../entities-project/user-profile/api/api';
import { WithPasswordHelper } from 'shared/ui/with-password-helper/with-password-helper';
import successIconUrl from '../../../shared/images/auth/success-restore.svg';
import { routerPaths } from 'app/config/router-paths';
import { EyeIcon, EyeSlashIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useAppDispatchT } from 'app/state';
import { authStateActions, typeFirstLoginData } from '../../../entities-project/auth/model/state-slice';
import { useLoginMutation } from '../../../entities-project/auth/api/api';
import { setLastLogins } from 'shared/ui/with-remember-login-helper/utils';
import { IconAlertTriangle } from '@tabler/icons-react';
import { Loader } from 'shared/ui/loader/loader';
import { setAuthSessionStorageDate } from 'features/login-user/helpers/setAuthSessionStorageDate';


export const ChangePasswordForFirstLogin: React.FC<typeFirstLoginData> = (oldData) => {

    const { classes } = useStyles();

    const dispatchApp = useAppDispatchT();

    const navigate = useNavigate();

    const form = useForm(initialChangePasswordForm);

    const [ isChangedPassword, setIsChangedPassword ] = useState(false);

    const [ changePassword, { isLoading, error: changeError } ] = useChangePasswordMutation();

    const [ auth, { isLoading: isLoginLoader, error } ] = useLoginMutation();


    const onLogin = async () => {

        try {

            const response = await auth({
                login: oldData.login.trim(),
                password: form.values.newPassword.trim(),

            }).unwrap();

            setAuthSessionStorageDate(response);

            setLastLogins(oldData.login);

            dispatchApp(authStateActions.changeAuth(true));

            navigate(routerPaths.dashboard, { replace: true });

        } catch (err) {

            navigate(routerPaths.login, { replace: true });
            console.log(err);

        }

        dispatchApp(authStateActions.deleteFirstLoginData());


    };

    const onChangePassword = async () => {

        try {

            await changePassword({
                newPassword: form.values.newPassword.trim(),
                login: oldData.login,
                oldPassword: oldData.password,
            }).unwrap();

            setIsChangedPassword(true);

        } catch (err) {

            console.log('ChangePasswordForFirstLogin.tsx 55:', err);

        }

    };

    return (
        <>
            <Title order={ 1 } className={ classes.title }>
                <Trans>Password changing</Trans>
            </Title>

            <Space h={ rem(26) }/>

            { isChangedPassword

                ?
                <Flex className={ classes.messageBlock }>
                    <Box className={ classes.messageIcon }>
                        <Image src={ successIconUrl } alt="mail"/>
                    </Box>
                    <Box w={ '100%' } mt={ '-12px' }>
                        <Text className={ classes.messageText }>
                            <Trans>Password changed successfully.</Trans><br/>
                            <Trans>You can log in.</Trans>
                        </Text>
                        <Button className={ classes.button } onClick={ onLogin }><Trans>Login</Trans></Button>

                        {error && 'status' in error && error.status === 401 && <Alert icon={<IconAlertTriangle size={rem(24)} />} className={classes.alert}>
                            Authorisation did not complete . Please try again or call support.
                        </Alert>}

                        {changeError && <Alert icon={<IconAlertTriangle size={rem(24)} />} className={classes.alert}>
                            Operation did not complete. Please try again or call support.
                        </Alert>}

                    </Box>
                    <Space h={ rem(6) }/>
                    { isLoginLoader && <Loader/> }
                </Flex>

                : <form onSubmit={ form.onSubmit(onChangePassword) } className={ classes.form }>


                    <Flex w={ '100%' } className={ classes.alert }>
                        <Box>
                            <InformationCircleIcon className={ classes.alertIcon }/>
                        </Box>
                        <Text className={ classes.alertText }>
                            <Trans>Authorization was successful!</Trans><br/>
                            <Trans>To continue, we ask you to change your password.</Trans>
                        </Text>
                    </Flex>
                    <Space h={ rem(24) }/>


                    <Flex className={ classes.flex }>
                        <Box className={ classes.passwordWrapper }>
                            <WithPasswordHelper password={ form.values.newPassword }>
                                <PasswordInput
                                    withAsterisk
                                    autoComplete="off"
                                    variant="default"
                                    label={ <Trans>New password</Trans> }
                                    size="md"
                                    { ...form.getInputProps('newPassword') }
                                    className={ classes.inputText }
                                    visibilityToggleIcon={ ({ reveal }) => reveal ? (
                                        <EyeIcon className={ classes.iconClass }/>
                                    ) : (
                                        <EyeSlashIcon className={ classes.iconClass }/>
                                    )
                                    }
                                    maxLength={ 50 }
                                />
                            </WithPasswordHelper>


                            <PasswordInput
                                withAsterisk
                                autoComplete="off"
                                variant="default"
                                label={ <Trans>Confirm password</Trans> }
                                size="md"
                                { ...form.getInputProps('confirmNewPassword') }
                                className={ classes.inputText }
                                visibilityToggleIcon={ ({ reveal }) => reveal ? (
                                    <EyeIcon className={ classes.iconClass }/>
                                ) : (
                                    <EyeSlashIcon className={ classes.iconClass }/>
                                )
                                }
                                maxLength={ 50 }
                            />
                        </Box>
                        <Button
                            className={ classes.button }
                            size="md"
                            type="submit"
                            disabled={ !!Object.values(form.errors).length }
                        >
                            <Trans>Change password</Trans>
                        </Button>

                    </Flex>
                    <Space h={ rem(40) }/>
                    { (isLoading || isLoginLoader) && <Loader/> }

                </form> }

            <SupportLink/>

        </>);

};
