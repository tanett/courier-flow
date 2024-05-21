import React, { useState } from 'react';
import { Flex, Tabs } from '@mantine/core';
import { t } from '@lingui/macro';
import { useStyles } from 'features/products-details/ui/styles';
import { useLingui } from '@lingui/react';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { queryParamsNames } from 'app/config/api-constants';
import { ProductDetailsCommon } from 'features/products-details-common/ui/product-details-common';
import { ProductDetailsStoresWithPrices } from 'features/product-details-stores';
import { NotFound } from 'shared/ui/not-found/not-found';
import { useGetProductByIdQuery } from '../../../entities/products/api/api';

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

    const {
        data: productData,
        isFetching,
        error
    } = useGetProductByIdQuery(productId);

    return (
        error
            ? <Flex sx={ {
                height: '70vh',
                alignItems: 'center'
            } }><NotFound/></Flex>
            :
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
            <Tabs.Panel value={ TYPE_TABS.COMMON }><ProductDetailsCommon productData={ productData } isFetching={isFetching}/></Tabs.Panel>
            <Tabs.Panel value={ TYPE_TABS.STORES }><ProductDetailsStoresWithPrices productId={ productId }/></Tabs.Panel>
        </Tabs>
    );

};

export default ProductsDetailsTabs;
