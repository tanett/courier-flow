import React from 'react';
import { useLingui } from '@lingui/react';
import { useParams } from 'react-router-dom';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import StoresDetailsTabs from 'features/stores-details/ui/tabs/stores-details-tabs';


const StoresDetailsPage: React.FC = () => {

    const {
        id,
        storeName,
    } = useParams();

    const { i18n } = useLingui();

    return (
        <DashboardContent withForm>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Stores`) },
                    { name: storeName || '---' }
                ] }/> }

            />
            { id && <StoresDetailsTabs storeId={ id }/> }

        </DashboardContent>
    );

};

export default StoresDetailsPage;
