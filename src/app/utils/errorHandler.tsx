import { typeResponseError, typeValidationError } from 'app/api/types';
import { notificationActions } from '../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { typeAppDispatch } from 'app/state';
import { Trans } from '@lingui/macro';


export const errorHandler = (error: typeResponseError, funcName: string, dispatch: typeAppDispatch) => {


    if (error.status === 400 && error.data) {

        const err = error.data;

        if (typeof err !== 'string') {

            if (err.validationErrors) {

                err.validationErrors.forEach((item: typeValidationError) => {

                    dispatch(notificationActions.addNotification({
                        type: NOTIFICATION_TYPES.ERROR,
                        message: `${ item.fieldName }: ${ item.errorMessage }`,
                    }));

                });

            } else {

                dispatch(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.ERROR,
                    message: err.errorMessage,
                }));

            }

        } else {

            dispatch(notificationActions.addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                message: err,
            }));

        }

    } else if (error.status === 403){

        dispatch(notificationActions.addNotification({
            type: NOTIFICATION_TYPES.ERROR,
            message: <Trans>Access denied</Trans>,
        }));

    } else {

        console.log(`${funcName} : `, error);

    }

};
