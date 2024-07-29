import { t } from '@lingui/macro';
import { STORE_TYPE } from '../../../entities/stores/model/types';
import { isValidPhoneNumberByLength } from 'shared/utils/isValidPhoneNumber';
import { i18n } from '@lingui/core';
import { typeMapRequestFieldsToFormField } from 'app/utils/error-handler-for-form';

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
                    : /^[^@ \t\r\n]+@[^@ \t\r\n]+\.([^@ \t\r\n]+){2,6}$/.test(value)
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

export const mapRequestFieldsToFormFieldStores:typeMapRequestFieldsToFormField = {
    name: {
        translatedValue: i18n._('item-name'),
        formField: 'name'
    },
    email: {
        translatedValue: i18n._(t`Email`),
        formField: 'email'
    } ,
    phoneNumber: {
        translatedValue:  i18n._(t`Phone number`),
        formField: 'phoneNumber'

    },
    description: {
        translatedValue:   i18n._(t`Description`),
        formField: 'description'
    },
    type: {
        translatedValue:   i18n._(t`Store type`),
        formField: 'type'
    },

};
