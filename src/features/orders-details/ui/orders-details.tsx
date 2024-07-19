import React from 'react';
import { Flex } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { NotFound } from 'shared/ui/not-found/not-found';
import { routerPaths } from 'app/config/router-paths';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import OrdersTabs from 'features/orders-details/ui/orders-tabs';
import { useGetOrderByIdQuery } from '../../../entities/orders/api/api';
import { LoaderOverlay } from 'shared/ui/loader-overlay';



const OrdersDetails: React.FC<{ orderId: string }> = ({ orderId }) => {


    const { i18n } = useLingui();

    const {
        data,
        isFetching,
        error
    } = useGetOrderByIdQuery(orderId);


    return (
        error
            ? <Flex sx={ {
                height: '70vh',
                alignItems: 'center'
            } }><NotFound/></Flex>
            :
            <>
                <DashboardContent.Header
                    leftSide={<DashboardBreadcrumbs dataList={[
                        { name: i18n._(t`Orders`),  path: routerPaths.orders_list },
                        { name: data?.code || '------' }
                    ]}/>}
                />
                {  error
                    ? <Flex sx={ {
                        height: '70vh',
                        alignItems: 'center'
                    } }><NotFound/></Flex>
                    :  data && <OrdersTabs orderData={data}  />}
                {isFetching && <LoaderOverlay/>}
            </>

    );

};

export default OrdersDetails;
