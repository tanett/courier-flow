import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { Dialog } from 'shared/ui/dialog-new';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { typeOrdersShortWithCheckBox } from 'features/orders-list/types/types';
import { Box } from '@mantine/core';
import { useCancelOrder } from '../../../../entities/orders/hooks/use-cancel-order';
import { OrderStatuses } from '../../../../entities/orders/model/orders-statuses';

export const ModalCancelOrder: React.FC<{
    setOpen: React.Dispatch<React.SetStateAction<React.ReactNode | null>>
    data: typeOrdersShortWithCheckBox
}> = ({
    setOpen,
    data,
}) => {

    const { i18n } = useLingui();

    const {
        onCancel,
        isCancelLoading,
    } = useCancelOrder({
        onSuccess: () => {

            onCloseDialogToDelete();

        },
    });

    const onCloseDialogToDelete = () => {

        setOpen(null);

    };


    const onConfirmDelete = async () => {

        await onCancel(data.id, data.status as OrderStatuses);

    };

    return (
        <>
            <Dialog
                withMarginTopFat
                cancelButton={ {
                    title: i18n._(t`No`),
                    handler: onCloseDialogToDelete,
                } }
                confirmButton={ {
                    title: i18n._(t`Cancel order`),
                    handler: () => onConfirmDelete(),
                } }
            >
                <Box sx={(theme)=>({
                    width:'452px',
                    '@media (max-width: 50em)': {width: 'auto',},
                })}><Trans>Are you sure you want to Cancel <b>&quot;{ data.code }&quot;</b> order? </Trans></Box>
            </Dialog>
            { isCancelLoading && <LoaderOverlay/> }
        </>
    );

};
