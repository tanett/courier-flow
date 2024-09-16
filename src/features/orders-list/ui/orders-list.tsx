import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from '../../../app/config/router-paths';
import { useSelectorT } from '../../../app/state';
import { useIsAllowedPermissions } from '../../../entities-project/users/hooks/use-is-allowed-permissions';
import { editOrdersPermissions, } from 'app/config/permissions-config';

import { OrdersListTable } from 'features/orders-list/ui/table/orders-table';
import { Modal } from 'shared/ui/modal';
import { Trans } from '@lingui/macro';
import { useShortOrdersList } from 'entities-project/orders/hooks/use-short-orders-list';


export const OrdersList: React.FC<{courierId: string}> = ({courierId}) => {

    const navigate = useNavigate();

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const isAllowedEditByPermission = useIsAllowedPermissions(editOrdersPermissions);

    const {
        ordersShortList,
        pagination,
        isLoading,
        refetch
    } = useShortOrdersList(courierId);

    const [ popupContent, setPopupContent ] = useState<React.ReactNode | null>(null);


    const goToEditPage = (id: string | number) => navigate([ routerPaths.orders, id.toString(), 'edit' ].join('/'));

    const goToDetailsPage = (id: string | number) => navigate([ routerPaths.orders, id.toString() ].join('/'));


    return (<>
        <OrdersListTable
            currentUser={ currentUser }
            isAllowedEditByPermission={ true }
            goToEditPage={ goToEditPage }
            ordersList={ ordersShortList }
            pagination={ pagination }
            isLoading={ isLoading }
            goToDetailsPage={ goToDetailsPage }
            setPopupContent={ setPopupContent }
        />

        { popupContent && <Modal modalWidth="auto" opened={ true } onCloseByOverlay={ () => setPopupContent(null) }>
            <Modal.Body>
                { popupContent }
            </Modal.Body>
        </Modal> }

    </>);

};
