import React from 'react';
import { Box, SimpleGrid, Space, useMantineTheme, Text } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { InfoCardSmall } from 'shared/ui/info-card-small';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import ButtonAsLink from 'shared/ui/button-as-link/button-as-link';
import { generatePath, useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import {typeRefund} from "../../../../entities/refunds/model/types";
import DateTimeInLine from 'shared/ui/date-time-in-line/date-time-in-line';


export const MainRefundTab: React.FC<{ refundData: typeRefund | undefined, isFetching: boolean }> = ({
    refundData,
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
                                   content={  refundData?.createdAt? <DateTimeInLine date={ refundData.createdAt } fontSizeDate={'16px'} fontSizeTime={'16px'} colorTimeGray={false}/>: '-' }/>
                    <InfoCardSmall label={ i18n._(t`Total cost`) }
                                   alignSelfStretch={ true }
                                   content={ refundData?.totalPaymentsAmount.toLocaleString(undefined, {style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2}) || '-' }/>
                    <InfoCardSmall label={ i18n._(t`Receipt number`) }
                                   alignSelfStretch={ true }
                                   content={ refundData?.receiptNumber || '-' }/>
                    <InfoCardSmall label={ i18n._(t`Employee name`) }
                                   content={ (refundData && <ButtonAsLink onClick={ () => navigate(generatePath(routerPaths.users_details, {
                                       id: refundData?.id,
                                       userName: refundData?.createdBy
                                   })) } label={ refundData.createdBy }/>) || '-' }/>

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

                    <InfoCardSmall label={ i18n._(t`Store name`) } iconLabel={ <BuildingStorefrontIcon/> }
                                   content={ (refundData && <ButtonAsLink onClick={ () => navigate(generatePath(routerPaths.stores_details, {
                                       id: refundData.storeId,
                                       storeName: refundData.storeName
                                   })) } label={ refundData.storeName }/>) || '-' } withBottomBorder={ false }
                    />
                    <InfoCardSmall label={ i18n._(t`Sale`) } content={ refundData?.salePublicId ? <ButtonAsLink onClick={ () => navigate(generatePath(routerPaths.sales_details, {
                        id: refundData?.salePublicId,
                        publicId: refundData?.salePublicId
                    })) } label={ refundData.salePublicId }/> : '-' } withBottomBorder={ false }/>

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
                               content={ (refundData && <ButtonAsLink onClick={ () => navigate(generatePath(routerPaths.terminals_details, {
                                   id: refundData?.terminalId,
                                   serialNumber: refundData?.terminalSerialNumber
                               })) } label={ refundData.terminalSerialNumber }/>) || '-' }/>
                <InfoCardSmall label={ i18n._(t`Fiscal module ID`) }
                               alignSelfStretch={ true }
                               content={ refundData?.fiscalModuleId || '-' }/>
                <InfoCardSmall label={ i18n._(t`Terminal label`) }
                               alignSelfStretch={ true }
                               content={ refundData?.terminalContractCode || '-' }/> {/* // todo terminal label ! */ }
                <div/>
                <InfoCardSmall label={ i18n._(t`Cashier app version`) }
                               content={ refundData?.cashAppVersion || '-' } withBottomBorder={ false }/>
                <InfoCardSmall label={ i18n._(t`Payment app version`) }
                               content={ refundData?.paymentAppVersion || '-' } withBottomBorder={ false }/>
                <InfoCardSmall label={ i18n._(t`Z-report number`)}
                               content={ refundData?.zreportNumber || '-' } withBottomBorder={ false }/>

            </SimpleGrid>

            { isFetching && <LoaderOverlay/> }
        </>
    );

};
