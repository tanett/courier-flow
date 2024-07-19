import React, { useState } from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Modal } from 'shared/ui/modal';
import { typeOrdersShortWithCheckBox } from 'features/orders-list/types/types';
import { Alert, Box, Button, Flex, rem, Space, Text, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAppDispatchT } from 'app/state';
import { notificationActions } from '../../../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { typeReturnForm } from 'features/selector-with-search-store/types';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { SelectorWithSearchUsers } from 'features/selector-with-search-users';
import { IconAlertCircle } from '@tabler/icons-react';
import { useChangeOrderAddCourierMutation } from '../../../../entities/orders/api/api';
import { OrderStatuses } from '../../../../entities/orders/model/orders-statuses';

export const ModalChangeStatusWaitingDelivery: React.FC<{
    setOpen: React.Dispatch<React.SetStateAction<React.ReactNode | null>>
    data: typeOrdersShortWithCheckBox
}> = ({
    setOpen,
    data,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const form = useForm<{ courierId: string | null }>({
        initialValues: { courierId: null },
        validate: {
            courierId: (value: string | null) => {

                return !value
                    ? t`Required field`
                    : null;
            },

        }
    });

    const dispatchAppT = useAppDispatchT();

    const [ addCourier, { isLoading } ] = useChangeOrderAddCourierMutation();

    const onCancelClick = () => {

        form.reset();
        setOpen(null);

    };

    const [ isInProgress, setIsInProgress ] = useState(false);

    const onSubmit = async () => {

        if (form.values.courierId) {

            setIsInProgress(true);

            try {

                await addCourier({
                    id: data.id,
                    currentStatus: data.status,
                    status: OrderStatuses.WAITING_FOR_DELIVERY,
                    courierId: form.values.courierId
                }).unwrap();

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: i18n._(t`Order status changed successfully.`),
                }));

                setOpen(null);

            } catch (err) {

                errorHandler(err as typeResponseError, 'onChangeCourierForOrders', dispatchAppT);


            }


            setIsInProgress(false);

        }


    };


    return (

        <>
            <Modal.Header title={ i18n._(t`Change status to “Waiting for delivery”`) } onClose={ () => setOpen(null) }/>
            <form onSubmit={ form.onSubmit(onSubmit) }>
                <Box
                    sx={ {
                        minWidth: '50vw',
                        padding: rem(15),
                        marginTop: rem(-10),
                        position: 'relative',
                        overflow: 'visible',
                        '& .mantine-InputWrapper-root': { maxWidth: 'none' },
                    } }>

                    <Alert icon={ <IconAlertCircle size="1rem"/> } color={ theme.colors.primary[5] } mt={10} mb={12}>
                        <Text><Trans>To put order “Waiting for delivery”, please select courier.</Trans></Text>
                    </Alert>

                    <SelectorWithSearchUsers
                        required={ true }
                        label={ i18n._(t`Courier`) }
                        fieldName={ 'courierId' }
                        form={ form as unknown as typeReturnForm }
                        initialValue={ null }
                        storesFilters={[data.storeId]}
                        // currentUser={currentUser?.actor.id}
                        // markerForCurrentUser={ i18n._(t`Assign to me`)}
                    />

                    <Space h={ 32 }/>
                    <Flex sx={ {
                        gap: rem(24),
                        justifyContent: 'center',
                        '& .mantine-Button-root': {
                            minWidth: rem(165),
                            fontSize: theme.fontSizes.md,
                            fontWeight: 700,
                        },
                    } }>
                        <Button key="cancel" type="reset" variant="outline" onClick={ onCancelClick }>{ t`Cancel` }</Button>
                        <Button key="submit" disabled={ !!Object.values(form.errors).length || isInProgress }
                                type="submit">{ t`Change status` }</Button>
                    </Flex>
                </Box>
                { isLoading && <LoaderOverlay/> }
            </form>
        </>

    );

};
