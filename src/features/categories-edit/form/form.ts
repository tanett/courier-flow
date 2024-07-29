import { t } from '@lingui/macro';
import { i18n } from '@lingui/core';
import { typeMapRequestFieldsToFormField } from 'app/utils/error-handler-for-form';

export const initialCategoryEditForm = {
    initialValues: { name: '' },
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

export const mapRequestFieldsToFormFieldCategoryEdit:typeMapRequestFieldsToFormField = {
    name: {
        translatedValue: i18n._('item-name' ),
        formField: 'name'
    },
};
