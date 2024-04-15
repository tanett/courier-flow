import { t } from '@lingui/macro';

export type typeChangeCategoryForm = {
    categoryId:string | null,
}

export const initialForm = {
    initialValues: { categoryId: null },
    validate: {
        categoryId: (value: string | null) => {

            return (!value || value.trim() === '')
                ? t`Required field`
                : null;

        },
    },
};
