import React, { useState } from 'react';
import { Flex, Tabs } from '@mantine/core';
import { t } from '@lingui/macro';
import { useStyles } from 'features/sales-details/ui/styles';
import { useLingui } from '@lingui/react';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { queryParamsNames } from 'app/config/api-constants';
import { useGetSaleByIdQuery } from '../../../entities/sales/api/api';
import { SalesDetailsCommon } from 'features/sales-details-common';
import { SalesDetailsSoldProductsList } from 'features/sales-details-sold-products-list';
import { SalesDetailsPaymentsList } from 'features/sales-details-payments-list';
import { PrintReceiptButton } from 'features/print-receipt-button';
import { NotFound } from 'shared/ui/not-found/not-found';

export const enum TYPE_TABS {
    COMMON = 'common',
    SOLD_PRODUCTS = 'sold-products',
    PAYMENTS = 'payments'
}

const SalesDetailsTabs: React.FC<{ salesId: string }> = ({ salesId }) => {

    const { classes } = useStyles();

    const { i18n } = useLingui();

    const urlParams = useUrlParams();


    const [ tab, setTab ] = useState<TYPE_TABS | null>(TYPE_TABS.COMMON);

    if (urlParams.tab && urlParams.tab !== tab ) {

        setTab(urlParams.tab as TYPE_TABS);

    }

    const {
        data: saleData,
        isFetching,
        error
    } = useGetSaleByIdQuery(salesId);


    return (
        error
        ?   <Flex sx={{height: '80vh', alignItems: 'center'}}><NotFound/></Flex>
       : <Tabs
            defaultValue={ TYPE_TABS.COMMON }
            className={ classes.tab }
            variant="outline"
            value={ tab }
            onTabChange={ (value) =>   urlParams.setNewTab( value ) }

            >
            <div className={classes.tabsButtonsBlock}><PrintReceiptButton id={salesId}/></div>
            <Tabs.List>
                <Tabs.Tab value={ TYPE_TABS.COMMON }>{ i18n._(t`Main`) }</Tabs.Tab>
                <Tabs.Tab value={ TYPE_TABS.SOLD_PRODUCTS }>{ i18n._(t`Sold products`) }</Tabs.Tab>
                <Tabs.Tab value={ TYPE_TABS.PAYMENTS }>{ i18n._(t`Payments`) }</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value={ TYPE_TABS.COMMON }><SalesDetailsCommon saleData={ saleData } isFetching={isFetching}/></Tabs.Panel>
            <Tabs.Panel value={ TYPE_TABS.SOLD_PRODUCTS }><SalesDetailsSoldProductsList saleData={ saleData } isFetching={isFetching}/></Tabs.Panel>
            <Tabs.Panel value={ TYPE_TABS.PAYMENTS }><SalesDetailsPaymentsList saleData={ saleData } isFetching={isFetching}/></Tabs.Panel>
        </Tabs>
    );

};

export default SalesDetailsTabs;
