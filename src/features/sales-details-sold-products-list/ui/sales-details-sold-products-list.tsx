import React from 'react';
import { Box, Flex, useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { generatePath, useNavigate } from 'react-router-dom';
import { typeSale } from 'entities/sales/model/types';
import { TableSoldProducts } from 'features/sales-details-sold-products-list/ui/table/table-sold-products';
import { routerPaths } from 'app/config/router-paths';

export const SalesDetailsSoldProductsList: React.FC<{ saleData: typeSale | undefined, isFetching: boolean }> = ({ saleData, isFetching }) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const navigate = useNavigate();

const onProductNameClick = (soldProductName: string)=>{
    if(saleData) {
        navigate(generatePath(routerPaths.sold_product_details, { id: saleData.id, publicId: saleData.publicId, name: soldProductName }));
    }
}

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
                { (saleData && saleData.productsCount > 0) ? <Box sx={ {
                    borderBottom: `2px solid ${ theme.colors.gray[ 5 ] }`,
                    alignSelf: 'center',
                } }>{ i18n._(t`Number of products`) }: { saleData?.productsCount || 0 }</Box> : <div/> }


            </Flex>

            <TableSoldProducts
                productList={ saleData?.products }
                isLoading={ isFetching }
                onSoldProductClick={onProductNameClick}
            />

            {/* { pagination && <Flex py={ 16 }><Pagination pagination={ pagination } withPerPage={ true }/></Flex> } */}

        </Box>);

};
