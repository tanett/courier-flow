import { Trans } from '@lingui/macro';
import { typeResponseError } from '../../../app/api/types';
import { useStyles } from './styles';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { Box, Button, Flex, Image, PasswordInput, rem, Space, Text, Title } from '@mantine/core';
import { LoaderOverlay } from '../../../shared/ui/loader-overlay';
import { SupportLink } from '../../../shared/ui/support-link';
import { typeRestorePasswordForm } from '../types/types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { initialRestorePasswordForm } from '../forms/forms';
import { useChangePasswordMutation } from '../../../entities-project/user-profile/api/api';
import { WithPasswordHelper } from '../../../shared/ui/with-password-helper/with-password-helper';
import errorIconUrl from '../../../shared/images/auth/error-link.svg';
import successIconUrl from '../../../shared/images/auth/success-restore.svg';
import { routerPaths } from '../../../app/config/router-paths';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';


export const RestorePassword: React.FC<typeRestorePasswordForm> = ({ formTitle }) => {

    const { classes } = useStyles();

    const [ searchParams ] = useSearchParams();

    const navigate = useNavigate();

    const [ token, setToken ] = useState<string | null>(searchParams.get('code'));

    const form = useForm(initialRestorePasswordForm);

    const [ isChangedPassword, setIsChangedPassword ] = useState(false);

    const [ changePassword, { isLoading } ] = useChangePasswordMutation();

    const onRestorePassword = async () => {

        try {

            if (token) {

                await changePassword({ confirmationCode: token, newPassword: form.values.newPassword.trim() }).unwrap();

                setIsChangedPassword(true);

            }

        } catch (err) {

            if ((err as typeResponseError).status === 401) {

                setToken(null);

            } else {

                console.log('ChangePasswordForFirstLogin.tsx 69:', err);

            }

        }

    };

    const onForgotPassword = () => {

        navigate(routerPaths.forgotPassword, { replace: true });

    };

    const onLogin = () => {

        navigate(routerPaths.login, { replace: true });

    };


    return (
        <>
            <Title order={1} className={classes.title}>
                {formTitle}
            </Title>

            <Space h={rem(26)}/>

            { token
                ? isChangedPassword

                    ?
                    <Flex className={ classes.messageBlock }>
                        <Box className={ classes.messageIcon }>
                            <Image src={successIconUrl} alt="mail"/>
                        </Box>
                        <Box w={'100%'} mt={'-12px'}>
                            <Text className={ classes.messageText }>
                                <Trans>Password changed successfully.</Trans><br/>
                                <Trans>You can log in.</Trans>
                            </Text>
                            <Button className={classes.button} onClick={onLogin}><Trans>Login</Trans></Button>
                        </Box>
                        <Space h={rem(6)}/>
                    </Flex>

                    : <form onSubmit={form.onSubmit(onRestorePassword)} className={classes.form}>

                        <Flex className={classes.flex}>
                            <Box className={ classes.passwordWrapper }>
                                <WithPasswordHelper password={form.values.newPassword}>
                                    <PasswordInput
                                        withAsterisk
                                        autoComplete="off"
                                        variant="default"
                                        label={ <Trans>New password</Trans> }
                                        size="md"
                                        {...form.getInputProps('newPassword')}
                                        className={classes.inputText}
                                        visibilityToggleIcon={({ reveal }) => reveal ? (
                                            <EyeIcon className={classes.iconClass}/>
                                        ) : (
                                            <EyeSlashIcon className={classes.iconClass}/>
                                        )
                                        }
                                        maxLength={50}
                                    />
                                </WithPasswordHelper>


                                <PasswordInput
                                    withAsterisk
                                    autoComplete="off"
                                    variant="default"
                                    label={ <Trans>Confirm password</Trans> }
                                    size="md"
                                    {...form.getInputProps('confirmNewPassword')}
                                    className={classes.inputText}
                                    visibilityToggleIcon={({ reveal }) => reveal ? (
                                        <EyeIcon className={classes.iconClass}/>
                                    ) : (
                                        <EyeSlashIcon className={classes.iconClass}/>
                                    )
                                    }
                                    maxLength={50}
                                />
                            </Box>
                            <Button
                                className={classes.button}
                                size="md"
                                type="submit"
                                disabled={!!Object.values(form.errors).length}
                            >
                                <Trans>Change password</Trans>
                            </Button>

                        </Flex>
                        <Space h={rem(40)}/>
                        { isLoading && <LoaderOverlay/> }

                    </form>

                : <Flex className={ classes.messageBlock }>
                    <Box className={ classes.messageIcon }>
                        <Image src={errorIconUrl} alt="mail"/>
                    </Box>
                    <Box>
                        <Text className={ classes.messageText }>
                            <Trans>Invalid password restore link. Request a password restore link again.</Trans>
                        </Text>
                        <Button className={classes.button} onClick={onForgotPassword}><Trans>Restore password</Trans></Button>
                    </Box>
                </Flex>

            }


            <SupportLink/>

        </>
    );

};
