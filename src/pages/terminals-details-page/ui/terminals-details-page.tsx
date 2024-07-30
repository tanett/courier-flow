import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { useParams } from 'react-router-dom';
import { TerminalDetails } from 'features/terminals-details/ui/terminals-details';
import { routerPaths } from 'app/config/router-paths';


const TerminalsDetailsPage: React.FC = () => {

    const { i18n } = useLingui();

    const { id, serialNumber } = useParams();

    return (
        <DashboardContent >
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Terminals`), path: routerPaths.terminals_list },
                    { name: serialNumber || '------' }
                ] }/> }

            />
            {id && <TerminalDetails terminalId={ id }/> }
        </DashboardContent>
    );

};

export default TerminalsDetailsPage;
