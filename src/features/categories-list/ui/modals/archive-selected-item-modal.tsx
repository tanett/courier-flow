import React from 'react';
import { Modal } from 'shared/ui/modal';
import { Dialog } from 'shared/ui/dialog-new';
import { plural, t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mantine/core';

export const ArchiveSelectedItemModal: React.FC<{ onClose: () => void, onConfirm: () => void, productsCount: number }> = ({
    onClose,
    onConfirm,
    productsCount
}) => {

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
                    <Box sx={ theme => ({
                        fontWeight: 500,
                        fontSize: theme.fontSizes.md,
                        lineHeight: '25px',
                        marginBottom: '5px'

                    }) }><Trans>Are you sure you want to archive<br/>the selected categories</Trans>?</Box>
                    { !!productsCount && productsCount > 0 && <Box sx={ theme => ({
                        fontWeight: 400,
                        fontSize: theme.fontSizes.sm,
                        color: theme.colors.gray[5],
                        lineHeight: '18.56px',
                        letterSpacing: 0.3,
                        textAlign: 'center',

                    }) }><Trans>After archiving, { plural(productsCount, {
                        one: '# product will remain',
                        few: '# products will remain',
                        many: '# products will remain',
                        other: '# products will remain',
                    }) } without a category</Trans></Box> }
                </Dialog>
            </Modal.Body>
        </Modal>
    );

};
