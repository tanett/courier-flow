import React from 'react';
import { Flex } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { NotFound } from 'shared/ui/not-found/not-found';
import { routerPaths } from 'app/config/router-paths';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import OrdersTabs from 'features/orders-details/ui/orders-tabs';
import { useGetOrderByIdQuery } from '../../../entities-project/orders/api/api';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { useSelectorT } from 'app/state';



const OrdersDetails: React.FC<{ orderId: string }> = ({ orderId }) => {


    const { i18n } = useLingui();

    const {
        data,
        isFetching,
        error,
    } = useGetOrderByIdQuery(orderId);

    const currentUser = useSelectorT(state => state.userProfile.userProfile);


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
                        { name: i18n._(t`Orders`),  path: routerPaths.orders },
                        { name: data?.code || '------' }
                    ]}/>}
                />
                {  error
                    ? <Flex sx={ {
                        height: '70vh',
                        alignItems: 'center'
                    } }><NotFound/></Flex>
                    :  data && currentUser && <OrdersTabs orderData={data} currentUser={currentUser} />}
                {isFetching && <LoaderOverlay/>}
            </>

    );

};

export default OrdersDetails;
