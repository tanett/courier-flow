import React from 'react';
import { Box, Flex, useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { TablePayments } from './table/table-payments';
import { typeCredit } from '../../../../../entities/credits/model/types';

export const CreditsDetailsPaymentsList: React.FC<{ creditData: typeCredit| undefined, isFetching: boolean }> = ({ creditData, isFetching }) => {

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
                { (creditData && creditData.payments.length > 0) ? <Box sx={ {
                    borderBottom: `2px solid ${ theme.colors.gray[ 5 ] }`,
                    alignSelf: 'center',
                } }>{ i18n._(t`Number of payments`) }: { creditData?.payments.length || 0 }</Box> : <div/> }


            </Flex>

            <TablePayments
                paymentsList={ creditData?.payments }
                isLoading={ isFetching }
            />

            {/* { pagination && <Flex py={ 16 }><Pagination pagination={ pagination } withPerPage={ true }/></Flex> } */}

        </Box>);

};
