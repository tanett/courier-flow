import React from 'react';
import { Box, Flex, useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { generatePath, useNavigate } from 'react-router-dom';
import { TableSoldProducts } from './table/table-sold-products';
import { routerPaths } from 'app/config/router-paths';
import { typeAdvance, typeAdvanceProduct } from '../../../../../entities/advances/model/state-slice/types';
import { useAppDispatchT } from 'app/state';
import { soldProductsStateActions } from '../../../../../entities/advances/model/state-slice';

export const AdvancesDetailsSoldProductsList: React.FC<{ advanceData: typeAdvance | undefined, isFetching: boolean }> = ({
    advanceData,
    isFetching
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const dispatch = useAppDispatchT();

    const navigate = useNavigate();


    const onProductNameClick = (soldProduct: typeAdvanceProduct) => {
        if (advanceData) {
            dispatch(soldProductsStateActions.setSoldProductInfo(soldProduct));
            navigate(generatePath(routerPaths.advances_sold_product_details, {
                id: advanceData.id,
                publicId: advanceData.publicId,
                name: soldProduct.name
            }));
        }
    };

    return (
        <Box sx={ {
            borderTop: `1px solid ${ theme.colors.borderColor[0] }`,
            borderTopRightRadius: '8px',
            marginTop: '-1px',
            backgroundColor: theme.white,

        } }>

            <Flex justify={ 'space-between' } p={ 16 }
                  sx={ {
                      borderLeft: `1px solid ${ theme.colors.borderColor[0] }`,
                      borderRight: `1px solid ${ theme.colors.borderColor[0] }`,
                      borderTopRightRadius: '8px',
                  } }
            >
                { (advanceData && advanceData.products.length > 0) ? <Box sx={ {
                    borderBottom: `2px solid ${ theme.colors.gray[5] }`,
                    alignSelf: 'center',
                } }>{ i18n._(t`Number of products`) }: { advanceData?.products.length || 0 }</Box> : <div/> }


            </Flex>

            <TableSoldProducts
                productList={ advanceData?.products }
                isLoading={ isFetching }
                onSoldProductClick={ onProductNameClick }
            />

            {/* { pagination && <Flex py={ 16 }><Pagination pagination={ pagination } withPerPage={ true }/></Flex> } */ }

        </Box>);

};
