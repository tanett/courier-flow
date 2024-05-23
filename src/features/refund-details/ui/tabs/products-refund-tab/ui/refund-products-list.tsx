import React from 'react';
import { Box, Flex, useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { useAppDispatchT } from 'app/state';
import { useNavigate } from 'react-router-dom';
import {typeRefund} from "../../../../../../entities/refunds/model/types";
import { TableSoldProducts } from 'features/refund-details/ui/tabs/products-refund-tab/ui/table/table-sold-products';

export const RefundProductsList: React.FC<{ refundData: typeRefund | undefined, isFetching: boolean }> = ({ refundData, isFetching }) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const dispatchAppT = useAppDispatchT();

    const navigate = useNavigate();



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
                { (refundData && refundData.productsCount > 0) ? <Box sx={ {
                    borderBottom: `2px solid ${ theme.colors.gray[ 5 ] }`,
                    alignSelf: 'center',
                } }>{ i18n._(t`Number of products`) }: { refundData?.productsCount || 0 }</Box> : <div/> }


            </Flex>

            <TableSoldProducts
                productList={ refundData?.products }
                isLoading={ isFetching }
            />

            {/* { pagination && <Flex py={ 16 }><Pagination pagination={ pagination } withPerPage={ true }/></Flex> } */}

        </Box>);

};
