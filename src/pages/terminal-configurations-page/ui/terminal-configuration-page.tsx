import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { addTerminalConfigurationsPermissions, } from 'app/config/permissions-config';
import { useNavigate } from 'react-router-dom';
import { CreateButtonFilled } from 'shared/ui/create-button-filled/create-button-filled';
import { routerPaths } from 'app/config/router-paths';
import { TerminalConfigurationsList } from 'features/terminal-configurations-list';

const TerminalConfigurationPage: React.FC = () => {

    const { i18n } = useLingui();

    const navigate = useNavigate();


    const isAllowAdd = useIsAllowedPermissions(addTerminalConfigurationsPermissions);

    const onCreate = () => {

        navigate(routerPaths.terminals_configurations_create);

    };


    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Configurations`) }
                ] }/> }
                rightSide={
                    isAllowAdd && <CreateButtonFilled
                        id={ 'create-new-terminal-configurations-list' }
                        handler={ onCreate }
                    /> }
            />

            <TerminalConfigurationsList/>

        </DashboardContent>
    );

};

export default TerminalConfigurationPage;
