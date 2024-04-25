import { t } from '@lingui/macro';

export type typeChangeVatForAllForm = {
    newVat: string,
}

export const initialForm = {
    initialValues: { newVat: '' },
    validate: {
        newVat: (value: string) => {

            return value.trim() === ''
                ? t`Required field`
                : +value.trim() > 100
                    ? t`Too match`
                    : null;

        },
    },
};
