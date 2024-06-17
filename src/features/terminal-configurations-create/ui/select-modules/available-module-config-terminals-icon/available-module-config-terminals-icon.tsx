import React from 'react';
import { useMantineTheme } from '@mantine/core';
import { CreditCardIcon, StarIcon } from '@heroicons/react/24/outline';
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
    case AVAILABLE_MODULES.FISCAL:
        return <FiscalizationIconOutline color={checked? theme.colors.primary[5] : theme.black}/>;
    case AVAILABLE_MODULES.CREDIT_PREPAYMENT:
        return <AdvanceIconOutline24 color={checked? theme.colors.primary[5] : theme.black} width={24} height={24}/>;
    case AVAILABLE_MODULES.ONLINE_PAYMENT:
        return <OnlinePaymentIconOutline color={checked? theme.colors.primary[5] : theme.black} width={24} height={24}/>;
    case AVAILABLE_MODULES.PAYMENT_BY_CARD:
        return <CreditCardIcon className={cn(classes.iconContainer, checked? classes.primary: theme.black )  }/>;

    default :
        return <StarIcon className={cn(classes.iconContainer, checked? classes.primary: classes.gray )  }/>;
    }
};

export default AvailableModuleConfigTerminalsIcon;
