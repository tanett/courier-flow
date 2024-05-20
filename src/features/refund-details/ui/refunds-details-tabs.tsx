import React, { useState } from 'react';
import { Tabs } from '@mantine/core';
import { t } from '@lingui/macro';
import { useStyles } from 'features/sales-details/ui/styles';
import { useLingui } from '@lingui/react';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { queryParamsNames } from 'app/config/api-constants';
import { useGetSaleByIdQuery } from '../../../entities/sales/api/api';
import { SalesDetailsCommon } from 'features/sales-details-common';
import {MainRefundTab} from "./tabs/main-refund-tab";
import {useGetRefundByIdQuery} from "../../../entities/refunds/api/api";
import {typeRefund} from "../../../entities/refunds/model/types";

const enum TYPE_TABS {
    MAIN = 'main',
    REFUND_PRODUCTS = 'refund-products',
    PAYMENTS = 'payments'
}

const RefundsDetailsTabs: React.FC<{ refundId: string }> = ({ refundId }) => {

    const { classes } = useStyles();

    const { i18n } = useLingui();

    const urlParams = useUrlParams();


    const [ tab, setTab ] = useState<TYPE_TABS | null>(TYPE_TABS.MAIN);


    const tabFromUrl = urlParams.getFilterValue('tab');
    if (tabFromUrl && tabFromUrl !== tab && typeof tabFromUrl === 'string') {

        setTab(tabFromUrl as TYPE_TABS);

    }

    const {
        data,
        isFetching,
    } = useGetRefundByIdQuery(refundId);


    return (
        <Tabs
            defaultValue={ TYPE_TABS.MAIN }
            className={ classes.tab }
            variant="outline"
            value={ tab }
            onTabChange={(value) => {

                urlParams.setSearchParams({ [ queryParamsNames.filtersString ]: urlParams.filtersToUri({ tab: value }) });

            }}
        >
            <Tabs.List>
                <Tabs.Tab value={ TYPE_TABS.MAIN }>{ i18n._(t`Main`) }</Tabs.Tab>
                <Tabs.Tab value={ TYPE_TABS.REFUND_PRODUCTS }>{ i18n._(t`Refunded products`) }</Tabs.Tab>
                <Tabs.Tab value={ TYPE_TABS.PAYMENTS }>{ i18n._(t`Payments`) }</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value={ TYPE_TABS.MAIN }><MainRefundTab refundData={data} isFetching={isFetching}/></Tabs.Panel>
            <Tabs.Panel value={ TYPE_TABS.REFUND_PRODUCTS }>refund products</Tabs.Panel>
            <Tabs.Panel value={ TYPE_TABS.PAYMENTS }>refund products</Tabs.Panel>
        </Tabs>
    );

};

export default RefundsDetailsTabs;
