import React, { useEffect, useState } from 'react';
import { Box, Flex, Loader, SimpleGrid, useMantineTheme } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { InfoCardSmall } from 'shared/ui/info-card-small';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { typeCashDeskDetailsCommonProps } from '../types/types';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import { useStyles } from './styles';
import { useLazyGetStoreByIdQuery } from '../../../entities/stores/api/api';
import { typeStore } from '../../../entities/stores/model/types';
import { getCurrencyByCode } from '../../../shared/utils/curremcy-utils';


export const CashDeskDetailsCommon: React.FC<typeCashDeskDetailsCommonProps> = ({ cashDeskData, isFetching }) => {

    const theme = useMantineTheme();

    const { classes } = useStyles();

    const { i18n } = useLingui();

    const [
        getStoreById, { isFetching: isLoadingStoreData }
    ] = useLazyGetStoreByIdQuery();

    const [ storeData, setStoreData ] = useState<typeStore | undefined>();

    useEffect(() => {

        if (cashDeskData?.storeId) {

            const store = getStoreById(cashDeskData.storeId).unwrap();
            store.then(store => setStoreData(store));

        }

    }, [ cashDeskData?.storeId ]);

    const openDate = cashDeskData
        ? new Date(cashDeskData.createdAt).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        })
        : '-';

    const openTime = cashDeskData
        ? new Date(cashDeskData.createdAt).toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
        : '-';

    const amount = <Flex className={classes.currencyBlock}>{cashDeskData?.cashDeskBalances?.map(balanceItem => <Flex className={classes.currencyRow} key={balanceItem.id}>
        <Box>{balanceItem.amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        })}</Box>
        <Box className={classes.currency}>{getCurrencyByCode(balanceItem.currency)}</Box>
    </Flex>)}</Flex>;

    return (
        <>
            <SimpleGrid
                sx={ {
                    border: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                    borderBottomLeftRadius: '8px',
                    padding: '10px 16px',
                    marginTop: '-1px',
                    backgroundColor: theme.white,
                } }
                breakpoints={ [
                    {
                        minWidth: 'md',
                        cols: 1,
                        spacing: 10,
                    },
                    {
                        minWidth: 1200,
                        cols: 2,
                        spacing: 60,
                    }
                ] }>
                <SimpleGrid
                    breakpoints={ [
                        {
                            minWidth: 'md',
                            cols: 2,
                            spacing: 10,
                        },
                        {
                            minWidth: 1200,
                            cols: 2,
                            spacing: 60,
                        }
                    ] }
                >
                    <InfoCardSmall
                        label={ i18n._(t`Creation date`) }
                        content={ cashDeskData?.createdAt ? <>{openDate}, <span className={classes.smallText}>{openTime}</span></> : '-' }
                        withBottomBorder={ false }
                    />
                    <InfoCardSmall
                        label={ i18n._(t`Amount`) }
                        content={ cashDeskData?.cashDeskBalances?.length ? amount : '-' }
                        withBottomBorder={ false }
                    />
                </SimpleGrid>
                <Box>
                    <InfoCardSmall label={ i18n._(t`Store name`) }
                        iconLabel={ <BuildingStorefrontIcon/> }
                        withBottomBorder={false}
                        content={ storeData ? storeData.name : isLoadingStoreData ? <Loader size={ 16 }/> : '-' }/>
                </Box>
            </SimpleGrid>
            { isFetching && <LoaderOverlay/> }
        </>
    );

};
