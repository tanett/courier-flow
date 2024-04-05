import React, { useState } from 'react';
import { Tabs } from '@mantine/core';
import { t } from '@lingui/macro';
import { useStyles } from './styles';
import { useLingui } from '@lingui/react';
import { StoreDetails } from 'features/stores-details/ui/store-details';
import { StoresDetailsUsers } from 'features/stores-details-users';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { queryParamsNames } from 'app/config/api-constants';

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
                <Tabs.Tab value={ TYPE_TABS.USERS }>{ i18n._(t`Employees list`) }</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value={ TYPE_TABS.COMMON }><StoreDetails storeId={ storeId }/></Tabs.Panel>
            <Tabs.Panel value={ TYPE_TABS.USERS }><StoresDetailsUsers storeId={ storeId }/></Tabs.Panel>
        </Tabs>
    );

};

export default StoresDetailsTabs;
