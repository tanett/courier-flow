import React from 'react';
import { typeCheckedShortSalesExtended } from 'features/sales-list/types/types';
import { Box, Button, Flex, Text } from '@mantine/core';
import { AdvanceIconOutline } from 'shared/ui/svg-custom-icons/advance-icon-outline/advance-icon-outline';
import { t, Trans } from '@lingui/macro';
import { CreditIconOutline } from 'shared/ui/svg-custom-icons/credit-icon-outline/credit-icon-outline';
import { BanknotesIcon, CreditCardIcon, CurrencyDollarIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { useStyles } from './styles';
import ButtonAsLink from 'shared/ui/button-as-link/button-as-link';
import { useLingui } from '@lingui/react';
import { TransferIconOutline } from 'shared/ui/svg-custom-icons/transfer-icon-outline/transfer-icon-outline';

const PaymentsList: React.FC<{ sale: typeCheckedShortSalesExtended }> = ({ sale }) => {

    const { classes } = useStyles();

    const { i18n } = useLingui();

    const onAdvanceClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        console.log('add navigate to advance');
    };

    const onCreditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        console.log('add navigate to credit');
    };

    return (<>
            { sale.paymentType === 'ADVANCE' &&
                <Flex className={ classes.flexRow }>
                    <Box className={ classes.iconContainer }><AdvanceIconOutline/></Box>
                    <ButtonAsLink  onClick={ onAdvanceClick } label={i18n._(t`Advance`)}/>
                </Flex> }
            { sale.paymentType === 'CREDIT' &&
                <Flex className={ classes.flexRow }>
                    <Box className={ classes.iconContainer }><CreditIconOutline/></Box>
                    <ButtonAsLink  onClick={ onCreditClick } label={i18n._(t`Credit`)}/>
                </Flex> }
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
