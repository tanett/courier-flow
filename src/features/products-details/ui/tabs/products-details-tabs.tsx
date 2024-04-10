import React, { useState } from 'react';
import { Tabs } from '@mantine/core';
import { t } from '@lingui/macro';
import { useStyles } from './styles';
import { useLingui } from '@lingui/react';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { queryParamsNames } from 'app/config/api-constants';
import { ProductDetails } from 'features/products-details/ui/product-details';
import { ProductDetailsStoresWithPrices } from 'features/product-details-stores';

const enum TYPE_TABS {
    COMMON = 'common',
    STORES = 'stores'
}

const ProductsDetailsTabs: React.FC<{ productId: string }> = ({ productId }) => {

    const { classes } = useStyles();

    const { i18n } = useLingui();

    const urlParams = useUrlParams();


    const [ tab, setTab ] = useState<TYPE_TABS | null>(TYPE_TABS.COMMON);


    const tabFromUrl = urlParams.getFilterValue('tab');
    if (tabFromUrl && tabFromUrl !== tab && typeof tabFromUrl === 'string') {

        setTab(tabFromUrl as TYPE_TABS);

    }


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
                <Tabs.Tab value={ TYPE_TABS.COMMON }>{ i18n._(t`General information`) }</Tabs.Tab>
                <Tabs.Tab value={ TYPE_TABS.STORES }>{ i18n._(t`Stores and prices`) }</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value={ TYPE_TABS.COMMON }><ProductDetails productId={ productId }/></Tabs.Panel>
            <Tabs.Panel value={ TYPE_TABS.STORES }><ProductDetailsStoresWithPrices productId={ productId }/></Tabs.Panel>
        </Tabs>
    );

};

export default ProductsDetailsTabs;
