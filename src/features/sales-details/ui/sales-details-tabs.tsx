import React, { useState } from 'react';
import { Tabs } from '@mantine/core';
import { t } from '@lingui/macro';
import { useStyles } from 'features/sales-details/ui/styles';
import { useLingui } from '@lingui/react';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { queryParamsNames } from 'app/config/api-constants';
import { useGetSaleByIdQuery } from '../../../entities/sales/api/api';
import { SalesDetailsCommon } from 'features/sales-details-common';

const enum TYPE_TABS {
    COMMON = 'common',
    SOLD_PRODUCTS = 'sold-products',
    PAYMENTS = 'payments'
}

const SalesDetailsTabs: React.FC<{ salesId: string }> = ({ salesId }) => {

    const { classes } = useStyles();

    const { i18n } = useLingui();

    const urlParams = useUrlParams();


    const [ tab, setTab ] = useState<TYPE_TABS | null>(TYPE_TABS.COMMON);


    const tabFromUrl = urlParams.getFilterValue('tab');
    if (tabFromUrl && tabFromUrl !== tab && typeof tabFromUrl === 'string') {

        setTab(tabFromUrl as TYPE_TABS);

    }

    const {
        data: saleData,
        isFetching,
    } = useGetSaleByIdQuery(salesId);


    return (
        <Tabs
            defaultValue={ TYPE_TABS.COMMON }
            className={ classes.tab }
            variant="outline"
            value={ tab }
            onTabChange={(value) => {

                urlParams.setSearchParams({ [ queryParamsNames.filtersString ]: urlParams.filtersToUri({ tab: value }) });

            }}
        >
            <Tabs.List>
                <Tabs.Tab value={ TYPE_TABS.COMMON }>{ i18n._(t`Store`) }</Tabs.Tab>
                <Tabs.Tab value={ TYPE_TABS.SOLD_PRODUCTS }>{ i18n._(t`Sold products`) }</Tabs.Tab>
                <Tabs.Tab value={ TYPE_TABS.PAYMENTS }>{ i18n._(t`Payments`) }</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value={ TYPE_TABS.COMMON }><SalesDetailsCommon saleData={ saleData } isFetching={isFetching}/></Tabs.Panel>
            {/* <Tabs.Panel value={ TYPE_TABS.USERS }><StoresDetailsUsers storeId={ storeId }/></Tabs.Panel> */}
        </Tabs>
    );

};

export default SalesDetailsTabs;
