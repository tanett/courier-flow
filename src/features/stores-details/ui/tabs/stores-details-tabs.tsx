import React from 'react';
import { Tabs } from '@mantine/core';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { t } from '@lingui/macro';
import { useStyles } from './styles';
import { useLingui } from '@lingui/react';
import { StoreDetails } from 'features/stores-details/ui/storeDetails';

const StoresDetailsTabs: React.FC<{storeId: string}> = ({storeId}) => {

    const { classes } = useStyles();

    const { i18n } = useLingui();

    return (
        <Tabs
            defaultValue="common"
            className={classes.tab}
            variant="outline">
            <Tabs.List>
                <Tabs.Tab value={'common'}>{i18n._(t`Store`)}</Tabs.Tab>
                <Tabs.Tab value={'users'}>{i18n._(t`Employees list`)}</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value={'common'}><StoreDetails storeId={storeId}/></Tabs.Panel>
            <Tabs.Panel value={'users'}>users</Tabs.Panel>
        </Tabs>
    );

};

export default StoresDetailsTabs;
