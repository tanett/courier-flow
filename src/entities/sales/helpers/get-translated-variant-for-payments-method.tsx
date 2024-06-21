import { Trans } from '@lingui/macro';
import { typePayment } from 'entities/sales/model/types';

export const getTranslatedVariantForPaymentsMethod = (method: typePayment['method']) => {

    switch (method) {

    case 'E_PAYMENT_SYSTEM' :
        return <Trans>EPS</Trans>;
    case 'CARD':
        return <Trans>Card</Trans>;
    case 'QR' :
        return <Trans>Qr-code</Trans>;
    case 'CASH':
        return <Trans>Cash</Trans>;
    case 'TRANSFER':
        return <Trans>Transfer</Trans>;
    default :
        return method;

    }

};
