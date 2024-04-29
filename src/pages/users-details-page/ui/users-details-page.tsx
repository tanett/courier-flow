import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { useParams } from 'react-router-dom';
import { UsersDetails } from 'features/users-details';
import { routerPaths } from 'app/config/router-paths';


const UsersDetailsPage: React.FC = () => {

    const { i18n } = useLingui();

    const { userName } = useParams();

    return (
        <DashboardContent >
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Users`), path: routerPaths.users },
                    { name: userName || '------' }
                ] }/> }

            />
            <UsersDetails />
        </DashboardContent>
    );

};

export default UsersDetailsPage;
