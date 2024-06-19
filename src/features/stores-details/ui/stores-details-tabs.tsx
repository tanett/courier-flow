import React, { useState } from 'react';
import { ActionIcon, Flex, Tabs, Tooltip, useMantineTheme } from '@mantine/core';
import { t } from '@lingui/macro';
import { useStyles } from 'features/stores-details/ui/styles';
import { useLingui } from '@lingui/react';
import { StoresDetailsUsers } from 'features/stores-details-users';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { queryParamsNames } from 'app/config/api-constants';
import { StoreDetailsCommon } from 'features/stores-details-common';
import { useGetStoreByIdQuery } from '../../../entities/stores/api/api';
import { NotFound } from 'shared/ui/not-found/not-found';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { generatePath, useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';

const enum TYPE_TABS {
    COMMON = 'common',
    USERS = 'users'
}

const StoresDetailsTabs: React.FC<{ storeId: string, storeName: string }> = ({ storeId, storeName }) => {

    const { classes } = useStyles();

    const theme = useMantineTheme();

    const navigate = useNavigate();

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

    const goToEditPage = (id: string | number) => navigate(generatePath(routerPaths.stores_edit,{id: id}), );


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
                <Flex justify="space-between" align={'end'}>
                    <Tabs.List className={ classes.tab}>
                        <Tabs.Tab value={ TYPE_TABS.COMMON }>{ i18n._(t`Store`) }</Tabs.Tab>
                        <Tabs.Tab value={ TYPE_TABS.USERS }>{ i18n._(t`Employees list`) }</Tabs.Tab>
                    </Tabs.List>
                    <Flex align={'center'} justify={'center'} h={ 36 }>
                        <Tooltip withArrow arrowSize={ 6 } radius="md" label={ i18n._(t`Go to editing page`) }>
                            <ActionIcon variant="subtle" onClick={ (e) => {
                                e.stopPropagation();

                                goToEditPage(storeId);
                            } }>
                                <PencilSquareIcon color={ theme.colors.primary[5] } width={ 24 } height={ 24 }/>
                            </ActionIcon>
                        </Tooltip>
                    </Flex>
                </Flex>

                <Tabs.Panel value={ TYPE_TABS.COMMON }><StoreDetailsCommon storeData={ storeData } isFetching={isFetching}/></Tabs.Panel>
                <Tabs.Panel value={ TYPE_TABS.USERS }><StoresDetailsUsers storeId={ storeId } storeName={ storeName}/></Tabs.Panel>
            </Tabs>
    );

};

export default StoresDetailsTabs;
