import React from 'react';
import { Button, Flex } from '@mantine/core';
import { useStyles } from './styles';
import { Trans } from '@lingui/macro';
import { PlusIcon } from '@heroicons/react/24/outline';
import { routerPaths } from '../../../app/config/router-paths';
import { useNavigate } from 'react-router-dom';


export const CashDeskListButtonsPanel: React.FC = () => {

    const { classes } = useStyles();

    const navigate = useNavigate();

    // const isAllowExportSales = useIsAllowedPermissions(readSalesPermissions); // todo check it

    const isAllowExportSales = true;

    const goToCreatePage = () => navigate(routerPaths.cash_desks_create);


    return (<>
        <Flex className={classes.wrapper}>
            {isAllowExportSales && <Button
                leftIcon={ <PlusIcon className={ classes.menuButtonIcon }/> }
                onClick={ goToCreatePage }
            >
                <Trans>Create</Trans>
            </Button> }

        </Flex>
    </>);

};
