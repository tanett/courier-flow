import React from 'react';
import { RestorePassword } from '../../../features/restore-password';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';

const RestorePasswordPage: React.FC = () => {

    const { i18n } = useLingui();
    return (
        <RestorePassword formTitle={i18n._(t`Password recovery`)}/>
    );

};

export default RestorePasswordPage;
