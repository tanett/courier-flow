import { useAppDispatchT } from 'app/state';
import { useUserToArchiveMutation } from '../../../entities/users/api/api';
import { notificationActions } from '../../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { t } from '@lingui/macro';
import { typeResponseError } from 'app/api/types';
import { errorHandler } from 'app/utils/errorHandler';


export const useArchiveUsers = ({
    onSuccess,
    onError,
}: { onSuccess?: () => void, onError?: () => void }) => {

    const dispatchAppT = useAppDispatchT();

    const [ userToArchive, { isLoading: isArchiveLoading } ] = useUserToArchiveMutation();

    const onArchive = async (id: string) => {

        try {

            await userToArchive([ id ]).unwrap();

            dispatchAppT(notificationActions.addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                message: t`User archived successfully.`,
            }));
            if (onSuccess) onSuccess();

        } catch (err) {

            if (onError) onError();
            errorHandler(err as typeResponseError, 'onArchiveUser', dispatchAppT);

        }

    };
    return { onArchive, isArchiveLoading };

};
