import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Space, useMantineTheme, Loader } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { InfoCardSmall } from 'shared/ui/info-card-small';
import { BuildingStorefrontIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import ButtonAsLink from 'shared/ui/button-as-link/button-as-link';
import { generatePath, useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { useLazyGetUserByIdQuery } from '../../../../../entities/users/api/api';
import { useLazyGetTerminalByIdQuery } from '../../../../../entities/terminals/api/api';
import { useLazyGetStoreByIdQuery } from '../../../../../entities/stores/api/api';
import { typeStore } from '../../../../../entities/stores/model/types';
import { typeUser } from '../../../../../entities/user-profile/model/state-slice';
import { typeCredit } from '../../../../../entities/credits/model/types';
import BadgeStatus from 'shared/ui/badge-status/badge-status';
import DateTimeInLine from 'shared/ui/date-time-in-line/date-time-in-line';


export const CreditsDetailsCommon: React.FC<{ creditData: typeCredit | undefined, isFetching: boolean }> = ({
    creditData,
    isFetching
}) => {

    const theme = useMantineTheme();

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const [ getUserData, { isFetching: isUserFetching } ] = useLazyGetUserByIdQuery();
    const [ getTerminalData, { isFetching: isTerminalFetching } ] = useLazyGetTerminalByIdQuery();
    const [ getStoreData, { isFetching: isTStoreFetching } ] = useLazyGetStoreByIdQuery();

    const [ store, setStore ] = useState<typeStore | null>(null);
    const [ user, setUser ] = useState<typeUser | null>(null);

    useEffect(() => {
        if (creditData) {getUserData(creditData.createdOnTerminalBy).unwrap().then(res => setUser(res)).catch(e => console.error(e));
            getStoreData(creditData.storeId).unwrap().then(res => setStore(res)).catch(e => console.error(e));

        }
    }, [ creditData ]);


    return (
        <>
            <Box sx={ {
                border: `1px solid ${ theme.colors.borderColor[0] }`,
                borderTopRightRadius: '8px',
                borderBottomRightRadius: '8px',
                borderBottomLeftRadius: '8px',
                padding: '10px 16px',
                marginTop: '-1px',
                backgroundColor: theme.white,
            } }>

                <SimpleGrid

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
                                cols: 1,
                                spacing: 10,
                            },
                            {
                                minWidth: 1200,
                                cols: 2,
                                spacing: 60,
                            }
                        ] }>
                        <InfoCardSmall label={ i18n._(t`Date & time`) }
                                       alignSelfStretch={ true }
                                       content={ creditData ? <DateTimeInLine date={ creditData.createdOnTerminalAt} fontSizeDate={'16px'} fontSizeTime={'16px'} colorTimeGray={false}/>: '-' }/>

                        <InfoCardSmall label={ i18n._(t`Terminal serial number`) }
                                       alignSelfStretch={ true }
                                       content={ (creditData && <ButtonAsLink onClick={ () => navigate(generatePath(routerPaths.terminals_details, {
                                           id: creditData?.terminalId,
                                           serialNumber: creditData?.terminalSerialNumber
                                       })) } label={ creditData.terminalSerialNumber }/>) || '-' }/>
                    </SimpleGrid>


                        <InfoCardSmall label={ i18n._(t`Employee name`) }
                                       iconLabel={ <UserIcon/> }

                                       content={isUserFetching
                                           ? <Loader size={ 'sm' }/>
                                           :  (creditData && user && <ButtonAsLink onClick={ () => navigate(generatePath(routerPaths.users_details, {
                                           id: creditData?.createdOnTerminalBy,
                                           userName: user.fullName
                                       })) } label={ user.fullName }/>) || '-' }/>




                    <InfoCardSmall label={ i18n._(t`Store name`) }
                                   iconLabel={ <BuildingStorefrontIcon/> }
                                   alignSelfStretch={ true }
                                   withBottomBorder={false}
                                   content={isTStoreFetching
                                       ? <Loader size={ 'sm' }/>
                                       :  (creditData && store && <ButtonAsLink onClick={ () => navigate(generatePath(routerPaths.stores_details, {
                                       id: creditData?.storeId,
                                       storeName: store.name,
                                   })) } label={ store.name}/>) || '-' }/>

                    <InfoCardSmall label={ i18n._(t`Store address`) }
                                   iconLabel={ <MapPinIcon/> }
                                   withBottomBorder={ false }
                                   alignSelfStretch={ true }
                                   content={ isTStoreFetching ? <Loader size={ 'sm' }/> : store?.address || '-' }/>
                </SimpleGrid>
            </Box>
            <Space h={ 16 }/>
            <SimpleGrid
                sx={ {
                    border: `1px solid ${ theme.colors.borderColor[0] }`,
                    borderRadius: '8px',
                    padding: '10px 16px',
                    backgroundColor: theme.white,
                } }
                breakpoints={ [
                    {
                        minWidth: 'md',
                        cols: 2,
                        spacing: 10,
                    },
                    {
                        minWidth: 1200,
                        cols: 4,
                        spacing: 60,
                    }
                ] }>

                <InfoCardSmall label={ i18n._(t`Amount`) }
                               alignSelfStretch={ true }
                               withBottomBorder={ false }
                               content={ numberCurrencyFormat(creditData?.amount  || 0) }/>

                <InfoCardSmall label={ i18n._(t`Paid`) }
                               alignSelfStretch={ true }
                               withBottomBorder={ false }
                               content={ numberCurrencyFormat(creditData?.paidAmount  || 0) }/>

                <InfoCardSmall label={ i18n._(t`Rest`) }
                               alignSelfStretch={ true }
                               withBottomBorder={ false }
                               content={creditData?.paidAmount ? numberCurrencyFormat(creditData.notPaidAmount) : '-'}/>
                <InfoCardSmall label={ i18n._(t`State`) }
                               alignSelfStretch={ true }
                               withBottomBorder={ false }
                               content={creditData?.status === 'PAID'
                                   ? <BadgeStatus type={ 'success' } label={ i18n._(t`Paid`) }/>
                                   : <BadgeStatus type={ 'error' } label={ i18n._(t`Not paid`) }/>}/>
            </SimpleGrid>

            { isFetching && <LoaderOverlay/> }
        </>
    );

};
