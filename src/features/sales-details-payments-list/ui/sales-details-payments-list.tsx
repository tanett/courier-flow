import React from 'react';
import { Box, Flex, Loader, useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { generatePath, useNavigate } from 'react-router-dom';
import { typeSale } from 'entities/sales/model/types';
import { TablePayments } from './table/table-payments';
import ButtonAsLink from 'shared/ui/button-as-link/button-as-link';
import { routerPaths } from 'app/config/router-paths';
import { useLazySearchCreditsOneQuery } from '../../../entities/credits/api/api';

export const SalesDetailsPaymentsList: React.FC<{ saleData: typeSale | undefined, isFetching: boolean }> = ({ saleData, isFetching }) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const navigate = useNavigate();

    const [getCredit, {isFetching: isCreditFetching}] = useLazySearchCreditsOneQuery()


    const onCreditClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        try {
            const credit = await getCredit({saleId: saleData?.id}).unwrap();
            navigate(generatePath(routerPaths.credits_details, { id: credit.id }));
        } catch (err){console.log(err)}

    };

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
                } }>{ i18n._(t`Number of payments`) }: { saleData?.payments.length || 0 }</Box> : <div/> }

                {saleData && saleData.paymentType === 'CREDIT' && <>{isCreditFetching && <Loader size={'xs'}/>}<ButtonAsLink onClick={onCreditClick} label={i18n._(t`Go to "Credits" to view the list of payments`)} /></>}
            </Flex>

            <TablePayments
                paymentsList={ saleData?.payments }
                isLoading={ isFetching }
            />

            {/* { pagination && <Flex py={ 16 }><Pagination pagination={ pagination } withPerPage={ true }/></Flex> } */}

        </Box>);

};
