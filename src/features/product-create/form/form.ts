import { t } from '@lingui/macro';
import { PRODUCT_UNIT_VALUE, PRODUCT_ADDITIONAL_FIELD } from 'entities/products/model/state-slice';


export const initialProductForm = {
    initialValues: {
        name: '',
        productCategoryId: '',
        unit: undefined,
        marked: false,
        vat: 0,
        barcodes: [],

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
                : null

        },
        vat: (value: number) => {

            return value === null
                ? t`Required field`
                : null

        },

    },
};
