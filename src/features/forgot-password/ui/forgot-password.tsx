import { Trans } from '@lingui/macro';
import { typeResponseError } from '../../../app/api/types';
import { typeForgotPasswordForm, typeFormForgotPassword } from '../types/types';
import { useStyles } from './styles';
import { initialForgotPasswordForm } from '../forms/forms';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { Box, Button, Flex, Image, rem, Space, Text, TextInput, Title } from '@mantine/core';
import { LoaderOverlay } from '../../../shared/ui/loader-overlay';
import { SupportLink } from '../../../shared/ui/support-link';
import { useLazyAskEmailToPasswordQuery } from '../../../entities-project/user-profile/api/api';
import iconUrl from '../../../shared/images/auth/sent-mail.svg';


export const ForgotPassword: React.FC<typeForgotPasswordForm> = ({ formTitle }) => {

    const { classes } = useStyles();

    const form = useForm<typeFormForgotPassword>(initialForgotPasswordForm);

    const [ isSentMail, setIsSentMail ] = useState(false);

    const [ askEmailToPassword, { isFetching } ] = useLazyAskEmailToPasswordQuery();

    const onRecoveryPassword = async () => {

        try {

            await askEmailToPassword({ email: form.values.email.trim() }).unwrap();
            setIsSentMail(true);

        } catch (err) {

            if ((err as typeResponseError).status === 400) {

                form.setErrors({ email: <Trans>Check if email is correct</Trans> });

            } else {

                console.log('change-password-for-first-login.tsx 40:', err);

            }

        }

    };


    return (
        <>
            <Title order={1} className={classes.title}>
                {formTitle}
            </Title>

            <Space h={rem(26)}/>

            {isSentMail

                ? <Flex className={ classes.messageBlock }>
                    <Box className={ classes.messageIcon }>
                        <Image src={iconUrl} alt="mail"/>
                    </Box>
                    <Box>
                        <Text className={ classes.messageText }>
                            <Trans>The email has been sent to the email address you provided to reset your password. Check your email and follow the instructions in the email.</Trans>
                        </Text>
                    </Box>
                </Flex>

                : <form onSubmit={form.onSubmit(onRecoveryPassword)} className={classes.form}>

                    <Flex className={classes.flex}>
                        <TextInput
                            withAsterisk
                            size="md"
                            label={ <Trans>Email</Trans> }
                            placeholder="example@email.com"
                            {...form.getInputProps('email')}
                            className={classes.inputText}
                            maxLength={100}
                        />
                        <Button
                            size="md"
                            type="submit"
                            className={classes.button}
                        >
                            <Trans>Restore password</Trans>
                        </Button>
                    </Flex>

                    <Space h={rem(40)}/>

                    { isFetching && <LoaderOverlay/> }

                </form>
            }


            <SupportLink/>

        </>
    );

};
