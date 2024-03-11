import { t } from '@lingui/macro';
import { typeFormForgotPassword } from '../types/types';

export const InitialForgotPasswordFormObj: typeFormForgotPassword = { email: '' };

export const initialForgotPasswordForm = {
    initialValues: InitialForgotPasswordFormObj,
    validate: {
        email: (value: string) => {

            return value.length <= 0
                ? t`Required field`
                : value.length > 50
                    ? t`It's too long`
                    : /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(value)
                        ? null
                        : t`Invalid email`;

        },
    },
};
