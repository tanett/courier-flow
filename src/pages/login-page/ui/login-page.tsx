import React from 'react';
import { LoginFormUser } from 'features/login-user';
import { useLingui } from '@lingui/react';
import { LoginFormTerminal } from 'features/login-terminal/ui/login-form-terminal';
import { Flex, rem, Space, Title } from '@mantine/core';
import { SupportLink } from 'shared/ui/support-link';
import { useStyles } from 'pages/login-page/ui/styles';
import { CalculatorIcon, UserIcon } from '@heroicons/react/24/outline';


const LoginPage: React.FC = () => {

    const { i18n } = useLingui();
    const { classes } = useStyles();

    const [ step, setStep ] = React.useState<'terminal' | 'user'>('terminal');


    return (<>
            <Flex align={ 'center' } gap={ 10 } direction={ 'column' }>

                <Title order={ 1 } className={ classes.title }>
                    { step === 'user' ? 'Login user' : 'Login Terminal' }
                </Title>

                { step === 'user' ? <UserIcon className={ classes.iconTitle }/> : <CalculatorIcon className={ classes.iconTitle }/> }

            </Flex>
            <Space h={ rem(30) }/>

            { step === 'terminal' && <LoginFormTerminal setStep={ () => setStep('user') }/> }
            { step === 'user' && <LoginFormUser/> }

            <Space h={ rem(40) }/>

            <SupportLink/>

        </>

    );

};

export default LoginPage;
