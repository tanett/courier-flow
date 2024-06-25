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
import { TerminalConfigurationsCreate } from 'features/terminal-configurations-create';

const TerminalConfigurationCreatePage: React.FC = () => {

    const { i18n } = useLingui();

    const navigate = useNavigate();


    return (
        <DashboardContent withForm>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    {
                        name: i18n._(t`Configurations`),
                        path: routerPaths.terminals_configurations
                    },
                    { name: i18n._(t`Create`), }
                ] }/> }

            />

            <TerminalConfigurationsCreate/>

        </DashboardContent>
    );

};

export default TerminalConfigurationCreatePage;
