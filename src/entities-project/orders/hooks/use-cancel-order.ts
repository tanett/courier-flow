import { useAppDispatchT } from 'app/state';
import { notificationActions } from '../../notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { t } from '@lingui/macro';
import { typeResponseError } from 'app/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import { useChangeOrderStatusMutation } from '../api/api';
import { OrderStatuses } from '../model/orders-statuses';


export const useCancelOrder = ({
    onSuccess,
    onError,
}: { onSuccess?: () => void, onError?: () => void }) => {

    const dispatchAppT = useAppDispatchT();

    const [ cancelOrder, { isLoading: isCancelLoading } ] = useChangeOrderStatusMutation();

    const onCancel= async (id: string, currentStatus: OrderStatuses) => {

        try {

            await cancelOrder({id, currentStatus, status: OrderStatuses.CANCELLED}).unwrap();

            dispatchAppT(notificationActions.addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                message: t`Order cancelled successfully.`,
            }));
            if (onSuccess) onSuccess();

        } catch (err) {

            if (onError) onError();
            errorHandler(err as typeResponseError, 'onCancelOrder', dispatchAppT);

        }

    };
    return { onCancel, isCancelLoading };

};
