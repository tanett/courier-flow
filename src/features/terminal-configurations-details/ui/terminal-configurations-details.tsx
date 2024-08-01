import React, { useState } from 'react';
import { useStyles } from './styles';
import { CONFIGURATION_TYPE_TABS } from '../types/types';
import { ActionIcon,  Flex, Tabs, Tooltip, useMantineTheme } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { generatePath, useNavigate } from 'react-router-dom';
import ListStoresTerminals from './list-stores&terminals/list-stores-terminals';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { queryParamsNames } from 'app/config/api-constants';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { routerPaths } from 'app/config/router-paths';
import useGetTerminalConfigurationsDataByIdFromUrl from '../../../entities/terminals-configurations/hooks/use-get-terminal-configurations-data-by-id-from-url';
import ListModules from 'features/terminal-configurations-details/ui/list-modules/list-modules';
import ListCategoriesForTerminals from 'features/terminal-configurations-details/ui/list-categories-for-terminal/list-categories-for-terminals';


export const TerminalConfigurationsDetails: React.FC<{ id: string }> = ({ id }) => {

    const { classes } = useStyles();
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const { i18n } = useLingui();

    const urlParams = useUrlParams();


    const [ tab, setTab ] = useState<CONFIGURATION_TYPE_TABS | null>(CONFIGURATION_TYPE_TABS.STORES);


    if (urlParams.tab && urlParams.tab !== tab ) {

        setTab(urlParams.tab as CONFIGURATION_TYPE_TABS);

    }

    const {data, isFetching, } = useGetTerminalConfigurationsDataByIdFromUrl()

    const goToEditPage = (id: string | number) => navigate(generatePath(routerPaths.terminals_configurations_edit,{id: id}), );

    return (


        <Flex className={ classes.flexColumn }>

            <Tabs
                defaultValue={ CONFIGURATION_TYPE_TABS.STORES }
                className={ classes.tab }
                variant="outline"
                value={ tab }
                onTabChange={ (value) =>   urlParams.setNewTab( value ) }

            >
                <Flex justify="space-between" align={'end'}>
                    <Tabs.List>
                        <Tabs.Tab value={ CONFIGURATION_TYPE_TABS.STORES }>{ i18n._(t`Stores & Terminal SN`) }</Tabs.Tab>
                        <Tabs.Tab value={ CONFIGURATION_TYPE_TABS.CATEGORIES }>{ i18n._(t`Categories`) }</Tabs.Tab>
                        <Tabs.Tab value={ CONFIGURATION_TYPE_TABS.MODULES }>{ i18n._(t`Modules`) }</Tabs.Tab>
                    </Tabs.List>
                    <Flex align={'center'} justify={'center'} h={ 36 }>
                        <Tooltip withArrow arrowSize={ 6 } radius="md" label={ i18n._(t`Go to editing page`) }>
                            <ActionIcon variant="subtle" onClick={ (e) => {
                                e.stopPropagation();

                                goToEditPage(id);
                            } }>
                                <PencilSquareIcon color={ theme.colors.primary[5] } width={ 24 } height={ 24 }/>
                            </ActionIcon>
                        </Tooltip>
                    </Flex>
                </Flex>
                <Tabs.Panel value={ CONFIGURATION_TYPE_TABS.STORES }>
                    <ListStoresTerminals data={ data }/>
                </Tabs.Panel>
                <Tabs.Panel value={ CONFIGURATION_TYPE_TABS.CATEGORIES }>{data && <ListCategoriesForTerminals data={data}/> }</Tabs.Panel>
                <Tabs.Panel value={ CONFIGURATION_TYPE_TABS.MODULES }>{data && <ListModules data={ data }/> }</Tabs.Panel>
            </Tabs>
        </Flex>


    );

};
