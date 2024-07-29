import { t } from '@lingui/macro';
import { isValidPhoneNumberByLength } from 'shared/utils/isValidPhoneNumber';


export const initialUsersEditForm = {
    initialValues: {
        fullName: '',
        email: '',
        phone: '',
        roleId: '',
        // storeIds: [],
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
                    : /^[^@ \t\r\n]+@[^@ \t\r\n]+\.([^@ \t\r\n]+){2,6}$/.test(value)
                        ? null
                        : t`Invalid email`;

        },
        phone: (value: string) => {

            return value !== ''
                ? isValidPhoneNumberByLength(value) ? null : t`Invalid phone number format`
                : null;

        },
        roleId: (value: string) => {

            return value.trim().length === 0
                ? t`Required field`
                : null;

        },
    },
};
