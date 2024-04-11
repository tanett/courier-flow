import { t } from '@lingui/macro';

export type typeEditRetailProductToStoreForm = {
    price: string | null,
}

export const initialForm = {
    initialValues: {  price: null },
    validate: {
        price: (value: string | null) => {

            return (!value || value === '')
                ? t`Required field`
                : null;

        },
    },
};
