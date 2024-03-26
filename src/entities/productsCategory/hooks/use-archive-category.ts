import { useAppDispatchT } from 'app/state';
import { notificationActions } from '../../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { t } from '@lingui/macro';
import { typeResponseError } from 'app/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import { useCategoryToArchiveMutation } from '../api/api';


export const useArchiveCategory = ({
    onSuccess,
    onError,
}: { onSuccess?: () => void, onError?: () => void }) => {

    const dispatchAppT = useAppDispatchT();

    const [ productCategoryToArchive, { isLoading: isArchiveLoading } ] = useCategoryToArchiveMutation();

    const onArchive = async (id: string) => {

        try {

            await productCategoryToArchive([ id ]).unwrap();

            dispatchAppT(notificationActions.addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                message: t`Category archived successfully.`,
            }));
            if (onSuccess) onSuccess();

        } catch (err) {

            if (onError) onError();
            errorHandler(err as typeResponseError, 'onArchiveCategory', dispatchAppT);

        }

    };
    return { onArchive, isArchiveLoading };

};
