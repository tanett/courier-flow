import React from 'react';
import { useMantineTheme } from '@mantine/core';
import { CreditCardIcon, QrCodeIcon, StarIcon } from '@heroicons/react/24/outline';
import { useStyles } from 'features/terminal-configurations-create/ui/select-modules/available-module-config-terminals-icon/styles';
import { AVAILABLE_MODULES, } from '../../../../../entities/terminals-configurations/model/state-slice';
import cn from 'classnames';
import { FiscalizationIconOutline } from 'shared/ui/svg-custom-icons/fiscalization-icon-outline/fiscalization-icon-outline';
import { AdvanceIconOutline24 } from 'shared/ui/svg-custom-icons/advance-icon-outline/advanceIconOutline24';
import { OnlinePaymentIconOutline } from 'shared/ui/svg-custom-icons/online-payment-icon-outline/online-payment-icon-outline';

const AvailableModuleConfigTerminalsIcon: React.FC<{ moduleName:   AVAILABLE_MODULES, checked: boolean }> = ({ moduleName, checked }) => {

    const { classes } = useStyles();

    const theme = useMantineTheme();

    switch (moduleName) {
    case AVAILABLE_MODULES.CASH:
        return <FiscalizationIconOutline color={checked? theme.colors.primary[5] : theme.black}/>;
    case AVAILABLE_MODULES.ADVANCES:
        return <AdvanceIconOutline24 color={checked? theme.colors.primary[5] : theme.black} width={24} height={24}/>;
    case AVAILABLE_MODULES.CREDITS:
        return <AdvanceIconOutline24 color={checked? theme.colors.primary[5] : theme.black} width={24} height={24}/>;
    case AVAILABLE_MODULES.ORDERS:
        return <OnlinePaymentIconOutline color={checked? theme.colors.primary[5] : theme.black} width={24} height={24}/>;
    case AVAILABLE_MODULES.MULTICURRENCY:
        return <CreditCardIcon className={cn(classes.iconContainer, checked? classes.primary: theme.black )  }/>;
    case AVAILABLE_MODULES.E_PAYMENTS:
        return <CreditCardIcon className={cn(classes.iconContainer, checked? classes.primary: theme.black )  }/>;
    case AVAILABLE_MODULES.QR_PAYMENTS:
        return <QrCodeIcon className={cn(classes.iconContainer, checked? classes.primary: theme.black )  }/>;
    case AVAILABLE_MODULES.ERP_MODE:
        return <CreditCardIcon className={cn(classes.iconContainer, checked? classes.primary: theme.black )  }/>;
    case AVAILABLE_MODULES.EXTERNAL_MERCHANT_API:
        return <CreditCardIcon className={cn(classes.iconContainer, checked? classes.primary: theme.black )  }/>;

    default :
        return <StarIcon className={cn(classes.iconContainer, checked? classes.primary: classes.gray )  }/>;
    }
};

export default AvailableModuleConfigTerminalsIcon;
