import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Modal } from 'shared/ui/modal';
import { Dialog } from 'shared/ui/dialog-new';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { useArchiveProducts } from '../../../../entities/products/hooks/use-archive-products';
import { typeProductExtendedWithCheckBox } from 'features/products-list/types/types';

export const ModalArchiveSelectedItem: React.FC<{
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    list: typeProductExtendedWithCheckBox[]
    setRefetch: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
    setOpen,
    list,
    setRefetch
}) => {

    const { i18n } = useLingui();

    const {
        onArchive,
        isArchiveLoading
    } = useArchiveProducts({
        onSuccess: () => {
            onCloseDialogToDelete();
            setRefetch(true);
        }
    });

    const onCloseDialogToDelete = () => { setOpen(false); };


    const onConfirmDelete = async () => {
        const selectedIds = list.filter(item => item.checked).map(item => item.id);
        await onArchive(selectedIds);

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
                    <Trans>Are you sure you want to archive <br/>selected products</Trans>?
                </Dialog>
                { isArchiveLoading && <LoaderOverlay/> }
            </Modal.Body>
        </Modal>
    );
};
