import React from 'react';
import { t } from '@lingui/macro';
import { LoginForm } from 'features/login';
import { useLingui } from '@lingui/react';


const LoginPage: React.FC = () => {

    const { i18n } = useLingui();
    return (
        <LoginForm formTitle={i18n._(t`Authorization`)}/>
    );

};

export default LoginPage;
