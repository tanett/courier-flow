import { t } from '@lingui/macro';

export const initialCategoryCreateForm = {
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
