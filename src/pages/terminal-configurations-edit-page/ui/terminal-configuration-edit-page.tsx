import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { useNavigate, useParams } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import { TerminalConfigurationsEdit } from 'features/terminal-configurations-edit';

const TerminalConfigurationEditPage: React.FC = () => {

    const { i18n } = useLingui();

    const { id, name } = useParams();

    const navigate = useNavigate();


    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Configurations`), path: routerPaths.terminals_configurations },
                    // { name: name || '----', },
                    {name: i18n._(t`Edit`),}
                ] }/> }

            />

            {id && <TerminalConfigurationsEdit id={id}/> }

        </DashboardContent>
    );

};

export default TerminalConfigurationEditPage;
