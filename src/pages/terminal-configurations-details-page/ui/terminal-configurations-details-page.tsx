import React from 'react';
import { useLingui } from '@lingui/react';
import { useParams } from 'react-router-dom';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { routerPaths } from 'app/config/router-paths';
import { TerminalConfigurationsDetails } from 'features/terminal-configurations-details';


const TerminalConfigurationsDetailsPage: React.FC = () => {

    const {
        id,
        name,
    } = useParams();

    const { i18n } = useLingui();

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Configurations`), path: routerPaths.terminals_configurations },
                    { name: name || '---' }
                ] }/> }

            />
            {id && <TerminalConfigurationsDetails id={ id }/> }

        </DashboardContent>
    );

};

export default TerminalConfigurationsDetailsPage;
