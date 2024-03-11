import { t } from '@lingui/macro';


export const initialUsersCreateForm = {
    initialValues: {
        fullName: '',
        email: '',
        phone: '',
        roleId: '',
    },
    validate: {
        fullName: (value: string) => {

            return value.trim().length === 0
                ? t`Required field`
                : value.trim().length > 150
                    ? t`It's too long`
                    : null;

        },
        email: (value: string) => {

            return value.trim().length <= 0
                ? t`Required field`
                : value.trim().length >= 100
                    ? t`It's too long`
                    : /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(value)
                        ? null
                        : t`Invalid email`;

        },
        phone: (value: string) => {

            return value.length > 13
                ? t`Invalid phone number format`
                : null;

        },
        roleId: (value: string) => {

            return value.trim().length === 0
                ? t`Required field`
                : null;

        },
    },
};
