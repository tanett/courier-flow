import React, { useState } from 'react';
import { Flex, Tabs } from '@mantine/core';
import { t } from '@lingui/macro';
import { useStyles } from 'features/sales-details/ui/styles';
import { useLingui } from '@lingui/react';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { queryParamsNames } from 'app/config/api-constants';
import { PrintReceiptButton } from 'features/print-receipt-button';
import { NotFound } from 'shared/ui/not-found/not-found';
import { useGetAdvanceByIdQuery } from '../../../entities/advances/api/api';
import { AdvancesDetailsCommon } from 'features/advances-details/ui/advances-details-common';
import { AdvancesDetailsSoldProductsList } from 'features/advances-details/ui/advances-details-sold-products-list';
import { AdvancesDetailsPaymentsList } from 'features/advances-details/ui/advances-details-payments-list';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { routerPaths } from 'app/config/router-paths';

export const enum TYPE_TABS {
    COMMON = 'common',
    SOLD_PRODUCTS = 'sold-products',
    PAYMENTS = 'payments'
}

const AdvancesDetails: React.FC<{ advanceId: string }> = ({ advanceId }) => {

    const { classes } = useStyles();

    const { i18n } = useLingui();

    const urlParams = useUrlParams();


    const [ tab, setTab ] = useState<TYPE_TABS | null>(TYPE_TABS.COMMON);


    const tabFromUrl = urlParams.getFilterValue('tab');
    if (tabFromUrl && tabFromUrl !== tab && typeof tabFromUrl === 'string') {

        setTab(tabFromUrl as TYPE_TABS);

    }

    const {
        data: advanceData,
        isFetching,
        error
    } = useGetAdvanceByIdQuery(advanceId);


    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Advances`), path: routerPaths.advances },
                    { name: advanceData?.publicId || '---' }
                ] }/> }

            />
        { error
            ? <Flex sx={ {
                height: '80vh',
                alignItems: 'center'
            } }><NotFound/></Flex>
            : <Tabs
                defaultValue={ TYPE_TABS.COMMON }
                className={ classes.tab }
                variant="outline"
                value={ tab }
                onTabChange={ (value) => {

                    urlParams.setSearchParams({ [queryParamsNames.filtersString]: urlParams.filtersToUri({ tab: value }) });

                } }
            >
                <div className={ classes.tabsButtonsBlock }><PrintReceiptButton id={ 'print-receipt' }/></div>
                <Tabs.List>
                    <Tabs.Tab value={ TYPE_TABS.COMMON }>{ i18n._(t`Main`) }</Tabs.Tab>
                    <Tabs.Tab value={ TYPE_TABS.SOLD_PRODUCTS }>{ i18n._(t`Sold products`) }</Tabs.Tab>
                    <Tabs.Tab value={ TYPE_TABS.PAYMENTS }>{ i18n._(t`Payments`) }</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value={ TYPE_TABS.COMMON }><AdvancesDetailsCommon advanceData={ advanceData } isFetching={ isFetching }/></Tabs.Panel>
                <Tabs.Panel value={ TYPE_TABS.SOLD_PRODUCTS }><AdvancesDetailsSoldProductsList advanceData={ advanceData } isFetching={ isFetching }/></Tabs.Panel>
                <Tabs.Panel value={ TYPE_TABS.PAYMENTS }><AdvancesDetailsPaymentsList advanceData={ advanceData } isFetching={ isFetching }/></Tabs.Panel>
            </Tabs>
        }</DashboardContent>);

};

export default AdvancesDetails;
