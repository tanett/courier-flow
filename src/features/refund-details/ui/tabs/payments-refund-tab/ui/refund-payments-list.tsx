import React from 'react';
import { Box, Flex, useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { TablePayments } from './table/table-payments';
import {typeRefund} from "../../../../../../entities/refunds/model/types";

export const RefundPaymentsList: React.FC<{ refundData: typeRefund | undefined, isFetching: boolean }> = (
    { refundData, isFetching }) => {

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
                { (refundData && refundData.productsCount > 0) ? <Box sx={ {
                    borderBottom: `2px solid ${ theme.colors.gray[ 5 ] }`,
                    alignSelf: 'center',
                } }>{ i18n._(t`Number of payments`) }: { refundData?.payments.length || 0 }</Box> : <div/> }


            </Flex>

            <TablePayments
                paymentsList={ refundData?.payments }
                isLoading={ isFetching }
            />

            {/* { pagination && <Flex py={ 16 }><Pagination pagination={ pagination } withPerPage={ true }/></Flex> } */}

        </Box>);

};
