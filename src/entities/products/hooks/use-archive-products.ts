import { useAppDispatchT } from 'app/state';
import { notificationActions } from '../../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { t } from '@lingui/macro';
import { typeResponseError } from 'app/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import { useProductToArchiveMutation } from '../../../entities/products/api/api';


export const useArchiveProducts = ({
    onSuccess,
    onError,
}: { onSuccess?: () => void, onError?: () => void }) => {

    const dispatchAppT = useAppDispatchT();

    const [ productToArchive, { isLoading: isArchiveLoading } ] = useProductToArchiveMutation();

    const onArchive = async (id: string) => {

        try {

            await productToArchive([ id ]).unwrap();

            dispatchAppT(notificationActions.addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                message: t`Product archived successfully.`,
            }));
            if (onSuccess) onSuccess();

        } catch (err) {

            if (onError) onError();
            errorHandler(err as typeResponseError, 'onArchiveProduct', dispatchAppT);

        }

    };
    return { onArchive, isArchiveLoading };

};
