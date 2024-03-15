import { t } from '@lingui/macro';
import { STORE_TYPE } from '../../../entities/stores/model/types';
import { isValidPhoneNumberByLength } from 'shared/utils/isValidPhoneNumber';

export const initialStoreEditForm = {
    initialValues: {
        name: '',
        phoneNumber: '',
        email: '',
        description: '',
        type: STORE_TYPE.OTHER,
    },
    validate: {
        name: (value: string) => {

            return value.trim().length === 0
                ? t`Required field`
                : value.trim().length > 150
                    ? t`It's too long`
                    : null;

        },
        email: (value: string) => {

            return value.trim().length !== 0
                ? value.trim().length >= 100
                    ? t`It's too long`
                    : /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(value)
                        ? null
                        : t`Invalid email`
                : null;

        },
        phoneNumber: (value: string) => {

            return value !== ''
                ? isValidPhoneNumberByLength(value) ? null : t`Invalid phone number format`
                : null;

        },

        description: (value: string) => {

            return value.trim().length === 0
                ? null
                : value.trim().length > 500
                    ? t`It's too long`
                    : null;

        },
        type: (value: STORE_TYPE) => {

            return value ? null : t`Required field`;

        },
    },
};
