import { t } from '@lingui/macro';
import { PRODUCT_UNIT_VALUE } from 'entities/products/model/state-slice';
import { i18n } from '@lingui/core';
import { typeMapRequestFieldsToFormField } from 'app/utils/error-handler-for-form';


export const initialProductForm = {
    initialValues: {
        name: '',
        productCategoryId: '',
        unit: undefined,
        marked: false,
        vat: '',
        barcodes: [],
        productAdditionalFields: {},

    },
    validate: {
        name: (value: string) => {

            return value.trim().length === 0
                ? t`Required field`
                : value.trim().length > 150
                    ? t`It's too long`
                    : null;

        },
        unit: (value: PRODUCT_UNIT_VALUE | undefined) => {

            return !value
                ? t`Required field`
                : null;

        },
        vat: (value: string) => {

            return value.trim() === ''
                ? t`Required field`
                : +value.trim() > 100
                    ? t`Too match`
                    : null;

        },

    },
};

export const mapRequestFieldsToFormFieldProducts:typeMapRequestFieldsToFormField = {
    name: {
        translatedValue: i18n._(t`Product name`),
        formField: 'name'
    },
    productCategoryId: {
        translatedValue: i18n._(t`Category`),
        formField: 'productCategoryId'
    } ,
    unit: {
        translatedValue:  i18n._(t`Unit`),
        formField: 'unit'

    },
    marked: {
        translatedValue:   i18n._(t`Marked`),
        formField: 'marked'
    },
    vat: {
        translatedValue:   i18n._(t`Vat in %`),
        formField: 'vat'
    },
    barcodes: {
        translatedValue:   i18n._(t`Barcodes`),
        formField: 'barcodes'
    },

};
