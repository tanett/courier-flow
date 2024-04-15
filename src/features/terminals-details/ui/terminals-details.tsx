import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, useMantineTheme, Loader } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { InfoCardSmall } from 'shared/ui/info-card-small';
import { BuildingStorefrontIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useGetTerminalByIdQuery } from '../../../entities/terminals/api/api';
import { useLazyGetStoreByIdQuery } from '../../../entities/stores/api/api';
import { typeStore } from '../../../entities/stores/model/types';
import BadgeStatus from 'shared/ui/badge-status/badge-status';
import { LoaderOverlay } from 'shared/ui/loader-overlay';


export const TerminalDetails: React.FC<{ terminalId: string }> = ({ terminalId }) => {

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

        if (terminalData && terminalData.storeId) {

            const store = getStoreById(terminalData.storeId).unwrap();
            store.then(store => setStoreData(store));

        }

    }, [ terminalData ]);

    return (
        <>
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
                    <InfoCardSmall label={ i18n._(t`Vendor & model`) } content={ `${ terminalData?.vendor || '' } ${ terminalData?.model || '' }` }/>
                    <InfoCardSmall label={ i18n._(t`Fiscal ID`) } content={ terminalData?.fiscalCardId || '-' }/>
                    <InfoCardSmall label={ i18n._(t`Blocking`) }
                        content={
                            terminalData
                                ? terminalData.blocked
                                    ? <BadgeStatus type={ 'error' } label={ i18n._(t`Blocked`) }/>
                                    : <BadgeStatus type={ 'success' } label={ i18n._(t`Not blocked`) }/>
                                : <div/>
                        }
                        withBottomBorder={ false }/>
                    {/* { (terminalData && terminalData.blocked) */ }
                    {/*     ? <InfoCardSmall label={ i18n._(t`Reason for blocking`) } */ }
                    {/*                      content={ terminalData.blockReasons || '-' }/> */ }
                    {/*     : <div/> } */ }
                    {/* <InfoCardSmall label={ i18n._(t`Terminal number in store (label)`) } */ }
                    {/*                content={ terminalData?.label ? terminalData.label : '-' } */ }
                    {/*                withBottomBorder={ false }/> */ }

                </SimpleGrid>
                <Box>
                    <InfoCardSmall label={ i18n._(t`Store name`) }
                        iconLabel={ <BuildingStorefrontIcon/> }
                        content={ storeData ? storeData.name : isLoadingStoreData ? <Loader size={ 16 }/> : '-' }/>
                    <InfoCardSmall label={ i18n._(t`Store address`) }
                        content={ storeData ? storeData.address : isLoadingStoreData ? <Loader size={ 16 }/> : '-' }
                        iconLabel={ <MapPinIcon/> }
                        withBottomBorder={ false }/>
                    {/* <InfoCardSmall label={ i18n._(t`Contract number for using the terminal`) } */ }
                    {/*                content={ terminalData?.contractCode || '-' } */ }
                    {/*                iconLabel={ <IconTag/> } */ }
                    {/*                withBottomBorder={ false } */ }
                    {/* /> */ }
                </Box>


            </SimpleGrid>

            {isFetching && <LoaderOverlay/>}
        </>
    );

};
