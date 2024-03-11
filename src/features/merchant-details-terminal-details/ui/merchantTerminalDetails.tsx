import React, { useEffect, useState } from 'react';
import { Box, Loader, SimpleGrid, useMantineTheme } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useGetTerminalByIdQuery } from 'entities/terminals/api/api';
import { SkeletonTerminalDetails } from 'features/merchant-details-terminal-details/skeleton-terminal-details/skeleton-terminal-details';
import { InfoCardSmall } from 'shared/ui/info-card-small';
import BadgeStatus from 'shared/ui/badgeStatus/badgeStatus';
import { BuildingStorefrontIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { IconTag } from '@tabler/icons-react';
import { useLazyGetStoreByIdQuery } from 'entities/stores/api/api';
import { typeStore } from 'entities/stores/model/types';


export const MerchantTerminalDetails: React.FC<{ merchantId: string, terminalId: string, serialNumber: string }> = ({ terminalId }) => {

    const theme = useMantineTheme();

    const { i18n } = useLingui();

    const {
        data: terminalData,
        isFetching,
    } = useGetTerminalByIdQuery(terminalId);


    const [
        getStoreById, { isFetching: isLoadingStoreData }
    ] = useLazyGetStoreByIdQuery();

    const [ storeData, setStoreData ] = useState<typeStore | undefined>();

    useEffect(() => {

        if (terminalData && terminalData.storeId){

            const store = getStoreById(terminalData.storeId).unwrap();
            store.then(store => setStoreData(store));

        }

    }, [ terminalData ]);

    return (
        (isFetching || !terminalData)
            ? <SkeletonTerminalDetails/>
            : <>
                <SimpleGrid
                    sx={ {
                        border: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                        borderRadius: '8px',
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
                            spacing: 30,
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
                                spacing: 30,
                            }
                        ] }>
                        <InfoCardSmall label={ i18n._(t`Vendor & model`) } content={ `${ terminalData?.vendor } ${ terminalData?.model }` || '-' }/>
                        <InfoCardSmall label={ i18n._(t`Fiscal ID`) } content={ terminalData.fiscalCardId || '-' }/>
                        <InfoCardSmall label={ i18n._(t`Blocking`) } content={
                            terminalData.blocked
                                ? <BadgeStatus type={ 'error' } label={ i18n._(t`Blocked`) }/>
                                : <BadgeStatus type={ 'success' } label={ i18n._(t`Not blocked`) }/>
                        }/>
                        { terminalData.blocked
                            ? <InfoCardSmall label={ i18n._(t`Reason for blocking`) }
                                content={ terminalData.blockReasons || '-' } />
                            : <div/> }
                        <InfoCardSmall label={ i18n._(t`Terminal number in store (label)`) }
                            content={ terminalData.label ? terminalData.label : '-' }
                            withBottomBorder={ false }/>

                    </SimpleGrid>
                    <Box>
                        <InfoCardSmall label={ i18n._(t`Store name`) }
                            iconLabel={ <BuildingStorefrontIcon/> }
                            content={ storeData ? storeData.name : isLoadingStoreData ? <Loader size={16}/> : '-' }/>
                        <InfoCardSmall label={ i18n._(t`Store address`) }
                            content={ storeData ? storeData.address : isLoadingStoreData ? <Loader size={16}/> : '-' }
                            iconLabel={ <MapPinIcon/> }/>
                        <InfoCardSmall label={ i18n._(t`Contract number for using the terminal`) }
                            content={ terminalData.contractCode || '-' }
                            iconLabel={ <IconTag/> }
                            withBottomBorder={ false }
                        />
                    </Box>


                </SimpleGrid>

                <SimpleGrid breakpoints={ [
                    {
                        minWidth: 'md',
                        cols: 1,
                        spacing: 10,
                    },
                    {
                        minWidth: 1200,
                        cols: 2,
                        spacing: 30,
                    }
                ] }
                sx={ {
                    border: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                    borderRadius: '8px',
                    padding: '10px 16px',
                    marginTop: '-1px',
                    backgroundColor: theme.white,
                } }>

                    <InfoCardSmall label={ i18n._(t`Creation date`) }
                        content={ terminalData.createdAt }/>

                    <div/>
                    <InfoCardSmall label={ i18n._(t`Cash application version`) }
                        content={ terminalData.cashAppVersion }
                        withBottomBorder={ false }/>
                    <InfoCardSmall label={ i18n._(t`Payment application version`) }
                        content={ terminalData.paymentAppVersion }
                        withBottomBorder={ false }/>
                </SimpleGrid>

            </>
    );

};
