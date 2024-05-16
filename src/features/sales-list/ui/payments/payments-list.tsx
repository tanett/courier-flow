import React from 'react';
import { typeCheckedShortSales } from 'features/sales-list/types/types';
import { Box, Button, Flex, Text } from '@mantine/core';
import { AdvanceIconOutline } from 'shared/ui/icons/advance-icon-outline/advance-icon-outline';
import { Trans } from '@lingui/macro';
import { CreditIconOutline } from 'shared/ui/icons/credit-icon-outline/credit-icon-outline';
import { BanknotesIcon, CreditCardIcon, CurrencyDollarIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { useStyles } from './styles';

const PaymentsList: React.FC<{ sale: typeCheckedShortSales }> = ({ sale }) => {

    const { classes } = useStyles();

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
                    <Button variant={ 'subtle' } className={ classes.btnLink } onClick={ onAdvanceClick }><Trans>Advance</Trans></Button>
                </Flex> }
            { sale.paymentType === 'CREDIT' &&
                <Flex className={ classes.flexRow }>
                    <Box className={ classes.iconContainer }><CreditIconOutline/></Box>
                    <Button variant={ 'subtle' } className={ classes.btnLink } onClick={ onCreditClick }><Trans>Credit</Trans></Button>
                </Flex> }
            { sale.payments.map((payment, index) => {
                return (<Flex key={ index } className={ classes.flexRow }>
                    { payment.method === 'CASH' && <BanknotesIcon className={ classes.iconContainer }/> }
                    { payment.method === 'QR' && <QrCodeIcon className={ classes.iconContainer }/> }
                    { payment.method === 'CARD' && <CreditCardIcon className={ classes.iconContainer }/> }
                    { payment.method === 'TRANSFER' && '=' } {/* todo fix it */ }
                    { payment.method === 'OTHER' && <CurrencyDollarIcon className={ classes.iconContainer }/> }
                    <Text>{ numberCurrencyFormat(payment.amount) }</Text>
                </Flex>);
            }) }

        </>
    );
};

export default PaymentsList;
