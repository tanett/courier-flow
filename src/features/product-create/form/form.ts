import { t } from '@lingui/macro';
import { PRODUCT_UNIT_VALUE, PRODUCT_ADDITIONAL_FIELD } from 'entities/products/model/state-slice';


export const initialProductForm = {
    initialValues: {
        name: '',
        productCategoryId: '',
        unit: undefined,
        marked: false,
        vat: '',
        barcodes: [],
        productAdditionalFields: {}

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
