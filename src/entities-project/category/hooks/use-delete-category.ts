import { useAppDispatchT } from 'app/state';
import { notificationActions } from '../../notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { t } from '@lingui/macro';
import { typeResponseError } from 'app/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import { useCategoryDeleteMutation } from '../api/api';


export const useDeleteCategory = ({
    onSuccess,
    onError,
}: { onSuccess?: () => void, onError?: () => void }) => {

    const dispatchAppT = useAppDispatchT();

    const [ categoryDelete, { isLoading: isDeleteLoading } ] = useCategoryDeleteMutation();

    const onDelete = async (ids: string[]) => {

        try {

            await categoryDelete(ids).unwrap();

            dispatchAppT(notificationActions.addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                message: ids.length === 1 ? t`Category archived successfully.` : t`Categories archived successfully.`,
            }));
            if (onSuccess) onSuccess();

        } catch (err) {

            if (onError) onError();
            errorHandler(err as typeResponseError, 'onDeleteCategory', dispatchAppT);

        }

    };
    return { onDelete, isDeleteLoading };

};
