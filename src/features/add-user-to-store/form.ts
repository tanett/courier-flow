import { t } from '@lingui/macro';

export type typeAddUserToStoreForm = {
    userId:string | null,
}

export const initialForm = {
    initialValues: {  userId: '', },
    validate: {
        userId: (value: string | null) => {

            return (!value || value.trim()==='')
                ? t`Required field`
                : null;

        },
    },
}
