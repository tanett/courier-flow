import { typeOrder } from '../model/state-slice';
import { OrderStatuses } from '../model/orders-statuses';
import { useIsAllowedPermissions } from '../../users/hooks/use-is-allowed-permissions';
import { editOrdersPermissions } from 'app/config/permissions-config';
import { typeGetCurrentUserResponse } from 'entities/user-profile/api/types';

export const useIsOrderAvailableForChange = (orderData: typeOrder, currentUser:  typeGetCurrentUserResponse) => {

    const isAllowedEditByPermission = useIsAllowedPermissions(editOrdersPermissions);

    if ( isAllowedEditByPermission) {

        switch (orderData.status) {
        case OrderStatuses.CANCELLED:
            return false;
        case OrderStatuses.COMPLETED:
            return false;
        case OrderStatuses.DELIVERING:
            return false;
        case OrderStatuses.WAITING_FOR_DELIVERY:
            return orderData.collectorId === currentUser.actor.id ;
        case OrderStatuses.PROCESSING:
            return orderData.collectorId === currentUser.actor.id  ;
        case OrderStatuses.CREATED:
            return orderData.createdBy === currentUser.actor.id ;
        default:
            return false;
        }

    } else {
        return false;
    }

};
