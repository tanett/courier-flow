import { t } from '@lingui/macro';


export const initialLoginForm = {
    initialValues: {
        login: '',
        password: '',
    },
    validate: {
        login: (value: string) => {

            return value.trim().length <= 0
                ? t`Required field`
                : value.trim().length > 50
                    ? t`It's too long`
                    : null;

        },
        password: (value: string) => {

            return value.trim().length <= 0
                ? t`Required field`
                : value.length > 50
                    ? t`It's too long`
                    : null;

        },
    },
};
