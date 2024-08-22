import { t } from '@lingui/macro';

export type typeCorrectOperationForm = {
    type: 'MANUAL_REFILL' | 'MANUAL_WRITE_OFF',
    amount: number,
    currency: string | null,
    comment: string | null,
}

const initialForm: typeCorrectOperationForm = {
    type: 'MANUAL_REFILL',
    amount: 0,
    currency: null,
    comment: null,
};

export const correctOperationForm = {
    initialValues: initialForm,
    validate: {
        amount: (value: number) => {

            return (value === 0)
                ? t`Required amount`
                : null;

        },
    },
};
