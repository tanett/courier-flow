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
import { Link, } from 'react-router-dom';
import { useStyles } from 'pages/login-page/ui/styles';
import { typeFormLogin, typeLoginForm } from '../types/types';
import { useForm } from '@mantine/form';
import { initialLoginForm } from '../forms/forms';
import { useAppDispatchT } from 'app/state';
import {  setAuthTerminalSessionStorageDate } from '../helpers/setAuthSessionStorageDate';
import { routerPaths } from 'app/config/router-paths';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useLingui } from '@lingui/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useLazyGetBundleQuery } from 'entities-project/bundle/api/api';
import { bundleStateActions } from 'entities-project/bundle/model/state-slice';
import { useLoginTerminalMutation } from 'entities-project/auth/api/api';


export const LoginFormTerminal: React.FC<typeLoginForm> = ({ setStep }) => {

    const { classes } = useStyles();

    const dispatchApp = useAppDispatchT();

    const { i18n } = useLingui();

    const loginForm = useForm<typeFormLogin>(initialLoginForm);

    const [ login, {
        isLoading,
        error
    } ] = useLoginTerminalMutation();
    const [ getBundle, { isFetching: isGetBundleLoading } ] = useLazyGetBundleQuery();

    useEffect(() => {

        if (Object.values(loginForm.errors).length) {

            loginForm.clearErrors();

        }

    }, [ loginForm.values.password, loginForm.values.login ]);

    useEffect(() => {

        if (error && 'status' in error && error.status === 401) {

            loginForm.setErrors({
                login: true,
                password: true
            });

        }

    }, [ error ]);

    const onLogin = async () => {

        try {

            const response = await login({
                login: loginForm.values.login.trim(),
                password: loginForm.values.password.trim(),

            }).unwrap();

            setAuthTerminalSessionStorageDate(response);

            const bundle = await getBundle(response.accessToken).unwrap();

            dispatchApp(bundleStateActions.setBundle(bundle));

            setStep();

        } catch (err) {

                console.log(err);

        }

    };

    return (

        <form onSubmit={ loginForm.onSubmit(onLogin) } className={ classes.form }>

            <Flex className={ classes.flex }>
                <TextInput
                    id="serial number"
                    size="md"
                    type="serial number"
                    label={ <Trans>Serial number</Trans> }
                    placeholder="example@email.com"
                    { ...loginForm.getInputProps('login') }
                    className={ classes.inputText }
                    data-testid="serial number"
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
                        placeholder={ i18n._(t`Password`) }
                        autoComplete="on"
                        { ...loginForm.getInputProps('password') }
                        className={ classes.inputText }
                        data-testid="password"
                        visibilityToggleIcon={ ({ reveal }) => reveal ? (
                            <EyeIcon className={ classes.iconClass }/>
                        ) : (
                            <EyeSlashIcon className={ classes.iconClass }/>
                        )
                        }
                    />
                </Box>

                { error && 'status' in error && error.status === 401 && <Alert icon={ <IconAlertTriangle size={ rem(24) }/> } className={ classes.alert }>
                    Your serial number or password is filled in incorrectly. Please try again.
                </Alert> }

                <Button
                    className={ classes.button }
                    type="submit"
                    disabled={ !!Object.values(loginForm.errors).length }
                    data-testid="singin-button"
                >
                    <Trans>Login</Trans>
                </Button>

            </Flex>

            { (isGetBundleLoading || isLoading) && <LoaderOverlay/> }

        </form>

    );

};
