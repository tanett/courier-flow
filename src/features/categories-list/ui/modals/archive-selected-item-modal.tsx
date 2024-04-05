import React from 'react';
import { Modal } from 'shared/ui/modal';
import { Dialog } from 'shared/ui/dialog-new';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

export const ArchiveSelectedItemModal:React.FC<{onClose: ()=>void, onConfirm: ()=>void}> = ({onClose, onConfirm}) => {

    const { i18n } = useLingui();

    return (
        <Modal modalWidth="dialog" opened={ true }>
            <Modal.Body>
                <Dialog
                    cancelButton={ {
                        title: i18n._(t`Cancel`),
                        handler: onClose,
                    } }
                    confirmButton={ {
                        title: i18n._(t`Confirm`),
                        handler: onConfirm,
                    } }
                >
                    <Trans>Are you sure you want to archive<br/>the selected categories</Trans>?
                </Dialog>
            </Modal.Body>
        </Modal>
    );
};
