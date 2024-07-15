import React from 'react';
import { useStyles } from './styles';
import { typeReturnOrderForm } from '../types/types';
import { Box, Flex, Grid, Input, rem, Text, TextInput, Tooltip, useMantineTheme, Table } from '@mantine/core';
import { SelectorWithSearchStore } from 'features/selector-with-search-store';
import { typeReturnForm } from 'features/selector-with-search-store/types';
import { SelectorProducts } from 'features/orders-create/ui/selector-products/selector-products';

import { OrdersListTableHeader } from 'features/orders-list/ui/table/orders-table-header';
import { typeAction } from 'shared/ui/table/ui/table-actions/types';
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


export const OrderProducts: React.FC<{ form: typeReturnOrderForm }> = ({ form, }) => {


    const { classes } = useStyles();

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    return (
        <fieldset className={ classes.fieldset }>

            <Flex className={ classes.flexColumn }>

                <SelectorWithSearchStore required={ true } fieldName={ 'storeId' } form={ form as unknown as typeReturnForm } initialValue={ null }/>

                <Grid gutter={ 12 }>
                    <Grid.Col span={ 5 } sx={ { minWidth: '418px' } }>
                        <SelectorProducts form={ form }/>
                    </Grid.Col>
                    <Grid.Col span={ 'auto' } sx={ { minWidth: '672px' } }>
                        <Flex direction="column" justify="space-between" sx={ { height: '100%' } }>
                            <ProductsInCartTable form={ form }/>
                            <Box className={ classes.discountContainer }>
                                22
                            </Box>
                        </Flex>
                    </Grid.Col>
                </Grid>

            </Flex>

        </fieldset>
    );

};
