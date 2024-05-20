import React from 'react';
import { typeCheckedShortSalesExtended } from 'features/sales-list/types/types';
import { Box, Flex, Text } from '@mantine/core';
import { BanknotesIcon, CreditCardIcon, CurrencyDollarIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { useStyles } from 'shared/ui/payments/styles';
import { useLingui } from '@lingui/react';
import { TransferIconOutline } from 'shared/ui/svg-custom-icons/transfer-icon-outline/transfer-icon-outline';
import PaymentType from 'shared/ui/payment-type/payment-type';

const PaymentsList: React.FC<{ sale: typeCheckedShortSalesExtended }> = ({ sale }) => {

    const { classes } = useStyles();

    return (<>
            <PaymentType sale={ sale}/>
            { sale.payments.map((payment, index) => {
                return (<Flex key={ index } className={ classes.flexRow }>
                    { payment.method === 'CASH' && <BanknotesIcon className={ classes.iconContainer }/> }
                    { payment.method === 'QR' && <QrCodeIcon className={ classes.iconContainer }/> }
                    { payment.method === 'CARD' && <CreditCardIcon className={ classes.iconContainer }/> }
                    { payment.method === 'TRANSFER' && <Box  className={ classes.iconContainer }><TransferIconOutline/></Box> }
                    { payment.method === 'OTHER' && <CurrencyDollarIcon className={ classes.iconContainer }/> }
                    <Text>{ numberCurrencyFormat(payment.amount) }</Text>
                </Flex>);
            }) }

        </>
    );
};

export default PaymentsList;
