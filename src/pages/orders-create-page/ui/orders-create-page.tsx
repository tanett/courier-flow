import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { pathSections, routerPaths } from 'app/config/router-paths';
import { OrderCreate } from 'features/orders-create';

const OrdersCreatePage: React.FC = () => {

    const { i18n } = useLingui();

    return (
        <DashboardContent >
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Orders`),  path: routerPaths.orders_list },
                    { name: i18n._(t`Create`) }
                ]}/>}
            />

           <OrderCreate/>

        </DashboardContent>
    );

};

export default OrdersCreatePage;
