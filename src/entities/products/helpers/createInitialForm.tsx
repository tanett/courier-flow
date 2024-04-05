import { PRODUCT_ADDITIONAL_FIELD, typeProductAdditionalFieldInfo } from 'entities/products/model/state-slice';
import { typeProductForm } from 'features/product-create/types/types';
import { t } from '@lingui/macro';
import { initialProductForm } from 'features/product-create/form/form';

export const createInitialFormHelper = (additionalFieldsList: typeProductAdditionalFieldInfo[]) => {

    const additionalFieldsObject: Record<string, {type: PRODUCT_ADDITIONAL_FIELD, value: string} > = {};
    const additionalFieldsValidateObj: Record<string, { value: (value: string, values: typeProductForm) => string | null }> = {};

    additionalFieldsList.forEach((item) => {

        additionalFieldsObject[ item.code ] = {
            type: item.code,
            value: '',
        };

        additionalFieldsValidateObj[ item.code ] = {
            value: (value: string, values: typeProductForm) => {

                return value.trim().length === 0
                    ? item.required ? t`Required field` : null
                    : RegExp(item.pattern).test(value)
                        ? null : t`Invalid format`;


            },
        };

    });

    return {
        initialValues: {
            ...initialProductForm.initialValues,
            productAdditionalFields: additionalFieldsObject,
        },
        validate: {
            ...initialProductForm.validate,
            productAdditionalFields: additionalFieldsValidateObj,
        },
    };

};
