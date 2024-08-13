import React from 'react';
import { NotFound } from '../../../shared/ui/not-found/not-found';
import { useStyles } from './styles';
import { Flex, SimpleGrid } from '@mantine/core';
import { ZReportDetailsSkeleton } from './skeleton/skeleton';
import { InfoPanel } from '../../../shared/ui/info-panel';
import { t } from '@lingui/macro';
import { i18n } from '@lingui/core';
import { typeZReportDetailsProps } from '../types/types';
import { BuildingStorefrontIcon, MapPinIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';

export const ZReportsDetails: React.FC<typeZReportDetailsProps> = ({ isNotFound, isZReportLoading, zReportData }) => {

    const { classes } = useStyles();

    if (isNotFound === null) return <NotFound/>;

    const openDate = zReportData
        ? new Date(zReportData.createdAt).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        })
        : '-';

    const openTime = zReportData
        ? new Date(zReportData.createdAt).toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
        : '-';

    const closedDate = zReportData
        ? new Date(zReportData.closedAt).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        })
        : '-';

    const closedTime = zReportData
        ? new Date(zReportData.closedAt).toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
        : '-';

    return (<>
        { isZReportLoading && <ZReportDetailsSkeleton/> }
        { zReportData && !isZReportLoading && <Flex className={classes.contentWrapper}>
            <InfoPanel>
                <SimpleGrid className={classes.fourColumn}>

                    <InfoPanel.BlockData label={i18n._(t`Fiscal card ID`)} withUnderline>
                        {zReportData.fiscalModuleId ?? '-'}
                    </InfoPanel.BlockData>

                    <InfoPanel.BlockData label={i18n._(t`Open date`)} withUnderline>
                        {openDate}, <span className={classes.smallText}>{openTime}</span>
                    </InfoPanel.BlockData>

                    <InfoPanel.BlockData label={i18n._(t`Close date`)} withUnderline>
                        {closedDate}, <span className={classes.smallText}>{closedTime}</span>
                    </InfoPanel.BlockData>

                    <div></div>

                    <InfoPanel.BlockData label={i18n._(t`First receipt number`)}>
                        {zReportData.firstReceiptNumber ?? '-'}
                    </InfoPanel.BlockData>

                    <InfoPanel.BlockData label={i18n._(t`Last receipt number`)}>
                        {zReportData.lastReceiptNumber ?? '-'}
                    </InfoPanel.BlockData>

                    <InfoPanel.BlockData label={i18n._(t`INN / PINFL`)}>
                        {zReportData.merchantIdentifierType ?? '-'} / {zReportData.merchantIdentifierValue ?? '-'}
                    </InfoPanel.BlockData>

                </SimpleGrid>

            </InfoPanel>

            <InfoPanel>
                <SimpleGrid className={classes.fourColumn}>

                    <InfoPanel.BlockData label={i18n._(t`Total cash income`)} withUnderline>
                        {zReportData.totalCashIncome.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }) ?? '-'}
                    </InfoPanel.BlockData>

                    <InfoPanel.BlockData label={i18n._(t`Total cashless income`)} withUnderline>
                        {zReportData.totalCashlessIncome.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }) ?? '-'}
                    </InfoPanel.BlockData>

                    <InfoPanel.BlockData label={i18n._(t`Total VAT`)} withUnderline>
                        {zReportData.totalVatIncome.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }) ?? '-'}
                    </InfoPanel.BlockData>

                    <InfoPanel.BlockData label={i18n._(t`Sales count`)} withUnderline>
                        {zReportData.salesCount ?? '-'}
                    </InfoPanel.BlockData>


                    <InfoPanel.BlockData label={i18n._(t`Total cash refunds`)}>
                        {zReportData.totalCashRefunds.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }) ?? '-'}
                    </InfoPanel.BlockData>

                    <InfoPanel.BlockData label={i18n._(t`Total cashless refunds`)}>
                        {zReportData.totalCashlessRefunds.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }) ?? '-'}
                    </InfoPanel.BlockData>

                    <InfoPanel.BlockData label={i18n._(t`Total refunded VAT`)}>
                        {zReportData.totalRefundedVatAmount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }) ?? '-'}
                    </InfoPanel.BlockData>

                    <InfoPanel.BlockData label={i18n._(t`Refunds count`)}>
                        {zReportData.refundsCount ?? '-'}
                    </InfoPanel.BlockData>

                </SimpleGrid>

            </InfoPanel>

            <InfoPanel>
                <SimpleGrid className={classes.twoColumns}>

                    <InfoPanel.BlockData label={i18n._(t`Employee`)} icon={<UserIcon/>} withUnderline>
                        {zReportData.userFullName ?? '-'}
                    </InfoPanel.BlockData>

                    <InfoPanel.BlockData label={i18n._(t`Merchant name`)} icon={<ShoppingCartIcon/>} withUnderline>
                        {zReportData.receiptMerchantName ?? '-'}
                    </InfoPanel.BlockData>

                    <InfoPanel.BlockData label={i18n._(t`Store name`)} icon={<BuildingStorefrontIcon/>}>
                        {zReportData.storeName ?? '-'}
                    </InfoPanel.BlockData>

                    <InfoPanel.BlockData label={i18n._(t`Merchant address`)} icon={<MapPinIcon/>}>
                        {zReportData.receiptAddress ?? '-'}
                    </InfoPanel.BlockData>

                </SimpleGrid>

            </InfoPanel>

            <InfoPanel>
                <SimpleGrid className={classes.fourColumn}>

                    <InfoPanel.BlockData label={i18n._(t`Terminal SN`)} >
                        {zReportData.terminalSerialNumber ?? '-'}
                    </InfoPanel.BlockData>

                    <InfoPanel.BlockData label={i18n._(t`Cashier app version`)} >
                        {zReportData.cashAppVersion ?? '-'}
                    </InfoPanel.BlockData>

                    <InfoPanel.BlockData label={i18n._(t`Payment app version`)} className={classes.colSpan}>
                        {zReportData.paymentAppVersion ?? '-'}
                    </InfoPanel.BlockData>

                </SimpleGrid>

            </InfoPanel>

        </Flex>}
    </>);

};
