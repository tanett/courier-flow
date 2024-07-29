import { t } from '@lingui/macro';
import { isValidPhoneNumberByLength } from 'shared/utils/isValidPhoneNumber';
import { i18n } from '@lingui/core';
import { typeMapRequestFieldsToFormField } from 'app/utils/error-handler-for-form';


export const initialUsersEditForm = {
    initialValues: {
        fullName: '',
        email: '',
        phone: '',
        roleId: '',
        storeIds: [],
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

export const mapRequestFieldsToFormFieldUsersEdit:typeMapRequestFieldsToFormField = {
    fullName: {
        translatedValue: i18n._(t`Full name`),
        formField: 'fullName'
    },
    email: {
        translatedValue: i18n._(t`Email`),
        formField: 'email'
    } ,
    phone: {
        translatedValue:  i18n._(t`Phone`),
        formField: 'phone'

    },
    roleId: {
        translatedValue:   i18n._(t`Role`),
        formField: 'roleId'
    },
    storeIds: {
        translatedValue:   i18n._(t`Stores`),
        formField: 'storeIds'
    },

};
