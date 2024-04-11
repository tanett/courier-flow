import { t } from '@lingui/macro';

export type typeAddRetailProductToStoreForm = {
    storeId:string | null,
    price: string | null,
}

export const initialForm = {
    initialValues: { storeId: null, price: null },
    validate: {
        storeId: (value: string | null) => {

            return (!value || value.trim() === '')
                ? t`Required field`
                : null;

        },
        price: (value: string | null) => {

            return (!value || value === '')
                ? t`Required field`
                : null;

        },
    },
};
