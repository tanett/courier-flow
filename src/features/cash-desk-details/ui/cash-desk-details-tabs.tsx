import React, { useState } from 'react';
import { ActionIcon, Flex, Tabs, Tooltip, useMantineTheme } from '@mantine/core';
import { t } from '@lingui/macro';
import { useStyles } from 'features/products-details/ui/styles';
import { useLingui } from '@lingui/react';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { NotFound } from 'shared/ui/not-found/not-found';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useGetCashDeskByIdQuery } from '../../../entities/cash-desk/api/api';
import { CashDeskDetailsCommon } from './cash-desk-details-common';
import { CashDeskDetailsOperations } from './cash-desk-details-operations/cash-desk-details-operations';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from '../../../app/config/router-paths';

const enum TYPE_TABS {
    MAIN = 'main',
    OPERATIONS = 'operations'
}

const CashDeskDetailsTabs: React.FC<{ cashDeskId: string }> = ({ cashDeskId }) => {

    const { classes } = useStyles();

    const { i18n } = useLingui();

    const urlParams = useUrlParams();

    const theme = useMantineTheme();

    const navigate = useNavigate();

    const [ tab, setTab ] = useState<TYPE_TABS | null>(TYPE_TABS.MAIN);

    if (urlParams.tab && urlParams.tab !== tab) setTab(urlParams.tab as TYPE_TABS);

    const {
        data: cashDeskData,
        isFetching,
        error,
    } = useGetCashDeskByIdQuery(cashDeskId);

    const goToEditPage = (id: string | number) => navigate([ routerPaths.cash_desks, id.toString(), 'edit' ].join('/'));


    return (
        error
            ? <Flex sx={ {
                height: '70vh',
                alignItems: 'center',
            } }><NotFound/></Flex>
            :
            <Tabs
                defaultValue={ TYPE_TABS.MAIN }
                className={ classes.tab }
                variant="outline"
                value={ tab }
                onTabChange={ (value) => urlParams.setNewTab(value) }
            >
                <Flex justify="space-between" align={'end'}>
                    <Tabs.List className={ classes.tab}>
                        <Tabs.Tab value={ TYPE_TABS.MAIN }>{ i18n._(t`Main`) }</Tabs.Tab>
                        <Tabs.Tab value={ TYPE_TABS.OPERATIONS }>{ i18n._(t`Operations`) }</Tabs.Tab>
                    </Tabs.List>
                    <Flex align={'center'} justify={'center'} h={ 36 }>
                        <Tooltip withArrow arrowSize={ 6 } radius="md" label={ i18n._(t`Go to editing page`) }>
                            <ActionIcon variant="subtle" onClick={ (e) => {

                                e.stopPropagation();

                                goToEditPage(cashDeskId);

                            } }>
                                <PencilSquareIcon color={ theme.colors.primary[ 5 ] } width={ 24 } height={ 24 }/>
                            </ActionIcon>
                        </Tooltip>
                    </Flex>
                </Flex>

                <Tabs.Panel value={ TYPE_TABS.MAIN }>{ <CashDeskDetailsCommon cashDeskData={ cashDeskData } isFetching={isFetching}/> }</Tabs.Panel>
                <Tabs.Panel value={ TYPE_TABS.OPERATIONS }>{ <CashDeskDetailsOperations
                    cashDeskId={ cashDeskData?.id }
                    storeId={cashDeskData?.storeId}
                    isFetching={isFetching}
                />}</Tabs.Panel>
            </Tabs>
    );

};

export default CashDeskDetailsTabs;
