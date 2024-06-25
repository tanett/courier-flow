import React from 'react';
import { Box } from '@mantine/core';
import { BanknotesIcon, CreditCardIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { useStyles } from './styles';
import { TransferIconOutline } from 'shared/ui/svg-custom-icons/transfer-icon-outline/transfer-icon-outline';
import { typePayment } from 'entities/sales/model/types';
import { TransferDollarIconOutline } from 'shared/ui/svg-custom-icons/transfer-dollar-icon-outline/transfer-dollar-icon-outline';

const PaymentMethodIcon: React.FC<{ method: typePayment['method'] }> = ({ method }) => {

    const { classes } = useStyles();
    switch (method){
    case 'CARD': return <CreditCardIcon className={ classes.iconContainer }/>;
    case 'TRANSFER': return  <Box  className={ classes.iconContainer }><TransferIconOutline/></Box>
    case 'QR': return <QrCodeIcon className={ classes.iconContainer }/>
    case 'CASH':return <BanknotesIcon className={ classes.iconContainer }/>
    case 'E_PAYMENT_SYSTEM': return <Box  className={ classes.iconContainer }><TransferDollarIconOutline/></Box>
    default : return method
    }
};

export default PaymentMethodIcon;
