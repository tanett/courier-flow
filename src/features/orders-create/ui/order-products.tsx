import React from 'react';
import { useStyles } from './styles';
import { typeReturnOrderForm } from '../types/types';
import { Box, Flex, Grid, Input, rem, Text, TextInput, Tooltip, useMantineTheme, Table, SimpleGrid } from '@mantine/core';
import { SelectorWithSearchStore } from 'features/selector-with-search-store';
import { typeReturnForm } from 'features/selector-with-search-store/types';
import { SelectorProducts } from 'features/orders-create/ui/selector-products/selector-products';

import { OrdersListTableHeader } from 'features/orders-list/ui/table/orders-table-header';
import { typeActionList } from 'shared/ui/table/ui/table-actions/types';
import { t, Trans } from '@lingui/macro';
import { ArchiveBoxXMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import DateTimeInLine from 'shared/ui/date-time-in-line/date-time-in-line';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import BadgeOrdersStatus from 'shared/ui/badge-orders-status/badge-orders-status';
import SortButton from 'shared/ui/sort-button/sort-button';
import { sortDirection } from 'app/api/types';
import { useLingui } from '@lingui/react';
import { IMaskInput } from 'react-imask';
import { ProductsInCartTable } from 'features/orders-create/ui/products-in-cart-table/products-in-cart-table';
import DiscountInput from 'features/orders-create/ui/discount-service-payment-input/discount-input';
import ServicePaymentInput from 'features/orders-create/ui/discount-service-payment-input/service-payment-input';
import { getTotalCostWithDiscountAndServicePayment } from 'features/orders-create/helpers/get-total-cost-with-discount-service-payment';


export const OrderProducts: React.FC<{ form: typeReturnOrderForm }> = ({ form, }) => {


    const { classes } = useStyles();

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    return (
        <fieldset className={ classes.fieldset }>

            <Flex className={ classes.flexColumn }>

                <SelectorWithSearchStore required={ true } fieldName={ 'storeId' } form={ form as unknown as typeReturnForm } initialValue={ null }/>

                <Flex sx={{ flexDirection: 'row', gap: rem(12), position: 'relative' }}>
                    <Box sx={ { width: '408px' } }>
                        <SelectorProducts form={ form }/>
                    </Box>

                    <Flex direction="column" justify="space-between" sx={ {
                        height: '525px',
                        position: 'relative',
                        flexGrow: 1
                    } }>
                        <ProductsInCartTable form={ form }/>
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
