import React from 'react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { useParams } from 'react-router-dom';
import OrdersDetails from 'features/orders-details/ui/orders-details';

const OrdersDetailsPage: React.FC = () => {


    const { id, } = useParams();

    return (
        <DashboardContent >
            {id && <OrdersDetails orderId={ id }/> }
        </DashboardContent>
    );

};

export default OrdersDetailsPage;
