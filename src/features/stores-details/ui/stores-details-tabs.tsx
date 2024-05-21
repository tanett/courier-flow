import React, { useState } from 'react';
import { Flex, Tabs } from '@mantine/core';
import { t } from '@lingui/macro';
import { useStyles } from 'features/stores-details/ui/styles';
import { useLingui } from '@lingui/react';
import { StoresDetailsUsers } from 'features/stores-details-users';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { queryParamsNames } from 'app/config/api-constants';
import { StoreDetailsCommon } from 'features/stores-details-common';
import { useGetStoreByIdQuery } from '../../../entities/stores/api/api';
import { NotFound } from 'shared/ui/not-found/not-found';

const enum TYPE_TABS {
    COMMON = 'common',
    USERS = 'users'
}

const StoresDetailsTabs: React.FC<{ storeId: string }> = ({ storeId }) => {

    const { classes } = useStyles();

    const { i18n } = useLingui();

    const urlParams = useUrlParams();


    const [ tab, setTab ] = useState<TYPE_TABS | null>(TYPE_TABS.COMMON);


    const tabFromUrl = urlParams.getFilterValue('tab');
    if (tabFromUrl && tabFromUrl !== tab && typeof tabFromUrl === 'string') {

        setTab(tabFromUrl as TYPE_TABS);

    }

    const {
        data: storeData,
        isFetching,
        error
    } = useGetStoreByIdQuery(storeId);

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
                onTabChange={ (value) => {

                    urlParams.setSearchParams({ [queryParamsNames.filtersString]: urlParams.filtersToUri({ tab: value }) });

                } }
            >
                <Tabs.List>
                    <Tabs.Tab value={ TYPE_TABS.COMMON }>{ i18n._(t`Store`) }</Tabs.Tab>
                    <Tabs.Tab value={ TYPE_TABS.USERS }>{ i18n._(t`Employees list`) }</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value={ TYPE_TABS.COMMON }><StoreDetailsCommon storeData={ storeData } isFetching={isFetching}/></Tabs.Panel>
                <Tabs.Panel value={ TYPE_TABS.USERS }><StoresDetailsUsers storeId={ storeId }/></Tabs.Panel>
            </Tabs>
    );

};

export default StoresDetailsTabs;
