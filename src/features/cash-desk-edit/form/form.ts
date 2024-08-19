import { t } from '@lingui/macro';
import { i18n } from '@lingui/core';
import { typeMapRequestFieldsToFormField } from 'app/utils/error-handler-for-form';

export const initialCashDeskEditForm = {
    initialValues: { name: '', storeId: null, amount: '0' },
    validate: {
        name: (value: string) => {

            return value.trim().length === 0
                ? t`Required field`
                : value.trim().length > 150
                    ? t`It's too long`
                    : null;

        },
        amount: (value: string) => {

            return +value < 0
                ? t`The value must be more than 0`
                : +value > 1000000000
                    ? t`It's too match`
                    : null;

        },
        storeId: (value: string | null) => {

            return value === null
                ? t`Required field`
                : null;

        },
    },
};

export const mapRequestFieldsToFormFieldCashDesk:typeMapRequestFieldsToFormField = {
    name: {
        translatedValue: i18n._('item-name' ),
        formField: 'name'
    },
    storeId: {
        translatedValue:   i18n._(t`Store`),
        formField: 'storeId'
    },
    amount: {
        translatedValue:   i18n._(`amount-rest`),
        formField: 'amount'
    },
};
