import React from 'react';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Modal } from 'shared/ui/modal';
import { RetailProductAddToStore } from 'features/retail-product-add-to-store/retail-product-add-to-store';

export const ModalAdd: React.FC<{
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    productId: string
    setRefetch: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
    setOpen,
    productId,
    setRefetch
}) => {

    const { i18n } = useLingui();

    const onCloseDialogToAdd = (refetch: boolean) => {

        if (refetch) {

            setRefetch(true);

        }

        setOpen(false);

    };

    return (
        <Modal modalWidth="auto" opened={ true } centered onCloseByOverlay={ () => onCloseDialogToAdd(false) }>
            <Modal.Body>
                <>
                    <Modal.Header title={ i18n._(t`Add a store`) } onClose={ () => onCloseDialogToAdd(false) }/>
                    <RetailProductAddToStore productId={ productId } onClose={  onCloseDialogToAdd }/>
                </>
            </Modal.Body>
        </Modal>
    );
};
