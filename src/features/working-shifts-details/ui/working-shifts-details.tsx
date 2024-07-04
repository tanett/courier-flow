import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, useMantineTheme, Loader, Text, Flex } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { InfoCardSmall } from 'shared/ui/info-card-small';
import { BuildingStorefrontIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';

import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { useGetWorkingShiftsByIdQuery } from '../../../entities/working-shifts/api/api';
import dayjs from 'dayjs';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { routerPaths } from 'app/config/router-paths';
import DateTimeInLine from 'shared/ui/date-time-in-line/date-time-in-line';


export const WorkingShiftDetails: React.FC<{ id: string }> = ({ id }) => {

    const theme = useMantineTheme();

    const { i18n } = useLingui();

    const {
        data,
        isFetching,
    } = useGetWorkingShiftsByIdQuery(id);


    // const [
    //     getStoreById, { isFetching: isLoadingStoreData }
    // ] = useLazyGetStoreByIdQuery();

    // const [ storeData, setStoreData ] = useState<typeStore | undefined>();
    //
    // useEffect(() => {
    //
    //     if (terminalData && terminalData.storeId) {
    //
    //         const store = getStoreById(terminalData.storeId).unwrap();
    //         store.then(store => setStoreData(store));
    //
    //     }
    //
    // }, [ terminalData ]);

    return (
        <>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Working shifts`), path: routerPaths.working_shifts },
                    { name: data?.terminalSerialNumber || '---' },

                ]}/>}
            />

            <SimpleGrid
                sx={ {
                    border: `1px solid ${ theme.colors.borderColor[0] }`,
                    borderRadius: '8px',
                    padding: '10px 16px',
                    marginTop: '-1px',
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
                        spacing: 30,
                    }
                ] }>


                <InfoCardSmall label={ i18n._(t`Starting date`) } content={
                   data ? <DateTimeInLine date={data.openedAt}/> : '-'
                }/>
                <InfoCardSmall label={ i18n._(t`Closing date`) } content={
                    data ? <DateTimeInLine date={data.closedAt}/> : '-'
                }/>
                <InfoCardSmall label={ i18n._(t`Shift opened by`) } content={ 'data?.shiftOpenedBy ' || '-' }/>
                <InfoCardSmall label={ i18n._(t`Shift closed by`) } content={ 'data?.Shift closed by ' || '-' }/>
                <InfoCardSmall label={ i18n._(t`Store name`) }
                               iconLabel={ <BuildingStorefrontIcon/> }
                               content={ data ? data.storeName : '-' }
                               withBottomBorder={ false }/>
                <div/>
                <InfoCardSmall label={ i18n._(t`Cashier`) }
                               iconLabel={ <UserIcon/> }
                               content={ data ? data.storeName : '-' }
                               withBottomBorder={ false }/>
                <div/>

            </SimpleGrid>
            <SimpleGrid
                sx={ {
                    border: `1px solid ${ theme.colors.borderColor[0] }`,
                    borderRadius: '8px',
                    padding: '10px 16px',
                    marginTop: '-1px',
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
                        spacing: 30,
                    }
                ] }>


                <InfoCardSmall label={ i18n._(t`Number of sales`) } content={
                    data?.salesCount ? data.salesCount : '-'
                }/>
                <InfoCardSmall label={ i18n._(t`Sales amount`) } content={
                    'sales amount'
                }/>
                <InfoCardSmall label={ i18n._(t`Cash payment`) } content={ data?.totalCashIncome ? numberCurrencyFormat(data.totalCashIncome) : '-' }/>
                <div/>
                <InfoCardSmall label={ i18n._(t`Card payment`) } content={ data?.totalCardIncome ? numberCurrencyFormat(data.totalCardIncome) : '-' } withBottomBorder={ false }/>
                <InfoCardSmall label={ i18n._(t`QR payment`) } content={ data?.totalQRIncome ? numberCurrencyFormat(data.totalQRIncome) : '-' } withBottomBorder={ false }/>
                <InfoCardSmall label={ i18n._(t`Transfer payment`) } content={ data?.totalTransferIncome ? numberCurrencyFormat(data.totalTransferIncome) : '-' } withBottomBorder={ false }/>
                <InfoCardSmall label={ i18n._(t`EPS payment`) } content={ data?.totalOtherIncome ? numberCurrencyFormat(data.totalOtherIncome) : '-' } withBottomBorder={ false }/>

            </SimpleGrid>

            { isFetching && <LoaderOverlay/> }
        </>
    );

};
