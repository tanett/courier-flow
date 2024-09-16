import React from 'react';
import { Box, Flex, useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { TableOrderedProducts } from 'features/orders-details/ui/orders-details-products/ui/table/table-ordered-products';
import { typeOrder } from 'entities-project/orders/model/state-slice';
import { getRefusedProducts } from 'features/orders-details/helpers/get-refused-products';

export const OrdersDetailsRefusedProductsList: React.FC<{ orderData: typeOrder }> = ({ orderData }) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const refusedProducts = getRefusedProducts(orderData.products)

    return (
        <Box sx={ {
            borderTop: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
            borderTopRightRadius: '8px',
            marginTop: '-1px',
            backgroundColor: theme.white,

        } }>

            <Flex justify={ 'space-between' } p={ 16 }
                sx={ {
                    borderLeft: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                    borderRight: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                    borderTopRightRadius: '8px',
                } }
            >
                { (orderData && refusedProducts.length > 0) ? <Box sx={ {
                    borderBottom: `2px solid ${ theme.colors.gray[ 5 ] }`,
                    alignSelf: 'center',
                } }>{ i18n._(t`Number of products`) }: { refusedProducts.length || 0 }</Box> : <div/> }


            </Flex>

            <TableOrderedProducts
                productList={ refusedProducts }
            />

            {/* { pagination && <Flex py={ 16 }><Pagination pagination={ pagination } withPerPage={ true }/></Flex> } */}

        </Box>);

};
