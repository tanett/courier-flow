import React from 'react';
import { ForgotPassword } from '../../../features/forgot-password';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';

const ForgotPasswordPage: React.FC = () => {

    const { i18n } = useLingui();
    return (
        <ForgotPassword formTitle={ i18n._(t`Password recovery`) } />
    );

};

export default ForgotPasswordPage;
