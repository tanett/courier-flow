import { t } from '@lingui/macro';
import { LANGUAGES } from '../../../app/config/languages';
import { isValidPhoneNumberByLength } from 'shared/utils/isValidPhoneNumber';


export const initialProfileForm = {
    initialValues: {
        fullName: '',
        email: '',
        phone: '',
        locale: LANGUAGES.EN,
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

            return value.trim().length === 0
                ? t`Required field`
                : value.length > 100
                    ? t`It's too long`
                    : null;

        },
        phone: (value: string) => {

            return value.trim().length === 0
                ? null
                : isValidPhoneNumberByLength(value) ? null : t`Invalid phone number format`;

        },
        locale: (value: string) => {

            return value.trim().length === 0
                ? t`Required field`
                : null;

        },
    },
};
