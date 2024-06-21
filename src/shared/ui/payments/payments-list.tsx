import React from 'react';
import { Flex, Text } from '@mantine/core';
import { useStyles } from './styles';
import { typeCheckedShortSalesExtended } from 'features/sales-list/types/types';
import PaymentType from 'shared/ui/payment-type/payment-type';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import PaymentMethodIcon from 'shared/ui/payment-method-icon/payment-method-icon';
import { typeAdvanceShort } from 'entities/advances/model/state-slice/types';

const PaymentsList: React.FC<{ sale: typeCheckedShortSalesExtended | typeAdvanceShort }> = ({ sale }) => {

    const { classes } = useStyles();

    return (<>
            {'paymentType' in sale && sale.paymentType !== 'USUAL' && <PaymentType sale={ sale }/> }
            { sale.payments.map((payment, index) => {
                return (<Flex key={ index } className={ classes.flexRow }>
                     {<PaymentMethodIcon method={payment.method}/> }
                    <Text>{ numberCurrencyFormat(payment.amount) }</Text>
                </Flex>);
            }) }

        </>
    );
};

export default PaymentsList;
