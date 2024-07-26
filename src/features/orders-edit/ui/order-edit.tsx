import React from 'react';
import { useSelectorT } from 'app/state';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { routerPaths } from 'app/config/router-paths';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import useGetOrderDataByIdFromUrl from '../../../entities/orders/hooks/use-get-order-data-by-id-from-url';
import { OrderEditForm } from 'features/orders-edit/ui/order-edit-form';


export const OrderEdit: React.FC = () => {

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const { i18n } = useLingui();


    const {
        orderData,
        isOrderFetching
    } = useGetOrderDataByIdFromUrl();


    return (
        <>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    {
                        name: i18n._(t`Orders`),
                        path: routerPaths.orders_list
                    },
                    { name: orderData?.code || '------' }
                ] }/> }
            />

            {orderData && <OrderEditForm orderData={orderData}/> }
            { (isOrderFetching || !currentUser) && <LoaderOverlay/> }
        </>
    );

};
