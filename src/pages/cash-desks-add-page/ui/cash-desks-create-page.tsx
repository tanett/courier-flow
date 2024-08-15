import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { routerPaths } from '../../../app/config/router-paths';

const CashDesksCreatePage: React.FC = () => {

    const { i18n } = useLingui();

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Cash desks`), path: routerPaths.cash_desks },
                    { name: i18n._(t`Create`) }
                ]}/>}
            />

           Add cash desk

        </DashboardContent>
    );

};

export default CashDesksCreatePage;
