import React from 'react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { OrderEdit } from 'features/orders-edit';

const OrdersEditPage: React.FC = () => {

    return (
        <DashboardContent >
            <OrderEdit />
        </DashboardContent>

    );

};

export default OrdersEditPage;
