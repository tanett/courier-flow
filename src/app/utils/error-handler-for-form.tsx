import { typeResponseError, typeValidationError } from 'app/api/types';
import { notificationActions } from '../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { typeAppDispatch } from 'app/state';
import { Trans } from '@lingui/macro';
import type { UseFormInput } from '@mantine/form/lib/types';
import type { UseFormReturnType } from '@mantine/form';
import React from 'react';

type formType = UseFormInput<Record<string, unknown>>

export type typeReturnForm = UseFormReturnType<formType, (values: formType) => formType>

export type typeMapRequestFieldsToFormField = Record<string, {
    translatedValue: string,
    formField: string
} >;

export const errorHandlerForForm = (error: typeResponseError, funcName: string, dispatch: typeAppDispatch, form: typeReturnForm, mapRequestFieldsToFormFields: typeMapRequestFieldsToFormField) => {


    if (error.status === 400 && error.data) {

        const err = error.data;

        if (typeof err !== 'string') {

            if (err.validationErrors) {

                err.validationErrors.forEach((item: typeValidationError) => {

                    if (mapRequestFieldsToFormFields[item.fieldName]) {
                        dispatch(notificationActions.addNotification({
                            type: NOTIFICATION_TYPES.ERROR,
                            message: `${ mapRequestFieldsToFormFields[item.fieldName].translatedValue }: ${ item.errorMessage.replace(item.fieldName, mapRequestFieldsToFormFields[item.fieldName].translatedValue) }`,
                        }));

                        form.setFieldError(mapRequestFieldsToFormFields[item.fieldName].formField, item.errorMessage);

                    } else {
                        dispatch(notificationActions.addNotification({
                            type: NOTIFICATION_TYPES.ERROR,
                            message: `${ item.errorMessage}`,
                        }));
                    }

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

    } else if (error.status === 403) {

        dispatch(notificationActions.addNotification({
            type: NOTIFICATION_TYPES.ERROR,
            message: <Trans>Access denied</Trans>,
        }));

    } else {

        console.log(`${ funcName } : `, error);

    }

};
