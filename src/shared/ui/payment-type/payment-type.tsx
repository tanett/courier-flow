import React from 'react';
import { typeCheckedShortSalesExtended } from 'features/sales-list/types/types';
import { Box, Flex } from '@mantine/core';
import { AdvanceIconOutline } from 'shared/ui/svg-custom-icons/advance-icon-outline/advance-icon-outline';
import { t } from '@lingui/macro';
import { CreditIconOutline } from 'shared/ui/svg-custom-icons/credit-icon-outline/credit-icon-outline';
import { useStyles } from 'shared/ui/payment-type/styles';
import ButtonAsLink from 'shared/ui/button-as-link/button-as-link';
import { useLingui } from '@lingui/react';
import { typeSale } from 'entities/sales/model/types';

const PaymentType: React.FC<{ sale: typeCheckedShortSalesExtended | typeSale }> = ({ sale }) => {

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
            { sale.paymentType === 'USUAL' &&
                <Flex className={ classes.flexRow }>
                    {/* <Box className={ classes.iconContainer }><AdvanceIconOutline/></Box> */}
                    <ButtonAsLink disabled  onClick={ onAdvanceClick } label={i18n._(t`Usual`)}/>
                </Flex> }
            { sale.paymentType === 'ADVANCE' &&
                <Flex className={ classes.flexRow }>
                    <Box className={ classes.iconContainer }><AdvanceIconOutline/></Box>
                    <ButtonAsLink  onClick={ onAdvanceClick } label={i18n._(t`Advance`)}/>
                </Flex> }
            { sale.paymentType === 'CREDIT' &&
                <Flex className={ classes.flexRow }>
                    <Box className={ classes.iconContainer }><CreditIconOutline/></Box>
                    <ButtonAsLink  onClick={ onCreditClick } label={i18n._(t`Credit`)}/>
                </Flex>
            }

        </>
    );
};

export default PaymentType;
