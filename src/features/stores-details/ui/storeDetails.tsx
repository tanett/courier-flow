import React from 'react';
import { Box, SimpleGrid, useMantineTheme } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { InfoCardSmall } from 'shared/ui/info-card-small';
import { EnvelopeIcon, MapIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useGetStoreByIdQuery } from '../../../entities/stores/api/api';
import { getTransLabelForStoreType } from '../../../entities/stores/constants/store-type-list';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import { LoaderOverlay } from 'shared/ui/loader-overlay';


export const StoreDetails: React.FC<{ storeId: string}> = ({ storeId }) => {

    const theme = useMantineTheme();

    const { i18n } = useLingui();

    const {
        data: storeData,
        isFetching,
    } = useGetStoreByIdQuery(storeId);

    return (
        <>
                <SimpleGrid
                    sx={ {
                        // border: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                        borderRadius: '8px',
                        // padding: '10px 16px',
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
                    <InfoCardSmall label={ i18n._(t`Store type`) } content={ `${ storeData?.type ? getTransLabelForStoreType(storeData.type) : '-' }` }/>

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
                        ] }>

                        <InfoCardSmall label={ i18n._(t`Phone number`) }
                            iconLabel={<PhoneIcon/>}
                            content={ storeData?.phoneNumber ? formatIncompletePhoneNumber(storeData.phoneNumber) : '-' }/>
                        <InfoCardSmall label={ i18n._(t`Email`) }
                            iconLabel={<EnvelopeIcon/>}
                            content={ storeData?.email || '-' }/>
                    </SimpleGrid>
                    <InfoCardSmall label={ i18n._(t`Description`) } content={ storeData?.description || '-' } withBottomBorder={ false }/>
                    <Box>
                        <InfoCardSmall label={ i18n._(t`Locality`) }
                            iconLabel={ <MapIcon/> }
                            content={ storeData?.locality || '-' }/>
                        <InfoCardSmall label={ i18n._(t`Store address`) }
                            content={ storeData?.address || '-' }
                            iconLabel={ <MapPinIcon/> }
                            withBottomBorder={ false }/>

                    </Box>

                </SimpleGrid>
            {isFetching && <LoaderOverlay/>}
            </>
    );

};
