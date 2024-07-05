import React from 'react';
import { Loader, SimpleGrid, useMantineTheme, } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { InfoCardSmall } from 'shared/ui/info-card-small';
import { BuildingStorefrontIcon, UserIcon } from '@heroicons/react/24/outline';

import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { routerPaths } from 'app/config/router-paths';
import DateTimeInLine from 'shared/ui/date-time-in-line/date-time-in-line';
import { getAmountSalePayments } from '../../../entities/working-shifts/helpers/get-amount-sale-payments';
import { useGetData } from '../hooks/use-get-data';
import { getAmountRefunds } from '../../../entities/working-shifts/helpers/get-amount-refunds';


export const WorkingShiftDetails: React.FC<{ id: string }> = ({ id }) => {

    const theme = useMantineTheme();

    const { i18n } = useLingui();

    const {
        data,
        isFetching,
        isUserFetching
    } = useGetData(id);


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
                } alignSelfStretch={true}/>
                <InfoCardSmall label={ i18n._(t`Closing date`) } content={
                    data ? <DateTimeInLine date={data.closedAt}/> : '-'
                } alignSelfStretch={true}/>
                <InfoCardSmall label={ i18n._(t`Shift opened by`) } content={ data ? isUserFetching ? <Loader size={'xs'}/> :data.openedByName : '-' }/>
                <InfoCardSmall label={ i18n._(t`Shift closed by`) } content={  data ? isUserFetching ? <Loader size={'xs'}/> :data.closedByName : '-'  }/>
                <InfoCardSmall label={ i18n._(t`Store name`) }
                               iconLabel={ <BuildingStorefrontIcon/> }
                               content={ data ? data.storeName : '-' }
                               withBottomBorder={ false }/>
                <div/>
                <InfoCardSmall label={ i18n._(t`Cashier`) }
                               iconLabel={ <UserIcon/> }
                               content={ data ? data.cashierName : '-' }
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
                   data? numberCurrencyFormat(getAmountSalePayments(data)) : '-'
                }/>
                <InfoCardSmall label={ i18n._(t`Cash payment`) } content={ data?.totalCashIncome ? numberCurrencyFormat(data.totalCashIncome) : '-' }/>
                <div/>
                <InfoCardSmall label={ i18n._(t`Card payment`) } content={ data?.totalCardIncome ? numberCurrencyFormat(data.totalCardIncome) : '-' } withBottomBorder={ false }/>
                <InfoCardSmall label={ i18n._(t`QR payment`) } content={ data?.totalQRIncome ? numberCurrencyFormat(data.totalQRIncome) : '-' } withBottomBorder={ false }/>
                <InfoCardSmall label={ i18n._(t`Transfer payment`) } content={ data?.totalTransferIncome ? numberCurrencyFormat(data.totalTransferIncome) : '-' } withBottomBorder={ false }/>
                <InfoCardSmall label={ i18n._(t`EPS payment`) } content={ data?.totalOtherIncome ? numberCurrencyFormat(data.totalOtherIncome) : '-' } withBottomBorder={ false }/>

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


                <InfoCardSmall label={ i18n._(t`Number of returns`) } content={
                    data?.refundsCount ? data.refundsCount : '-'
                }/>
                <InfoCardSmall label={ i18n._(t`Return amount`) } content={
                    data? numberCurrencyFormat(getAmountRefunds(data)) : '-'
                }/>
                <InfoCardSmall label={ i18n._(t`Cash refunds`) } content={ data?.totalCashRefunds ? numberCurrencyFormat(data.totalCashRefunds) : '-' }/>
                <div/>
                <InfoCardSmall label={ i18n._(t`Card refunds`) } content={ data?.totalCardRefunds ? numberCurrencyFormat(data.totalCardRefunds) : '-' } withBottomBorder={ false }/>
                <InfoCardSmall label={ i18n._(t`QR refunds`) } content={ data?.totalQRRefunds ? numberCurrencyFormat(data.totalQRRefunds) : '-' } withBottomBorder={ false }/>
                <InfoCardSmall label={ i18n._(t`Transfer refunds`) } content={ data?.totalTransferRefunds ? numberCurrencyFormat(data.totalTransferRefunds) : '-' } withBottomBorder={ false }/>

            </SimpleGrid>
            { isFetching && <LoaderOverlay/> }
        </>
    );

};
