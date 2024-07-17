import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { Dialog } from 'shared/ui/dialog-new';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { useArchiveProducts } from '../../../../entities/products/hooks/use-archive-products';
import { typeOrdersShortWithCheckBox } from 'features/orders-list/types/types';
import { Box } from '@mantine/core';

export const ModalCancelOrder: React.FC<{
    setOpen: React.Dispatch<React.SetStateAction<React.ReactNode | null>>
    data: typeOrdersShortWithCheckBox
}> = ({
    setOpen,
    data,
}) => {

    const { i18n } = useLingui();

    const {
        onArchive,
        isArchiveLoading,
    } = useArchiveProducts({
        onSuccess: () => {

            onCloseDialogToDelete();

        },
    });

    const onCloseDialogToDelete = () => {

        setOpen(null);

    };


    const onConfirmDelete = async () => {

        await onArchive([ data.id ]);

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
            { isArchiveLoading && <LoaderOverlay/> }
        </>
    );

};
