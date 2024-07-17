import { t } from '@lingui/macro';
import { isValidPhoneNumberByLength } from 'shared/utils/isValidPhoneNumber';
import { typeOrdersForm, typeProductInCart, typeReturnOrderForm } from 'features/orders-create/types/types';


export const initialOrderForm = {
    initialValues: {
        customer: {
            id: '',
            fullName: '',
            phone: '',
            email: ''
        },
        deliveryAddress: {
            address: '',
            additionalInfo: ''
        },
        storeId: null,
        servicePayment: '0',
        isServicePaymentInPercent: true,
        discount: '0',
        isDiscountInPercent: true,
        products: []
    },
    validate: {
        customer: {
            fullName: (value: string) => {

                return value.trim().length === 0
                    ? t`Required field`
                    : value.trim().length > 150
                        ? t`It's too long`
                        : null;

            },
            email: (value: string) => {

                return value.trim().length >= 150
                    ? t`It's too long`
                    : value.trim().length === 0
                        ? null
                        : /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(value)
                            ? null
                            : t`Invalid email`;

            },
            phone: (value: string) => {

                return value !== ''
                    ? isValidPhoneNumberByLength(value) ? null : t`Invalid phone number format`
                    : t`Required field`;

            },
        },
        deliveryAddress: {
            address: (value: string) => {
                return value.trim().length === 0
                    ? t`Required field`
                    : value.trim().length > 250
                        ? t`It's too long`
                        : null;
            },
            additionalInfo: (value: string) => {
                return value.trim().length > 250
                    ? t`It's too long`
                    : null;
            }
        },
        storeId: (value: string | null) => {

            return !value
                ? t`Required field`
                : null;
        },

        discount: (value: string, values: typeOrdersForm,) => {

            const totalCost = values.products.reduce((acc, current) => acc + current.price * (+current.amount), 0);
            const isInPercent= values.isDiscountInPercent
            return  isInPercent ?
                +(value.trim()) > 100
                    ? t`The discount cannot be greater than the total cost.`
                    : null
                : +(value.trim()) > totalCost
                    ? t`The discount cannot be greater than the total cost.`
                    : null
        },

        // discountAmount: '0',
        products: (value: typeProductInCart[]) => {
            return value.length === 0
                ? t`Products list is empty`
                : null;
        },

    },
};

export const fieldsInTabClient = [
    'customer.fullName',
    'customer.phone',
    'customer.email',
    'deliveryAddress.address',
    'deliveryAddress.additionalInfo',
];

export const fieldsInTabProduct = [
    'storeId',
    'servicePaymentPercent',
    'servicePaymentAmount',
    'discountPercent',
    'discountAmount',
    'products',
];
