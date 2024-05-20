import React from 'react';
import { Box, SimpleGrid, Space, useMantineTheme, Text } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { InfoCardSmall } from 'shared/ui/info-card-small';
import { BuildingStorefrontIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { typeSale } from '../../../entities/sales/model/types';
import dayjs from 'dayjs';
import ButtonAsLink from 'shared/ui/button-as-link/button-as-link';
import { generatePath, useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import PaymentType from 'shared/ui/payment-type/payment-type';


export const SalesDetailsCommon: React.FC<{ saleData: typeSale | undefined, isFetching: boolean }> = ({
    saleData,
    isFetching
}) => {

    const theme = useMantineTheme();

    const { i18n } = useLingui();

    const navigate = useNavigate();

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
                            cols: 2,
                            spacing: 10,
                        },
                        {
                            minWidth: 1200,
                            cols: 4,
                            spacing: 60,
                        }
                    ] }>
                    <InfoCardSmall label={ i18n._(t`Date & time`) }
                                   alignSelfStretch={ true }
                                   content={ saleData ? <Text>{ dayjs(saleData.soldAt).format('DD.MM.YYYY') }, { dayjs(saleData.soldAt).format('HH:mm:ss') }</Text> : '-' }/>
                    <InfoCardSmall label={ i18n._(t`Receipt number`) }
                                   alignSelfStretch={ true }
                                   content={ saleData?.receiptNumber || '-' }/>
                    <InfoCardSmall label={ i18n._(t`Z-report number`) }
                                   alignSelfStretch={ true }
                                   content={ saleData?.zreportNumber || '-' }/>
                    <InfoCardSmall label={ i18n._(t`Employee name`) }
                                   content={ (saleData && <ButtonAsLink onClick={ () => navigate(generatePath(routerPaths.users_details, {
                                       id: saleData?.soldBy,
                                       userName: saleData?.soldByName
                                   })) } label={ saleData.soldByName }/>) || '-' }/>

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
                        spacing: 60,
                    }
                ] }>

                    <InfoCardSmall label={ i18n._(t`Store name`) } iconLabel={ <BuildingStorefrontIcon/> } content={ saleData?.storeName || '-' } withBottomBorder={ false }/>
                    <InfoCardSmall label={ i18n._(t`Store address`) } content={ saleData?.storeAddress || '-' } iconLabel={ <MapPinIcon/> } withBottomBorder={ false }/>

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
                               content={ (saleData && <ButtonAsLink onClick={ () => navigate(generatePath(routerPaths.terminals_details, {
                                   id: saleData?.terminalId,
                                   serialNumber: saleData?.terminalSerialNumber
                               })) } label={ saleData.terminalSerialNumber }/>) || '-' }/>
                <InfoCardSmall label={ i18n._(t`Fiscal module ID`) }
                               alignSelfStretch={ true }
                               content={ saleData?.fiscalModuleId || '-' }/>
                <InfoCardSmall label={ i18n._(t`Terminal label`) }
                               alignSelfStretch={ true }
                               content={ '-' }/> {/* // todo terminal label ! */ }
                <div/>
                <InfoCardSmall label={ i18n._(t`Cashier app version`) }
                               content={ saleData?.cashAppVersion || '-' } withBottomBorder={ false }/>
                <InfoCardSmall label={ i18n._(t`Payment app version`) }
                               content={ saleData?.paymentAppVersion || '-' } withBottomBorder={ false }/>

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
                               content={ saleData?.orderId ?  <ButtonAsLink onClick={ ()=>console.log('go to order') } label={saleData?.orderId}/> : '-' }/>
                <InfoCardSmall label={ i18n._(t`Payment type`) }
                               alignSelfStretch={ true }
                               content={ saleData? <PaymentType sale={ saleData}/> : '-' }/>
                <InfoCardSmall label={ i18n._(t`Total cost without discount`) }
                               alignSelfStretch={ true }
                               content={ saleData ? numberCurrencyFormat(saleData?.totalCost - saleData.totalDiscountAmount) : '-' }/>   {/* // total cost - totalDiscountAmount    */ }
                <InfoCardSmall label={ i18n._(t`Discount`) }
                               alignSelfStretch={ true }
                               content={ saleData? numberCurrencyFormat(saleData.totalDiscountAmount) : '-' }/>

                <InfoCardSmall label={ i18n._(t`Service payment`) }
                               content={ saleData ? numberCurrencyFormat(saleData.servicePayment) : '-' } withBottomBorder={ false }/>
                <InfoCardSmall label={ i18n._(t`VAT`) }
                               content={ saleData ? numberCurrencyFormat(saleData?.totalVatAmount) : '-' } withBottomBorder={ false }/>
                <InfoCardSmall label={ i18n._(t`Total cost`) }
                               content={ saleData ? numberCurrencyFormat(saleData.totalCost) : '-' } withBottomBorder={ false }/>

            </SimpleGrid>
            { isFetching && <LoaderOverlay/> }
        </>
    );

};
