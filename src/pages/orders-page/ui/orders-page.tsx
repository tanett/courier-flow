import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { OrdersList } from 'features/orders-list';
import { CreateButtonFilled } from 'shared/ui/create-button-filled/create-button-filled';
import { useNavigate } from 'react-router-dom';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { addOrdersPermissions } from 'app/config/permissions-config';
import { routerPaths } from 'app/config/router-paths';

const OrdersPage: React.FC = () => {

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const isAllowCreate = useIsAllowedPermissions(addOrdersPermissions);

    const onCreateNewOrder= () => {

        navigate(routerPaths.orders_create);

    };

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Orders`) }
                ]}/>}
                rightSide={
                    isAllowCreate && <CreateButtonFilled
                        id={'create-new-order'}
                        handler={onCreateNewOrder}
                    />}
            />

           <OrdersList/>

        </DashboardContent>
    );

};

export default OrdersPage;
