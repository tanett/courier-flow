import React from 'react';
import { useLingui } from '@lingui/react';
import { useParams } from 'react-router-dom';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import StoresDetailsTabs from 'features/stores-details/ui/tabs/stores-details-tabs';
import { pathSections, routerPaths } from 'app/config/router-paths';


const StoresDetailsPage: React.FC = () => {

    const {
        id,
        storeName,
    } = useParams();

    const { i18n } = useLingui();

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Stores`), path: routerPaths.stores },
                    { name: storeName || '---' }
                ] }/> }

            />
            { id && <StoresDetailsTabs storeId={ id }/> }

        </DashboardContent>
    );

};

export default StoresDetailsPage;
