import React from 'react';
import { Modal } from 'shared/ui/modal';
import { Dialog } from 'shared/ui/dialog-new';
import { plural, t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

export const ArchiveSelectedItemModal:React.FC<{onClose: ()=>void, onConfirm: ()=>void, productsCount: number}> = ({ onClose, onConfirm, productsCount }) => {

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
                        title: i18n._({
                            message: `Archive`,
                            id: 'action-archive',
                        }),
                        handler: onConfirm,
                    } }
                >
                    <Trans>Are you sure you want to archive<br/>the selected categories</Trans>?<br/>
                    <Trans>After archiving the category, {plural(productsCount, {
                        one: '# product',
                        few: '# products',
                        other: '# products',
                    }) } will remain without a category</Trans>
                </Dialog>
            </Modal.Body>
        </Modal>
    );

};
