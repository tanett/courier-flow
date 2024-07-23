import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { pathSections, routerPaths } from 'app/config/router-paths';
import { OrderEdit } from 'features/orders-edit';
import OrdersDetails from 'features/orders-details/ui/orders-details';
import { useParams } from 'react-router-dom';

const OrdersEditPage: React.FC = () => {

    const { i18n } = useLingui();

    const {id} = useParams();

    return (
        <DashboardContent >
            {id && <OrderEdit orderId={ id }/> }
        </DashboardContent>

    );

};

export default OrdersEditPage;
