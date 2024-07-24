import React from 'react';
import { Box, Flex, useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { TableOrderedProducts } from 'features/orders-details/ui/orders-details-products/ui/table/table-ordered-products';
import { typeOrder } from '../../../../../entities/orders/model/state-slice';

export const OrdersDetailsOrderedProductsList: React.FC<{ orderData: typeOrder }> = ({ orderData }) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();



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
                { (orderData && orderData.productsCount > 0) ? <Box sx={ {
                    borderBottom: `2px solid ${ theme.colors.gray[ 5 ] }`,
                    alignSelf: 'center',
                } }>{ i18n._(t`Number of products`) }: { orderData?.productsCount || 0 }</Box> : <div/> }


            </Flex>

            <TableOrderedProducts
                productList={ orderData?.products }
            />

            {/* { pagination && <Flex py={ 16 }><Pagination pagination={ pagination } withPerPage={ true }/></Flex> } */}

        </Box>);

};
