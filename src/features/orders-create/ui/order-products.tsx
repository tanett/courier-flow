import React from 'react';
import { useStyles } from './styles';
import { typeReturnOrderForm } from '../types/types';
import { Box, Flex, rem, Text, useMantineTheme, SimpleGrid } from '@mantine/core';
import { SelectorProducts } from 'features/orders-create/ui/selector-products/selector-products';
import {  Trans } from '@lingui/macro';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { ProductsInCartTable } from 'features/orders-create/ui/products-in-cart-table/products-in-cart-table';
import DiscountInput from 'features/orders-create/ui/discount-service-payment-input/discount-input';
import ServicePaymentInput from 'features/orders-create/ui/discount-service-payment-input/service-payment-input';
import { getTotalCostWithDiscountAndServicePayment } from 'features/orders-create/helpers/get-total-cost-with-discount-service-payment';


export const OrderProducts: React.FC<{ form: typeReturnOrderForm }> = ({ form, }) => {


    const { classes } = useStyles();

    const theme = useMantineTheme();

    return (
        <fieldset className={ classes.fieldset }>

            <Flex className={ classes.flexColumn }>

                {/* <SelectorWithSearchStore required={ true } fieldName={ 'storeId' } form={ form as unknown as typeReturnForm } initialValue={ null }/> */}

                <Flex sx={{ flexDirection: 'row', gap: rem(12), position: 'relative' }}>
                    <Box sx={ { width: '408px' } }>
                        <SelectorProducts form={ form }/>
                    </Box>

                    <Flex direction="column" justify="space-between" sx={ {
                        height: '525px',
                        position: 'relative',
                        flexGrow: 1
                    } }>
                        <ProductsInCartTable form={ form } />
                        <SimpleGrid cols={ 2 } className={ classes.discountContainer }>
                            <DiscountInput form={ form }/>
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
                            } }>{ form.values.products.filter(item=>item.storeId===form.values.storeId).length }</Box>
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
