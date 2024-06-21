import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Space, useMantineTheme, Text, Loader } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { InfoCardSmall } from 'shared/ui/info-card-small';
import { BuildingStorefrontIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import dayjs from 'dayjs';
import ButtonAsLink from 'shared/ui/button-as-link/button-as-link';
import { generatePath, useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { typeAdvance } from '../../../../../entities/advances/model/state-slice/types';
import { useLazyGetUserByIdQuery } from '../../../../../entities/users/api/api';
import { useLazyGetTerminalByIdQuery } from '../../../../../entities/terminals/api/api';
import { useLazyGetStoreByIdQuery } from '../../../../../entities/stores/api/api';
import { typeStore } from '../../../../../entities/stores/model/types';
import { typeTerminal } from '../../../../../entities/terminals/model/types';
import { typeUser } from '../../../../../entities/user-profile/model/state-slice';


export const AdvancesDetailsCommon: React.FC<{ advanceData: typeAdvance | undefined, isFetching: boolean }> = ({
    advanceData,
    isFetching
}) => {

    const theme = useMantineTheme();

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const [ getUserData, { isFetching: isUserFetching } ] = useLazyGetUserByIdQuery();
    const [ getTerminalData, { isFetching: isTerminalFetching } ] = useLazyGetTerminalByIdQuery();
    const [ getStoreData, { isFetching: isTStoreFetching } ] = useLazyGetStoreByIdQuery();

    const [ store, setStore ] = useState<typeStore | null>(null);
    const [ terminal, setTerminal ] = useState<typeTerminal | null>(null);
    const [ user, setUser ] = useState<typeUser | null>(null);

    useEffect(() => {
        if (advanceData) {getUserData(advanceData.createdOnTerminalBy).unwrap().then(res => setUser(res)).catch(e => console.error(e));
            getStoreData(advanceData.storeId).unwrap().then(res => setStore(res)).catch(e => console.error(e));
            getTerminalData(advanceData.terminalId).unwrap().then(res => setTerminal(res)).catch(e => console.error(e));

        }
    }, [ advanceData ]);


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
                    <InfoCardSmall label={ i18n._(t`Date & time`) }
                                   alignSelfStretch={ true }
                                   content={ advanceData ? <Text>{ dayjs(advanceData.createdOnTerminalAt).format('DD.MM.YYYY') }, { dayjs(advanceData.createdOnTerminalAt).format('HH:mm:ss') }</Text> : '-' }/>
                    <InfoCardSmall label={ i18n._(t`Store name`) }
                                   iconLabel={ <BuildingStorefrontIcon/> }
                                   alignSelfStretch={ true }
                                   content={isTStoreFetching
                                       ? <Loader size={ 'sm' }/>
                                       :  (advanceData && store && <ButtonAsLink onClick={ () => navigate(generatePath(routerPaths.stores_details, {
                                       id: advanceData?.storeId,
                                       storeName: store.name,
                                   })) } label={ store.name}/>) || '-' }/>


                    <InfoCardSmall label={ i18n._(t`Employee name`) }
                                   iconLabel={ <UserIcon/> }
                                   withBottomBorder={ false }
                                   content={isUserFetching
                                       ? <Loader size={ 'sm' }/>
                                       :  (advanceData && user && <ButtonAsLink onClick={ () => navigate(generatePath(routerPaths.users_details, {
                                       id: advanceData?.createdOnTerminalBy,
                                       userName: user.fullName
                                   })) } label={ user.fullName }/>) || '-' }/>

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

                <InfoCardSmall label={ i18n._(t`Terminal serial number`) }
                               alignSelfStretch={ true }
                               withBottomBorder={ false }
                               content={ (advanceData && <ButtonAsLink onClick={ () => navigate(generatePath(routerPaths.terminals_details, {
                                   id: advanceData?.terminalId,
                                   serialNumber: advanceData?.terminalSerialNumber
                               })) } label={ advanceData.terminalSerialNumber }/>) || '-' }/>

                <InfoCardSmall label={ i18n._(t`Terminal label`) }
                               alignSelfStretch={ true }
                               withBottomBorder={ false }
                               content={ isTerminalFetching ? <Loader size={ 'sm' }/> : terminal?.label || '-' }/>
                <InfoCardSmall label={ i18n._(t`Cashier app version`) }

                               content={ advanceData?.cashAppVersion || '-' } withBottomBorder={ false }/>
                <InfoCardSmall label={ i18n._(t`Payment app version`) }
                               content={ advanceData?.paymentAppVersion || '-' } withBottomBorder={ false }/>

            </SimpleGrid>
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

                <InfoCardSmall label={ i18n._(t`Order`) }
                               alignSelfStretch={ true }
                               content={ advanceData?.orderId ? <ButtonAsLink onClick={ () => console.log('go to order') } label={ advanceData?.orderId }/> : '-' }/>

                <InfoCardSmall label={ i18n._(t`Total cost without discount`) }
                               alignSelfStretch={ true }
                               content={ advanceData ? numberCurrencyFormat(advanceData?.totalCost) : '-' }/> {/* // total cost - totalDiscountAmount    */ }
                <InfoCardSmall label={ i18n._(t`Discount`) }
                               alignSelfStretch={ true }
                               content={ advanceData ? numberCurrencyFormat(advanceData.discountAmount) : '-' }/>
                <div/>

                <InfoCardSmall label={ i18n._(t`Service payment`) }
                               content={ advanceData ? numberCurrencyFormat(advanceData.servicePayment) : '-' } withBottomBorder={ false }/>
                <InfoCardSmall label={ i18n._(t`VAT`) }
                               content={ advanceData ? numberCurrencyFormat(advanceData?.totalVatAmount) : '-' } withBottomBorder={ false }/>
                <InfoCardSmall label={ i18n._(t`Total cost`) }
                               content={ advanceData ? numberCurrencyFormat(advanceData.totalCost) : '-' } withBottomBorder={ false }/>

            </SimpleGrid>
            { isFetching && <LoaderOverlay/> }
        </>
    );

};
