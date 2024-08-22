import { t } from '@lingui/macro';

export type typeCorrectOperationForm = {
    type: 'MANUAL_REFILL' | 'MANUAL_WRITE_OFF',
    amount: number,
    currency: string,
    comment: string,
}

const initialForm: typeCorrectOperationForm = {
    type: 'MANUAL_REFILL',
    amount: 0,
    currency: '',
    comment: '',
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
