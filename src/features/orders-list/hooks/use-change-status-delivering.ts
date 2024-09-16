import { typeOrder, typeOrderShortExtended } from '../../../entities-project/orders/model/state-slice';
import { typeOrdersShortWithCheckBox } from 'features/orders-list/types/types';
import { OrderStatuses } from '../../../entities-project/orders/model/orders-statuses';
import { notificationActions } from '../../../entities-project/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { t } from '@lingui/macro';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useAppDispatchT } from 'app/state';
import { useChangeOrderStatusMutation, useLazySearchOrdersShortExtendedQuery, useSearchOrdersShortExtendedQuery } from '../../../entities-project/orders/api/api';
import { i18n } from '@lingui/core';

export const useChangeStatusDelivering = ()=>{

    const dispatchAppT = useAppDispatchT();

    const [ changeStatus, { isLoading } ] = useChangeOrderStatusMutation();


    const onChangeStatusInDelivering = async (order: typeOrder | typeOrderShortExtended) => {

        try {

            await changeStatus({
                id: order.id,
                currentStatus: order.status,
                status: OrderStatuses.DELIVERING
                // assigneeId: form.values.assigneeId
            }).unwrap();

            dispatchAppT(notificationActions.addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                message: i18n._(t`Order status changed successfully.`),
            }));


        } catch (err) {

            errorHandler(err as typeResponseError, 'onChangeStatusInDelivering', dispatchAppT);

        }

    };
    return {onChangeStatusInDelivering}
}
