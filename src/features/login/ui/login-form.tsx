import { t, Trans } from '@lingui/macro';
import {
    Alert,
    Box,
    Button,
    Flex, PasswordInput, rem,
    Space,
    TextInput,
    Title,
} from '@mantine/core';
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLazyGetCurrentUserQuery } from '../../../entities/user-profile/api/api';
import { useStyles } from './styles';
import { typeFormLogin, typeLoginForm } from '../types/types';
import { useForm } from '@mantine/form';
import { initialLoginForm } from '../forms/forms';
import { useAppDispatchT } from 'app/state';
import { setAuthSessionStorageDate } from '../helpers/setAuthSessionStorageDate';
import { authStateActions } from '../../../entities/auth/model/state-slice';
import { routerPaths } from 'app/config/router-paths';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { SupportLink } from 'shared/ui/support-link';
import { useLoginMutation } from '../../../entities/auth/api/api';
import { IconAlertTriangle } from '@tabler/icons-react';
import { setLastLogins } from 'shared/ui/with-remember-login-helper/utils';
import { useLingui } from '@lingui/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { typeResponseError } from 'app/api/types';


export const LoginForm: React.FC<typeLoginForm> = ({ formTitle }) => {

    const { classes } = useStyles();

    const dispatchApp = useAppDispatchT();

    const { i18n } = useLingui();

    const rememberLogin = localStorage.getItem('rememberedLogin');

    if (rememberLogin) {

        initialLoginForm.initialValues.login = rememberLogin;

    }

    const loginForm = useForm<typeFormLogin>(initialLoginForm);

    const location = useLocation();
    const navigate = useNavigate();

    const fromPage = location.state?.fromPage ?? routerPaths.dashboard;

    const [ login, { isLoading, error } ] = useLoginMutation();
    const [ , { isFetching: isGetUserLoading } ] = useLazyGetCurrentUserQuery();

    useEffect(() => {

        if (Object.values(loginForm.errors).length) {

            loginForm.clearErrors();

        }

    }, [ loginForm.values.password, loginForm.values.login ]);

    useEffect(() => {

        if (error && 'status' in error && error.status === 401) {

            loginForm.setErrors({ login: true, password: true });

        }

    }, [ error ]);

    const onLogin = async () => {

        try {

            const response = await login({
                login: loginForm.values.login.trim(),
                password: loginForm.values.password.trim(),

            }).unwrap();

            setAuthSessionStorageDate(response);

            setLastLogins(loginForm.values.login);

            navigate(fromPage, { replace: true });

            dispatchApp(authStateActions.changeAuth(true));

        } catch (err) {

            if ((err as typeResponseError).status === 403
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore    todo fix it
                && (err as typeResponseError).data?.errorCode === 'validation.authorization.by-temporary-password'){

                dispatchApp(authStateActions.setFirstLoginData({
                    login: loginForm.values.login.trim(),
                    password: loginForm.values.password.trim(),
                }));

                navigate(routerPaths.firstLogin, { replace: true });

            } else {

                console.log(err);

            }

        }

    };

    return (
        <>

            <Title order={ 1 } className={ classes.title }>
                { formTitle }
            </Title>

            <Space h={ rem(30) }/>

            <form onSubmit={ loginForm.onSubmit(onLogin) } className={ classes.form }>

                <Flex className={ classes.flex }>
                    <TextInput
                        id="login"
                        size="md"
                        type="email"
                        label={ <Trans>Email</Trans> }
                        placeholder="example@email.com"
                        { ...loginForm.getInputProps('login') }
                        className={ classes.inputText }
                        data-testid="login"
                        maxLength={ 50 }
                    />
                    <Box className={ classes.passwordWrapper }>
                        <Link to={ routerPaths.forgotPassword } className={ `${ classes.forgotLink } ${ classes.link }` }>
                            <Trans>Forgot password?</Trans>
                        </Link>
                        <PasswordInput
                            id="password"
                            size="md"
                            label={ <Trans>Password</Trans> }
                            variant="default"
                            placeholder={i18n._(t`Password`)}
                            autoComplete="on"
                            { ...loginForm.getInputProps('password') }
                            className={ classes.inputText }
                            data-testid="password"
                            visibilityToggleIcon={({ reveal }) => reveal ? (
                                <EyeIcon className={classes.iconClass}/>
                            ) : (
                                <EyeSlashIcon className={classes.iconClass}/>
                            )
                            }
                        />
                    </Box>

                    {error && 'status' in error && error.status === 401 && <Alert icon={<IconAlertTriangle size={rem(24)} />} className={classes.alert}>
                        Your email or password is filled in incorrectly. Please try again.
                    </Alert>}

                    <Button
                        className={classes.button}
                        type="submit"
                        disabled={ !!Object.values(loginForm.errors).length }
                        data-testid="singin-button"
                    >
                        <Trans>Login</Trans>
                    </Button>

                </Flex>

                { (isGetUserLoading || isLoading) && <LoaderOverlay/> }

            </form>

            <Space h={ rem(40) }/>

            <SupportLink/>

        </>
    );

};
