import { useAppDispatchT } from 'app/state';
import { notificationActions } from '../../notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { t } from '@lingui/macro';
import { typeResponseError } from 'app/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import { useDeleteTerminalConfigurationByIdMutation } from '../api/api';


export const useDeleteTerminalConfiguration = ({
    onSuccess,
    onError,
}: { onSuccess?: () => void, onError?: () => void }) => {

    const dispatchAppT = useAppDispatchT();

    const [ deleteConfiguration, { isLoading: isDeleteLoading } ] = useDeleteTerminalConfigurationByIdMutation();

    const onDelete = async (id: string) => {

        try {

            await deleteConfiguration( id ).unwrap();

            dispatchAppT(notificationActions.addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                message: t`Terminal configuration deleted successfully.`,
            }));
            if (onSuccess) onSuccess();

        } catch (err) {

            if (onError) onError();
            errorHandler(err as typeResponseError, 'onDeleteTerminalConfiguration', dispatchAppT);

        }

    };
    return { onDelete, isDeleteLoading };

};
