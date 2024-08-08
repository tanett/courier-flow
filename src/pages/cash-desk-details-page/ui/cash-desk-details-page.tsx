import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { useParams } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import CashDeskDetailsTabs from '../../../features/cash-desk-details/ui/cash-desk-details-tabs';


const CashDeskDetailsPage: React.FC = () => {

    const { i18n } = useLingui();

    const { cashDeskId, cashDeskName } = useParams();

    return (
        <DashboardContent >
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Cash desks`), path: routerPaths.cash_desks_details },
                    { name: cashDeskName || '------' }
                ] }/> }

            />
            {cashDeskId && <CashDeskDetailsTabs cashDeskId={cashDeskId}/> }
        </DashboardContent>
    );

};

export default CashDeskDetailsPage;
