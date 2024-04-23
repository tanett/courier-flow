import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Modal } from 'shared/ui/modal';
import { Dialog } from 'shared/ui/dialog-new';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { useArchiveProducts } from '../../../../entities/products/hooks/use-archive-products';
import { typeProductExtendedWithCheckBox } from 'features/products-list/types/types';

export const ModalArchiveItem: React.FC<{
    setOpen: React.Dispatch<React.SetStateAction<typeProductExtendedWithCheckBox | null>>,
    data: typeProductExtendedWithCheckBox
}> = ({
    setOpen,
    data,
}) => {

    const { i18n } = useLingui();

    const {
        onArchive,
        isArchiveLoading
    } = useArchiveProducts({
        onSuccess: () => {
            onCloseDialogToDelete();
        }
    });

    const onCloseDialogToDelete = () => { setOpen(null); };


    const onConfirmDelete = async () => {

        await onArchive([ data.id ]);

    };

    return (
        <Modal modalWidth="dialog" opened={ true }>
            <Modal.Body>
                <Dialog
                    cancelButton={ {
                        title: i18n._(t`Cancel`),
                        handler: onCloseDialogToDelete,
                    } }
                    confirmButton={ {
                        title: i18n._(`action-archive`),
                        handler: () => onConfirmDelete(),
                    } }
                >
                    <Trans>Are you sure you want to archive <br/>the product</Trans>  &quot;{ data.name }&quot;?
                </Dialog>
                { isArchiveLoading && <LoaderOverlay/> }
            </Modal.Body>
        </Modal>
    );
};
