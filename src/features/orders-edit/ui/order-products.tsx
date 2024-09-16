import React from 'react';

import { Box, Flex, rem, Text, useMantineTheme, SimpleGrid, } from '@mantine/core';
import { SelectorProducts } from 'features/orders-create/ui/selector-products/selector-products';
import { t, Trans } from '@lingui/macro';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { useLingui } from '@lingui/react';
import { ProductsInCartTable } from 'features/orders-create/ui/products-in-cart-table/products-in-cart-table';
import DiscountInput from 'features/orders-create/ui/discount-service-payment-input/discount-input';
import ServicePaymentInput from 'features/orders-create/ui/discount-service-payment-input/service-payment-input';
import { getTotalCostWithDiscountAndServicePayment } from 'features/orders-create/helpers/get-total-cost-with-discount-service-payment';
import { typeReturnOrderForm } from 'features/orders-create/types/types';
import { useStyles } from 'features/orders-create/ui/styles';
import { ProductsInCartTableEdit } from 'features/orders-edit/ui/products-in-cart-table-edit/products-in-cart-table';
import { typeOrder } from 'entities-project/orders/model/state-slice';


export const OrderProducts: React.FC<{ form: typeReturnOrderForm, orderData: typeOrder }> = ({ form, orderData}) => {


    const { classes } = useStyles();

    const theme = useMantineTheme();

    return (
        <fieldset className={ classes.fieldset }>

            <Flex className={ classes.flexColumn }>

                <Flex sx={{ flexDirection: 'row', gap: rem(12), position: 'relative' }}>
                    {/* <Box sx={ { width: '408px' } }> */}
                    {/*      */}
                    {/*     <SelectorProducts form={ form }/> */}
                    {/* </Box> */}

                    <Flex direction="column" justify="space-between" sx={ {
                        height: '525px',
                        position: 'relative',
                        flexGrow: 1
                    } }>
                        <ProductsInCartTableEdit form={ form } orderData={orderData} />
                        <SimpleGrid cols={ 2 } className={ classes.discountContainer }>
                            <DiscountInput form={ form } disabled={true}/>
                            <ServicePaymentInput form={ form }/>

                        </SimpleGrid>
                    </Flex>

                </Flex>
                <Flex justify={ 'end' }>
                    <Flex gap={ 30 } p={ 8 } >
                        <Flex gap={ 6 } align={ 'baseline' }>
                            <Text c={ theme.colors.gray[5] }><Trans>Total quantity</Trans></Text>
                            <Box sx={ {
                                fontWeight: 600,
                                fontSize: theme.fontSizes.lg
                            } }>{ form.values.products.length }</Box>
                        </Flex>
                        <Flex gap={ 6 } align={ 'baseline' }>
                            <Text c={ theme.colors.gray[5] }><Trans>Total cost</Trans></Text>
                            <Box sx={ {
                                fontWeight: 600,
                                fontSize: theme.fontSizes.lg
                            } }>{ numberCurrencyFormat(getTotalCostWithDiscountAndServicePayment(form)) }</Box>
                        </Flex>
                    </Flex>
                </Flex>

            </Flex>

        </fieldset>
    );

};
