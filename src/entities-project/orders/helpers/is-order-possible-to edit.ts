import { typeOrdersShortWithCheckBox } from 'features/orders-list/types/types';
import { typeOrder, typeOrderShortExtended } from '../model/state-slice';
import { typeGetCurrentUserResponse } from '../../user-profile/api/types';
import { merchantAdminCodeRole,  } from '../../role/constants/roles-constants';
import { OrderStatuses } from '../model/orders-statuses';

export const isOrderPossibleToEdit = (order: typeOrder| typeOrderShortExtended, currentUser:  typeGetCurrentUserResponse, isAllowedEditByPermission: boolean):boolean=>{
    const isCurrentUserCreator = currentUser.actor.id === order.createdBy
    const isCurrentUserAdmin  = currentUser.actor.role.code ===merchantAdminCodeRole;
    const isCurrentUserInOrderStore = currentUser.actor.storeIds.includes(order.storeId);

    const isPossibleToEdit = ()=>{
        if(isAllowedEditByPermission) {
            switch (order.status) {
            case OrderStatuses.CANCELLED:
                return false;
            case OrderStatuses.COMPLETED:
                return false;
            case OrderStatuses.DELIVERING:
                return true;
            case OrderStatuses.WAITING_FOR_DELIVERY:
                return isCurrentUserInOrderStore || isCurrentUserAdmin;
            case OrderStatuses.PROCESSING:
                return isCurrentUserInOrderStore || isCurrentUserAdmin;
            case OrderStatuses.CREATED:
                return isCurrentUserInOrderStore || isCurrentUserAdmin;
            default:
                return false;
            }
        } else { return false;}

    }

    return isPossibleToEdit()
}
