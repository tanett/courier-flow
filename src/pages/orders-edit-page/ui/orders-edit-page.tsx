import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { pathSections, routerPaths } from 'app/config/router-paths';

const OrdersEditPage: React.FC = () => {

    const { i18n } = useLingui();

    return (
        <DashboardContent withForm>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Orders`),  path: routerPaths.orders_list },
                    { name: i18n._(t`Edit`) }
                ]}/>}
            />

           order edit

        </DashboardContent>
    );

};

export default OrdersEditPage;
