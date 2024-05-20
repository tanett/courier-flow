import React from 'react';
import { Box } from '@mantine/core';
import { BanknotesIcon, CreditCardIcon, CurrencyDollarIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { useStyles } from './styles';
import { TransferIconOutline } from 'shared/ui/svg-custom-icons/transfer-icon-outline/transfer-icon-outline';
import { typePayment } from 'entities/sales/model/types';

const PaymentMethodIcon: React.FC<{ method: typePayment['method'] }> = ({ method }) => {

    const { classes } = useStyles();
    switch (method){
    case 'CARD': return <CreditCardIcon className={ classes.iconContainer }/>;
    case 'TRANSFER': return  <Box  className={ classes.iconContainer }><TransferIconOutline/></Box>
    case 'QR': return <QrCodeIcon className={ classes.iconContainer }/>
    case 'CASH':return <BanknotesIcon className={ classes.iconContainer }/>
    case 'OTHER': return <CurrencyDollarIcon className={ classes.iconContainer }/>
    default : return method
    }
};

export default PaymentMethodIcon;
