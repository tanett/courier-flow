import React from 'react';
import { typeCheckedShortSalesExtended } from 'features/sales-list/types/types';
import { Box, Flex, Loader } from '@mantine/core';
import { AdvanceIconOutline16 } from 'shared/ui/svg-custom-icons/advance-icon-outline/advanceIconOutline16';
import { t } from '@lingui/macro';
import { CreditIconOutline16 } from 'shared/ui/svg-custom-icons/credit-icon-outline/credit-icon-outline-16';
import { useStyles } from 'shared/ui/payment-type/styles';
import ButtonAsLink from 'shared/ui/button-as-link/button-as-link';
import { useLingui } from '@lingui/react';
import { typeSale } from 'entities/sales/model/types';
import { generatePath, useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import { useLazySearchCreditsOneQuery } from '../../../entities/credits/api/api';

const PaymentType: React.FC<{ sale: typeCheckedShortSalesExtended | typeSale }> = ({ sale }) => {

    const { classes } = useStyles();

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const [getCredit, {isFetching: isCreditFetching}] = useLazySearchCreditsOneQuery()

    const onAdvanceClick =  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        if(('advanceId' in sale)) {
            navigate(generatePath(routerPaths.advances_details, { id: sale.advanceId }));
        }
    };

    const onCreditClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        try {
            const credit = await getCredit({saleId: sale.id}).unwrap();
            navigate(generatePath(routerPaths.credits_details, { id: credit.id }));
        } catch (err){console.log(err)}

    };

    return (<>
            { sale.paymentType === 'USUAL' &&
                <Flex className={ classes.flexRow }>
                    {/* <Box className={ classes.iconContainer }><MulticurrencyIconOutline24/></Box> */ }
                    <ButtonAsLink disabled onClick={ (e) => onAdvanceClick(e) } label={ i18n._(t`Usual`) }/>
                </Flex> }
            { sale.paymentType === 'ADVANCE' &&
                <Flex className={ classes.flexRow }>
                    <Box className={ classes.iconContainer }><AdvanceIconOutline16/></Box>
                    <ButtonAsLink  onClick={ onAdvanceClick } label={ i18n._(t`Advance`) }/>
                </Flex> }
            { sale.paymentType === 'CREDIT' &&
                <Flex className={ classes.flexRow }>
                    <Box className={ classes.iconContainer }>{isCreditFetching? <Loader size={'xs'}/>:<CreditIconOutline16/>}</Box>
                    <ButtonAsLink onClick={ onCreditClick } label={ i18n._(t`Credit`) }/>
                </Flex>
            }

        </>
    );
};

export default PaymentType;
