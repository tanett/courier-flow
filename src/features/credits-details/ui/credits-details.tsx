import React, { useState } from 'react';
import { Flex, Tabs } from '@mantine/core';
import { t } from '@lingui/macro';
import { useStyles } from 'features/sales-details/ui/styles';
import { useLingui } from '@lingui/react';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { queryParamsNames } from 'app/config/api-constants';
import { NotFound } from 'shared/ui/not-found/not-found';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { routerPaths } from 'app/config/router-paths';
import { useGetCreditByIdQuery } from '../../../entities/credits/api/api';
import { CreditsDetailsCommon } from 'features/credits-details/ui/credits-details-common/ui/credits-details-common';
import { CreditsDetailsPaymentsList } from 'features/credits-details/ui/credits-details-payments-list';

export const enum TYPE_TABS {
    COMMON = 'common',
    PAYMENTS = 'payments'
}

const CreditsDetails: React.FC<{ creditId: string }> = ({ creditId }) => {

    const { classes } = useStyles();

    const { i18n } = useLingui();

    const urlParams = useUrlParams();


    const [ tab, setTab ] = useState<TYPE_TABS | null>(TYPE_TABS.COMMON);


    const tabFromUrl = urlParams.getFilterValue('tab');
    if (tabFromUrl && tabFromUrl !== tab && typeof tabFromUrl === 'string') {

        setTab(tabFromUrl as TYPE_TABS);

    }

    const {
        data: creditData,
        isFetching,
        error
    } = useGetCreditByIdQuery(creditId);


    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Credits`), path: routerPaths.credits },
                    { name: creditData?.salePublicId || '---' }
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

                <Tabs.List>
                    <Tabs.Tab value={ TYPE_TABS.COMMON }>{ i18n._(t`Main`) }</Tabs.Tab>
                    <Tabs.Tab value={ TYPE_TABS.PAYMENTS }>{ i18n._(t`Payments`) }</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value={ TYPE_TABS.COMMON }><CreditsDetailsCommon isFetching={ isFetching } creditData={creditData}/></Tabs.Panel>
                <Tabs.Panel value={ TYPE_TABS.PAYMENTS }><CreditsDetailsPaymentsList creditData={creditData} isFetching={ isFetching }/></Tabs.Panel>
            </Tabs>
        }</DashboardContent>);

};

export default CreditsDetails;
