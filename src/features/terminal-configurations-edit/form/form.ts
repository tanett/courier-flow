import { t } from '@lingui/macro';
import { i18n } from '@lingui/core';
import { typeMapRequestFieldsToFormField } from 'app/utils/error-handler-for-form';

export const initialTerminalConfigurationsEditForm = {
    initialValues: {
        name: '',
        storeIds: [],
        terminalIds: [],
        productCategory: [],
        availableModules: []
    },
    validate: {
        name: (value: string) => {

            return value.trim().length === 0
                ? t`Required field`
                : value.trim().length > 250
                    ? t`It's too long`
                    : null;

        },

    },
};

export const mapRequestFieldsToFormFieldConfigurationsEdit:typeMapRequestFieldsToFormField = {
    name: {
        translatedValue: i18n._('item-name'),
        formField: 'name'
    },
    storeIds: {
        translatedValue: i18n._(t`Stores`),
        formField: 'storeIds'
    } ,
    terminalIds: {
        translatedValue:  i18n._(t`Terminals`),
        formField: 'terminalIds'

    },
    productCategoryIds: {
        translatedValue:   i18n._(t`Categories`),
        formField: 'productCategory'
    },
    availableModules: {
        translatedValue:   i18n._(t`Modules`),
        formField: 'availableModules'
    },

};
