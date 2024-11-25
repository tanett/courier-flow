import { t } from '@lingui/macro';
import { useAppDispatchT } from 'app/state';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useArchiveDevicesMutation } from 'entities-project/devices/api/api';
import { notificationActions } from 'entities-project/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';

export const useArchiveDevices = ({
    onSuccess,
    onError,
}: { onSuccess?: () => void, onError?: () => void }) => {

    const dispatchAppT = useAppDispatchT();

    const [ devicesArchive, { isLoading: isArchiveLoading } ] = useArchiveDevicesMutation();

    const onArchive = async (id: string) => {

        try {

            await devicesArchive([ id ]).unwrap();

            dispatchAppT(notificationActions.addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                message: t`Device archived successfully.`,
            }));
            if (onSuccess) onSuccess();

        } catch (err) {

            if (onError) onError();
            errorHandler(err as typeResponseError, 'onArchiveDevice', dispatchAppT);

        }

    };
    return { onArchive, isArchiveLoading };

};
