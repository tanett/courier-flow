import { typeOrder } from '../../../entities/orders/model/state-slice';
import { typeOrdersShortWithCheckBox } from 'features/orders-list/types/types';
import { OrderStatuses } from '../../../entities/orders/model/orders-statuses';
import { notificationActions } from '../../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { t } from '@lingui/macro';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useAppDispatchT } from 'app/state';
import { useChangeOrderStatusMutation } from '../../../entities/orders/api/api';
import { i18n } from '@lingui/core';

export const useChangeStatusProcessing = ()=>{

    const dispatchAppT = useAppDispatchT();

    const [ changeStatus, { isLoading } ] = useChangeOrderStatusMutation();

    const onChangeStatusInProcessing = async (order: typeOrder | typeOrdersShortWithCheckBox) => {

        try {

            await changeStatus({
                id: order.id,
                currentStatus: order.status,
                status: OrderStatuses.PROCESSING
                // assigneeId: form.values.assigneeId
            }).unwrap();

            dispatchAppT(notificationActions.addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                message: i18n._(t`Order status changed successfully.`),
            }));


        } catch (err) {

            errorHandler(err as typeResponseError, 'onChangeStatusInProcess', dispatchAppT);

        }

    };
    return {onChangeStatusInProcessing}
}
